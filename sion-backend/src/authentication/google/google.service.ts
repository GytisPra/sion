import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google, Auth } from 'googleapis';

import { AuthenticationService } from '../authentication.service';
import { UserEntity } from '../../users/serializers/users.serializer';
import { UsersService } from '../../users/users.service';
import { TokenVerificationDto } from '../dto/tokenVerification.dto';
import { PostgresErrorCodes } from '../../enums/postgresErrorCodes.enum';
import { UserAlreadyExists } from '../../utils/exceptions/userAlreadyExists.exception';
import { EmailRegisteredWithAnotherProvider } from '../../utils/exceptions/emailRegisteredWithAnotherProvider.exception';

@Injectable()
export class GoogleAuthenticationService {
  oauthClient: Auth.OAuth2Client;
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly authenticationService: AuthenticationService,
  ) {
    const clientID = this.configService.get('OAUTH_GOOGLE_ID');
    const clientSecret = this.configService.get('OAUTH_GOOGLE_SECRET');

    this.oauthClient = new google.auth.OAuth2(clientID, clientSecret);
  }

  async getUserData(token: string) {
    const userInfoClient = google.oauth2('v2').userinfo;

    this.oauthClient.setCredentials({
      access_token: token,
    });

    const userInfoResponse = await userInfoClient.get({
      auth: this.oauthClient,
    });

    return userInfoResponse.data;
  }

  async handleRegisteredUser(user: UserEntity) {
    if (user?.provider !== 'google') {
      throw new EmailRegisteredWithAnotherProvider(user.provider, 'google');
    }

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
      user,
    };
  }

  async registerUser(token: string, email: string) {
    const userData = await this.getUserData(token);

    try {
      const user = await this.usersService.createProviderUser({
        email,
        provider: 'google',
        providerId: userData.id,
        isVerified: true,
      });

      return this.handleRegisteredUser(user);
    } catch (error) {
      if (error?.code === PostgresErrorCodes.UniqueViolation) {
        throw new UserAlreadyExists(email);
      }
    }
  }

  async authenticate(tokenData: TokenVerificationDto) {
    const { token, provider, providerId } = tokenData;

    const tokenInfo = await this.oauthClient.getTokenInfo(token);

    const email = tokenInfo.email;

    try {
      const user = await this.usersService.findByProvider(provider, providerId);

      return this.handleRegisteredUser(user);
    } catch (error) {
      if (error.status !== 404) {
        throw new error();
      }

      return this.registerUser(token, email);
    }
  }
}
