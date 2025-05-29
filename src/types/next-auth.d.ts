import NextAuth from 'next-auth/next';
import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      name: string | null;
      surname: string;
      email: string | null;
      accessToken: string;
      refreshToken: string;
      role: 'admin' | 'user' | 'guest';
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    surname: string;
    role: 'admin' | 'user' | 'guest';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    refreshAttempted: boolean;
    name: string | null;
    surname: string;
    email: string | null;
    role: 'admin' | 'user' | 'guest';
  }
}
