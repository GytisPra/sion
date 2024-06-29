import {
  Body,
  Req,
  Controller,
  Post,
  UseGuards,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
  Param,
  HttpCode,
  SerializeOptions,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from 'sion-logger';

import { AuthenticationService } from './authentication.service';
import { UsersService } from '../users/users.service';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/logIn.dto';
import { VerifyDto } from './dto/verify.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';

import { RequestWithUser } from './interfaces/requestWithUser.interface';

import { LocalAuthenticationGuard } from './guards/localAuthentication.guard';
import { JwtAuthenticationGuard } from './guards/jwtAuthentication.guard';
import { JwtRefreshGuard } from './guards/jwtRefresh.guard';

@ApiTags('authentication')
@Controller('authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private logger: LoggerService,
  ) {
    this.logger.layer = 'AuthenticationController';
  }

  @Post('register')
  @ApiCreatedResponse({ description: 'The user has registered successfully.' })
  @ApiBody({ type: RegisterDto })
  @ApiForbiddenResponse({
    description: 'Failed if the user with the same information already exists.',
  })
  async register(@Body() registrationData: RegisterDto) {
    this.logger.development.info('Registering new user.', {
      involved: 'register',
      meta: {
        email: registrationData.email,
      },
    });

    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ description: 'The user has logged in successfully.' })
  @ApiForbiddenResponse({
    description:
      'Failed if the verification token is not found or if it is expired or if the credentials entered are incorrect.',
  })
  async logIn(@Req() request: RequestWithUser) {
    this.logger.development.info('Generating access tokens for user.', {
      involved: 'login',
      meta: {
        email: request.user.email,
      },
    });

    const { user } = request;

    const { accessToken, refreshToken } =
      await this.authenticationService.getTokensForUser(user);

    return {
      accessToken,
      expiresIn: Number(
        this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
      ),
      refreshToken,
      refreshExpiresIn: Number(
        this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
      ),
    };
  }

  @HttpCode(200)
  @UseGuards(JwtRefreshGuard)
  @Get('logout')
  async logout(@Req() request: RequestWithUser) {
    this.logger.development.info('Performing logout for the user.', {
      involved: 'logout',
      meta: {
        user: request.user.email,
      },
    });

    request.res.clearCookie('rtk');

    const { user } = request;

    await this.usersService.deleteCurrentRefreshToken(user.id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @SerializeOptions({ groups: ['user.verification', 'user.authentication'] })
  @Get()
  @ApiOkResponse({
    description: 'The user has been successfully authenticated.',
  })
  @ApiForbiddenResponse({
    description: 'Failed if authorization is not provided or is not valid..',
  })
  authenticate(@Req() request: RequestWithUser) {
    this.logger.development.info('Returning authenticated user.', {
      involved: 'authenticate',
      meta: {
        user: request.user.email,
      },
    });

    return request.user;
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refreshToken')
  @ApiOkResponse({
    description: 'The users refresh token is successfully created.',
  })
  @ApiForbiddenResponse({
    description:
      'Failed if the verification token is not found or if it is expired or if authorization is not provided or is not valid.',
  })
  async refreshToken(@Req() request: RequestWithUser) {
    this.logger.development.info('Refreshing token pair.', {
      involved: 'refresh_token',
      meta: {
        email: request.user.email,
      },
    });

    const { user } = request;

    const { accessToken, refreshToken } =
      await this.authenticationService.getTokensForUser(user);

    return {
      accessToken,
      expiresIn: Number(
        this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
      ),
      refreshToken,
      refreshExpiresIn: Number(
        this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
      ),
    };
  }

  @HttpCode(200)
  @ApiOkResponse({
    description: 'The users is successfully verified.',
  })
  @ApiForbiddenResponse({
    description:
      'Failed if the verification token is not found or if it is expired.',
  })
  @Post('verify')
  async verifyUser(@Body() verifyBody: VerifyDto) {
    this.logger.development.info('Starting user verification', {
      involved: 'verify',
      meta: verifyBody,
    });

    return this.authenticationService.verifyUser(verifyBody);
  }

  @HttpCode(200)
  @Get('resendVerification/:email')
  @ApiOkResponse({
    description: 'The verification has been resent successfully.',
  })
  @ApiForbiddenResponse({
    description: 'Failed if the user is already verified',
  })
  async resendVerifiction(@Param('email') email: string) {
    this.logger.development.info({
      involved: 'resend_verification',
      meta: {
        email,
      },
    });
    return this.authenticationService.resendVerification(email);
  }

  @HttpCode(200)
  @ApiOkResponse({
    description:
      'The reset password process has been started. User is no longer verified, waiting for password to reset.',
  })
  @ApiBadRequestResponse({
    description:
      'An error has occured. The user was not found or the request was malformed.',
  })
  @Post('startResetPassword/:email')
  async startResetPassword(@Param('email') email: string) {
    this.logger.development.info({
      involved: 'start_reset_password',
      meta: {
        email,
      },
    });
    return await this.authenticationService.startResetPassword(email);
  }

  @Post('resetPassword/:resetPasswordHash')
  async resetPassword(
    @Param('resetPasswordHash') resetPasswordHash: string,
    @Body() resetPasswordBody: ResetPasswordDto,
  ) {
    this.logger.development.info({
      involved: 'reset_password',
    });
    return this.authenticationService.resetPassword(
      resetPasswordHash,
      resetPasswordBody,
    );
  }
}
