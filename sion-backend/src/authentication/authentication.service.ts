import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';

import { UserEntity } from '../users/serializers/users.serializer';
import { VerificationToken } from './verificationToken.entity';
import { ResetPasswordToken } from './resetPasswordToken.entity';

import { MailService } from '../mail/mail.service';
import { UsersService } from '../users/users.service';

import { TokenPayload } from './interfaces/tokenPayload.interface';

import { RegisterDto } from './dto/register.dto';
import { VerifyDto } from './dto/verify.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';

import { UserAlreadyExists } from '../utils/exceptions/userAlreadyExists.exception';
import { CodeExpired } from '../utils/exceptions/codeExpired.exception';
import { LinkExpired } from '../utils/exceptions/linkExpired.exception';
import { VerificationTokenNotFound } from '../utils/exceptions/verificationTokenNotFound.exception';
import { UserTooYoung } from '../utils/exceptions/userTooYoung.exception';
import { UserIsVerified } from '../utils/exceptions/userIsVerified.exception';
import { WrongCredentials } from '../utils/exceptions/wrongCredentials.exception';
import { ResetPasswordTokenNotFound } from '../utils/exceptions/resetPasswordTokenNotFound.exception';
import { ResetPasswordStarted } from '../utils/exceptions/resetPasswordStarted.exception';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    @InjectRepository(VerificationToken)
    private verificationTokenRepository: Repository<VerificationToken>,
    @InjectRepository(ResetPasswordToken)
    private resetPasswordTokenRepository: Repository<ResetPasswordToken>,
  ) {}

  async getTokensForUser(user: UserEntity) {
    const accessToken = this.generateAccessToken(user.id);
    const refreshToken = this.generateRefreshToken(user.id);

    await this.usersService.setCurrentRefreshToken(refreshToken, user.id);

    return {
      accessToken,
      refreshToken,
    };
  }

  public async register(registrationBody: RegisterDto) {
    if (
      registrationBody.dateOfBirth &&
      Date.now() - registrationBody.dateOfBirth.getTime() <
        this.configService.get('minimumAgeInMilliseconds')
    ) {
      throw new UserTooYoung(registrationBody.dateOfBirth);
    }

    const hashedPassword = await bcrypt.hash(registrationBody.password, 10);

    try {
      const user = await this.usersService.getByEmail(registrationBody.email);

      if (user) {
        throw new UserAlreadyExists(user.email);
      }
    } catch (error) {
      if (error && error.response && error.response.code === 20020) {
        const createdUser = await this.usersService.create({
          ...registrationBody,
          password: hashedPassword,
        });

        await this.sendVerificationEmail(createdUser);

        return createdUser;
      }

      throw error;
    }

    throw new InternalServerErrorException();
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    const user = await this.usersService.getByEmail(email);

    if (user.isResetPasswordStarted) {
      throw new ResetPasswordStarted(user.email, user.id);
    }

    await this.verifyPassword(plainTextPassword, user.password);

    return user;
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );

    if (!isPasswordMatching) {
      throw new WrongCredentials();
    }
  }

  public generateAccessToken(userId: string) {
    const payload: TokenPayload = { sub: userId };

    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
    });
  }

  public generateRefreshToken(userId: string) {
    const payload: TokenPayload = { sub: userId };

    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
    });
  }

  public async verifyUser(verifyBody: VerifyDto) {
    const verificationToken = await this.verificationTokenRepository.findOne({
      code: verifyBody.code,
    });

    if (!verificationToken) {
      throw new VerificationTokenNotFound();
    }

    if (verificationToken.expiresAt < new Date()) {
      throw new CodeExpired(verificationToken.expiresAt);
    }

    Promise.all([
      this.usersService.setVerified(verificationToken.userId),
      this.verificationTokenRepository.remove(verificationToken),
    ]);
  }

  private async sendVerificationEmail(user: UserEntity) {
    const verificationCode = String(
      Math.floor(100000 + Math.random() * 900000),
    );

    const verificationToken = this.verificationTokenRepository.create({
      userId: user.id,
      code: verificationCode,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    const savedToken = await this.verificationTokenRepository.save(
      verificationToken,
    );

    await this.mailService.sendVerificationEmail(user, savedToken);
  }

  public async resendVerification(email: string) {
    const user = await this.usersService.getByEmail(email);

    if (user.isVerified) {
      throw new UserIsVerified(user.email);
    }

    await this.sendVerificationEmail(user);
  }

  private async sendResetPasswordEmail(user: UserEntity) {
    const resetPasswordHash = crypto.randomBytes(64).toString('hex');

    const resetPasswordToken = await this.resetPasswordTokenRepository.create({
      userId: user.id,
      token: resetPasswordHash,
      expiresAt: new Date(Date.now() + 3 * 60 * 60 * 1000),
    });

    const savedToken = await this.resetPasswordTokenRepository.save(
      resetPasswordToken,
    );

    await this.mailService.sendResetPasswordEmail(user, savedToken);
  }

  public async revokeRefreshToken(user: UserEntity) {
    await this.usersService.update(user, {
      currentHashedRefreshToken: undefined,
    });
  }

  public async startResetPassword(email: string) {
    const user = await this.usersService.getByEmail(email);

    Promise.all([
      this.usersService.startResetPassword(user.id),
      this.revokeRefreshToken(user),
    ]);

    await this.sendResetPasswordEmail(user);
  }

  public async getResetPaswordTokenByUserId(userId: string) {
    return this.resetPasswordTokenRepository.findOne(userId);
  }

  public async resetPassword(
    resetPasswordHash: string,
    resetPasswordBody: ResetPasswordDto,
  ) {
    const resetPasswordToken = await this.resetPasswordTokenRepository.findOne({
      token: resetPasswordHash,
    });

    if (!resetPasswordToken) {
      throw new ResetPasswordTokenNotFound(resetPasswordHash);
    }

    if (resetPasswordToken.expiresAt < new Date()) {
      throw new LinkExpired(resetPasswordToken.expiresAt);
    }

    await this.resetPasswordTokenRepository.remove(resetPasswordToken);

    const hashedPassword = await bcrypt.hash(resetPasswordBody.password, 10);

    const user = await this.usersService.get(resetPasswordToken.userId);

    return this.usersService.resetPassword(user.id, hashedPassword);
  }
}
