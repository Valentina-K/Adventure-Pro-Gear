import type { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import axios from 'axios';
import _ from 'lodash';
import {
  signInService,
  getUserInfoService,
  refreshTokenService,
  token as apiToken,
} from '@/services/axios';
import { AppRoutes } from '@/constants/routes';
import ensureJwtShape from '../utils/ensureJwtShape';
// Расширенный пользователь — нужен только в jwt при логине
interface ExtendedUser extends User {
  token: {
    accessToken: string;
    refreshToken: string;
  };
}

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      type: 'credentials',
      async authorize(credentials) {
        if (!credentials) return null;
        const { email, password } = credentials;
        try {
          const tokenResponse = await signInService({ email, password });
          const tokenData = tokenResponse.data;

          apiToken.access = tokenData.accessToken;
          apiToken.refresh = tokenData.refreshToken;

          const userInfoResponse = await getUserInfoService(apiToken.access);
          const userInfo = userInfoResponse.data;

          return {
            ...userInfo,
            token: tokenData,
          };
        } catch (error) {
          console.error('Authorize error:', error);

          if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Authorization failed');
          } else {
            throw new Error('Unknown error during login');
          }
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      // При логине
      if (user && 'token' in user) {
        const extUser = user as ExtendedUser;
        return ensureJwtShape({
          ...token,
          accessToken: extUser.token.accessToken,
          refreshToken: extUser.token.refreshToken,
          refreshAttempted: false,
          name: user.name,
          surname: extUser.surname,
          email: user.email,
          role: extUser.role,
        });
      }

      // Проверка accessToken
      if (token.accessToken) {
        const accessTokenStr = typeof token.accessToken === 'string' ? token.accessToken : '';
        const decoded = jwtDecode<JwtPayload>(accessTokenStr);
        const exp = decoded.exp ? decoded.exp * 1000 : 0;

        // Если токен ещё валиден
        if (Date.now() < exp) {
          return ensureJwtShape(token);
        }
        if (token.error === 'RefreshAccessTokenError') {
          return ensureJwtShape(token);
        }
        if (token.refreshAttempted || token.error) {
          return ensureJwtShape({
            ...token,
            error: 'RefreshAccessTokenError',
          });
        }
        // Обновляем токен
        try {
          const refreshed = await refreshTokenService(token.refreshToken as string);
          console.log('refreshed', refreshed);
          const newTokens = refreshed;
          if (!newTokens || !newTokens.accessToken) {
            throw new Error('No accessToken in response');
          }

          return ensureJwtShape({
            ...token,
            accessToken: newTokens.accessToken,
            refreshToken: newTokens.refreshToken ?? token.refreshToken,
            refreshAttempted: true,
          });
        } catch (err) {
          console.error('Token refresh failed:', err);
          return ensureJwtShape({
            ...token,
            error: 'RefreshAccessTokenError',
          });
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token.error === 'RefreshAccessTokenError') {
        return {
          expires: session.expires,
        };
      }
      if (token) {
        return {
          ...session,
          user: {
            name: token.name,
            surname: token.surname,
            email: token.email,
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
            role: token.role,
          },
        };
      }

      return session;
    },
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 дней
  },

  pages: {
    signIn: AppRoutes.SIGNIN,
  },
};

export default options;
