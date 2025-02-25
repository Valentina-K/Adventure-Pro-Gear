import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { AppRoutes } from './constants/routes';
import { getToken } from 'next-auth/jwt';

const protectedRoutes = ['/personal_account'];
const secret = process.env.NEXT_AUTH_SECRET; // Ensure this is set in your .env file

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const { pathname, search } = url;

  // ✅ Handle old language redirects
  if (pathname.startsWith('/en-US')) {
    return NextResponse.redirect(new URL(pathname.replace(/^\/en-US/, '/en') + search, req.url));
  }
  if (pathname.startsWith('/uk-UA')) {
    return NextResponse.redirect(new URL(pathname.replace(/^\/uk-UA/, '/') + search, req.url));
  }

  // ✅ Check authentication using getToken() (Edge-compatible)
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    const token = await getToken({ req, secret });

    if (!token) {
      return NextResponse.redirect(new URL(`/${AppRoutes.SIGNIN}`, req.url)); // Redirect guests to home
    }
  }

  return createMiddleware(routing)(req);
}

// export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
    // Match protected route pattern
    '/personal_account/:path*',
  ],
};
