import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createHash } from 'crypto';

import { UsersRepository } from './users.repository';
import { UserEntity } from './serializers/users.serializer';

import { CreateUserDto } from './dto/createUser.dto';
import { IUser } from './interfaces/users.interface';
import { CreateProviderUserDto } from './dto/createProviderUser.dto';
import { UpdateAccountDetailsDto } from './dto/updateAccountDetails.dto';

import { Level } from '../enums';

import { UserIsVerified } from '../utils/exceptions/userIsVerified.exception';
import { ResetPasswordStarted } from '../utils/exceptions/resetPasswordStarted.exception';
import { UserNotFound } from '../utils/exceptions/userNotFound.exception';
import { TokenRefreshNotAvailable } from '../utils/exceptions/tokenRefreshNotAvailable.exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async get(id: string, relations: string[] = []): Promise<UserEntity | null> {
    const foundUser = await this.usersRepository.get(id, relations);

    if (foundUser) {
      return foundUser;
    }

    throw new UserNotFound(id);
  }

  async create(inputs: CreateUserDto) {
    return await this.usersRepository.createEntity(inputs);
  }

  async createProviderUser(inputs: CreateProviderUserDto) {
    return await this.usersRepository.createEntity(inputs);
  }

  async update(user: UserEntity, inputs: Partial<IUser>) {
    return await this.usersRepository.updateEntity(user, inputs);
  }

  async updateAccountDetails(userId: string, body: UpdateAccountDetailsDto) {
    const user = await this.get(userId);

    return this.update(user, body);
  }

  async getByEmail(email: string) {
    const foundUser = await this.usersRepository.getByEmail(email);

    if (foundUser) {
      return foundUser;
    }

    throw new UserNotFound(email);
  }

  async setCurrentRefreshToken(refreshToken: string, userId: string) {
    const currentHashedRefreshToken = createHash('sha256')
      .update(refreshToken)
      .digest('base64');

    await this.usersRepository.update(userId, {
      currentHashedRefreshToken,
    });
  }

  async deleteCurrentRefreshToken(userId: string) {
    await this.usersRepository.update(userId, {
      currentHashedRefreshToken: null,
    });
  }

  private compareHashedRefreshTokens(
    plainRefreshToken: string,
    hashedRefreshToken: string,
  ) {
    const hashedPlainRefreshToken = createHash('sha256')
      .update(plainRefreshToken)
      .digest('base64');

    return hashedPlainRefreshToken === hashedRefreshToken;
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: string) {
    const user = await this.get(userId);

    if (user.isResetPasswordStarted) {
      throw new ResetPasswordStarted(user.email, userId);
    }

    const isRefreshTokenMatching = this.compareHashedRefreshTokens(
      refreshToken,
      user.currentHashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    }

    throw new TokenRefreshNotAvailable("User's refresh tokens do not match.");
  }

  async setVerified(userId: string) {
    const user = await this.get(userId);

    if (user.isVerified) {
      throw new UserIsVerified(user.email);
    }

    const karmaPoints = user.karmaPoints + 10;
    const level = this.getUserLevel(user);

    await this.update(user, {
      isVerified: true,
      verifiedAt: new Date(),
      karmaPoints,
      level,
    });
  }

  async setNotVerified(userId: string) {
    await this.usersRepository.update(userId, { isVerified: false });
  }

  getUserLevel(user: UserEntity) {
    if (user.karmaPoints < -25) {
      return Level.Blocked;
    } else if (user.karmaPoints >= -25 && user.karmaPoints <= -10) {
      return Level.WatchList;
    } else if (user.karmaPoints >= -9 && user.karmaPoints <= 14) {
      return Level.Zero;
    } else if (user.karmaPoints >= 15 && user.karmaPoints <= 34) {
      return Level.One;
    } else if (user.karmaPoints >= 35 && user.karmaPoints <= 54) {
      return Level.Two;
    } else if (user.karmaPoints >= 55 && user.karmaPoints <= 74) {
      return Level.Three;
    } else if (user.karmaPoints >= 75 && user.karmaPoints <= 99) {
      return Level.Veteran;
    } else {
      return Level.Elite;
    }
  }

  async updateUserKarmaPoints(user: UserEntity, karmaPoints: number) {
    const userLevel = this.getUserLevel(user);

    return this.update(user, {
      karmaPoints: user.karmaPoints + karmaPoints,
      level: userLevel,
    });
  }

  async findByProvider(provider: string, providerId: string) {
    const user = await this.usersRepository.findByProvider(
      provider,
      providerId,
    );

    if (user) {
      return user;
    }

    throw new UserNotFound();
  }

  async startResetPassword(userId: string) {
    await this.usersRepository.update(userId, {
      isResetPasswordStarted: true,
    });
  }

  async resetPassword(userId: string, password: string) {
    await this.usersRepository.update(userId, {
      password,
      isResetPasswordStarted: false,
    });
  }
}
