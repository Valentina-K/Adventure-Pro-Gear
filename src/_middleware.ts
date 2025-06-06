import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { AppRoutes } from '@/constants/routes';
import { getSession, GetSessionParams } from 'next-auth/react';
import { i18n } from './i18n-config';

export { default } from 'next-auth/middleware';

const publicRoutes = [
  AppRoutes.HOME,
  AppRoutes.SIGNIN,
  AppRoutes.SIGN_UP,
  AppRoutes.FORGOT_PASSWORD,
  `/?auth=reset-password&token=*`,
  '/contacts/',
  '/basket',
  '/about_us/',
  '/policy/',
  '/error/',
  '/product/',
  '/blog/',
  '/user/',
  '/catalog/:CatalogId',
  '/product/:productID',
];

const protectedUserRoutes = [
  '/personal_account/',
  '/personal_account/edit_data/',
  '/personal_account/favourites/',
  '/personal_account/orders/',
  '/personal_account/exit/',
];

const protectedAdminRoutes = ['/admin'];

// Function to check if a dynamic route is public
const isPublicDynamicRoute = (pathname: string) => {
  return (
    pathname.startsWith('/product/') ||
    pathname.startsWith('/blog/') ||
    pathname.startsWith('/catalog/') ||
    pathname.startsWith('/user/')
  );
};

const convertToGetSessionParams = (req: NextRequest): GetSessionParams => ({
  req: {
    headers: {
      cookie: req.headers.get('cookie') ?? undefined,
    },
  },
});

export const getLocale = (request: NextRequest): string | undefined => {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  return matchLocale(languages, locales, i18n.defaultLocale);
};

export function hasLocale(pathname: string) {
  return i18n.locales.some(locale => pathname.startsWith(`/${locale}/`));
}

export async function getSessionAndRole(req: NextRequest) {
  const session = await getSession(convertToGetSessionParams(req));
  return session?.user?.role || 'guest';
}

export function checkAccess(role: string, pathname: string) {
  if (role === 'ADMIN') return true;
  if (isPublicDynamicRoute(pathname) || publicRoutes.includes(pathname)) return true;
  if (role === 'USER' && protectedUserRoutes.includes(pathname)) return true;
  return false;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const urlObj = new URL(req.url);
  const searchParams = urlObj.search;
  const fullPath = `${urlObj.pathname}${searchParams}`;

  const role = await getSessionAndRole(req);
  const isLocale = hasLocale(pathname);

  let parts = pathname.split('/');
  let locale;
  if (isLocale) {
    locale = parts.splice(1, 1)[0];
  }
  let newPathname = `${parts.join('/')}${searchParams}`;
  newPathname = newPathname === '//' ? '/' : newPathname;

  const pathnameCleaned = isLocale ? newPathname : fullPath;
  const isAllowed = checkAccess(role, pathnameCleaned);

  if (!isAllowed) {
    const targetUrl =
      role === 'guest'
        ? `/${locale ?? i18n.defaultLocale}${AppRoutes.SIGNIN}`
        : `/${locale ?? i18n.defaultLocale}/error`;
    return NextResponse.redirect(new URL(targetUrl, req.url));
  }

  if (!isLocale) {
    return NextResponse.redirect(new URL(`/${i18n.defaultLocale}${newPathname}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
  unstable_allowDynamic: [
    '/lib/utilities.js',
    '/node_modules/function-bind/**',
    '/node_modules/@babel/runtime/regenerator/**',
  ],
};
