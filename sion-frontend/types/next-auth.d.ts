import 'next-auth';
import 'next-auth/jwt';

import { User } from '@types';
import { SionError } from '@interfaces/error';

declare module 'next-auth' {
  interface Session {
    user: User;
    expires: Date;
    error?: SionError;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    accessTokenExpires: number;
    refreshToken: string;
    refreshTokenExpires: number;
    user: User;
    error?: SionError;
  }
}
