import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import options from '../config/nextAuth';
import { AppRoutes } from '@/constants/routes';

interface ServerGuardOptions {
  redirectTo?: string;
  maxAttempts?: number;
  currentAttempt?: number;
  currentPath: string;
}
const serverGuard = async ({
  redirectTo = `/${AppRoutes.SIGNIN}`,
  maxAttempts = 2,
  currentAttempt = 0,
  currentPath,
}: ServerGuardOptions) => {
  const session = await getServerSession(options);

  if (!session || session.error === 'RefreshAccessTokenError') {
    redirect(redirectTo);
  }

  if (session && session.isRefreshing) {
    if (currentAttempt >= maxAttempts) {
      redirect(redirectTo);
    }

    const nextAttempt = currentAttempt + 1;
    const separator = currentPath.includes('?') ? '&' : '?';
    redirect(`${currentPath}${separator}wait=${nextAttempt}`);
  }

  return session;
};

export default serverGuard;

/* const getValidatedSession = async () => {
  const session = await getServerSession(options);

  if (!session || session.error === 'RefreshAccessTokenError') {
    return { session: null, status: 'unauthenticated' as SessionStatus };
  }

  if (!session.user?.accessToken) {
    return { session, status: 'refreshing' as SessionStatus };
  }

  return { session, status: 'authenticated' as SessionStatus };
};

export default getValidatedSession; */
