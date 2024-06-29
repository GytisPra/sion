import NextAuth, { User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import axios, { AxiosError } from 'axios';
import { JWT } from 'next-auth/jwt';

import { SionError } from '@interfaces/index';
import { routes } from '@utils/routes';

type AuthorizeResponse = {
  accessToken: string;
  accessTokenExpires: number;
  refreshToken: string;
  refreshTokenExpires: number;
  user: User;
  error?: SionError;
};

type ServerAuthorizationResponse = {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  refreshExpiresIn: number;
};

const refreshAccessToken = async (token: JWT): Promise<AuthorizeResponse> => {
  try {
    const {
      data: { accessToken, expiresIn, refreshToken, refreshExpiresIn },
    } = await axios.post<ServerAuthorizationResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/authentication/refreshToken`,
      {
        refreshToken: token.refreshToken,
      },
    );

    return {
      accessToken,
      accessTokenExpires: Date.now() + expiresIn,
      refreshToken,
      refreshTokenExpires: Date.now() + refreshExpiresIn,
      user: token.user,
    };
  } catch (e) {
    const error = e as AxiosError<SionError>;
    return {
      ...token,
      error: error.response?.data,
    };
  }
};

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'test_client_id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'test_client_secret',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<AuthorizeResponse | null> {
        try {
          const {
            data: { accessToken, expiresIn, refreshToken, refreshExpiresIn },
          } = await axios.post<ServerAuthorizationResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}/authentication/login`,
            { email: credentials?.email, password: credentials?.password },
            {
              headers: { 'content-type': 'application/json' },
            },
          );

          const { data: authenticatedUser } = await axios.get<User>(
            `${process.env.NEXT_PUBLIC_API_URL}/authentication`,
            {
              headers: {
                authorization: `Bearer ${accessToken}`,
              },
            },
          );

          if (authenticatedUser) {
            return {
              accessToken,
              accessTokenExpires: Date.now() + expiresIn,
              refreshToken,
              refreshTokenExpires: Date.now() + refreshExpiresIn,
              user: authenticatedUser,
            };
          }

          return null;
        } catch (e) {
          const error = e as AxiosError<SionError>;
          return Promise.reject(new Error(String(error.response?.data.code)));
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 10 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = user as unknown as AuthorizeResponse;
        return token;
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      return refreshAccessToken(token);
    },
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        // TODO: add try-catch to catch any error (f.e. user might already exist)
        try {
          const {
            data: {
              accessToken,
              expiresIn,
              refreshToken,
              refreshExpiresIn,
              user: authenticatedUser,
            },
          } = await axios.post<{
            accessToken: string;
            expiresIn: number;
            refreshToken: string;
            refreshExpiresIn: number;
            user: User;
            error?: SionError;
          }>(`${process.env.NEXT_PUBLIC_API_URL}/authentication/google`, {
            token: account.access_token,
            provider: account.provider,
            providerId: account.providerAccountId,
          });

          user.user = authenticatedUser;
          user.accessToken = accessToken;
          user.accessTokenExpiresIn = Date.now() + expiresIn;
          user.refreshToken = refreshToken;
          user.refreshExpiresIn = Date.now() + refreshExpiresIn;
          user.expires = new Date(Date.now() + refreshExpiresIn);

          return true;
        } catch (e) {
          const { response } = e as AxiosError<SionError>;

          if (response?.data) {
            switch (response.data.code) {
              case 20003:
                return '/api/auth/error?error=userexists';
            }
          }

          return false;
        }
      }

      const { accessToken } = user;

      if (accessToken) {
        return true;
      }

      return false;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      session.error = token.error as SionError;
      session.expires = new Date(token.refreshTokenExpires);

      return session;
    },
  },
  pages: {
    signIn: routes.login,
  },
});
