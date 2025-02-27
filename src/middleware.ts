import { getToken } from 'next-auth/jwt';
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { AppRoutes } from './constants/routes';

const secret = process.env.NEXTAUTH_SECRET;
const protectedRoutes = ['/personal_account'];

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const { pathname, search } = url;

  if (pathname.startsWith('/en-US')) {
    return NextResponse.redirect(new URL(pathname.replace(/^\/en-US/, '/en') + search, req.url));
  }
  if (pathname.startsWith('/uk-UA')) {
    return NextResponse.redirect(new URL(pathname.replace(/^\/uk-UA/, '/') + search, req.url));
  }

  const localeMatch = pathname.match(/^\/(en|uk)(\/|$)/);
  const locale = localeMatch ? localeMatch[1] : null;

  const pathWithoutLocale = pathname.replace(/^\/(en|uk)/, '');
  if (protectedRoutes.some(route => pathWithoutLocale.startsWith(route))) {
    const token = await getToken({ req, secret });

    if (!token) {
      const signinPath = locale ? `/${locale}${AppRoutes.SIGNIN}` : `/${AppRoutes.SIGNIN}`;
      return NextResponse.redirect(new URL(signinPath, req.url));
    }
  }

  return createMiddleware(routing)(req);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/(en|uk)?/personal_account/:path*'],
};
