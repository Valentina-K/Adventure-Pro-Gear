import type { JWT } from 'next-auth/jwt';

export default function ensureJwtShape(token: Partial<JWT>): JWT {
  return {
    accessToken: token.accessToken ?? '',
    refreshToken: token.refreshToken ?? '',
    refreshAttempted: token.refreshAttempted ?? false,
    name: token.name ?? null,
    surname: token.surname ?? '',
    email: token.email ?? null,
    role: token.role ?? 'guest',
  };
}
