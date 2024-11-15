import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { AppRoutes } from '@/constants/routes';
import { getSession, GetSessionParams } from 'next-auth/react';
import { i18n } from './i18n-config';

export { default } from 'next-auth/middleware';

console.log('Middleware is called!');
const publicRoutes = [
  `${AppRoutes.HOME}`,
  `${AppRoutes.SIGNIN}`,
  `${AppRoutes.SIGN_UP}`,
  `${AppRoutes.FORGOT_PASSWORD}`,
  `/?auth=reset-password&token=*`,
  '/contacts/',
  '/about_us/',
  '/policy/',
  '/error/',
  '/product/',
];

const protectedUserRoutes = [
  ...publicRoutes,
  '/user',
  '/blog/',
  '/personal_account/',
  '/personal_account/edit_data/',
  '/personal_account/favourites/',
  '/personal_account/orders/',
  '/personal_account/exit/',
];
const protectedAdminRoutes = ['/admin'];

const convertToGetSessionParams = (req: NextRequest): GetSessionParams => ({
  req: {
    headers: {
      cookie: req.headers.get('cookie') ?? undefined,
    },
  },
});

export const getLocale = (request: NextRequest): string | undefined => {
  console.log('This function is called!');
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  console.log('negotiator headers: ', negotiatorHeaders);
  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;
  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  const locale = matchLocale(languages, locales, i18n.defaultLocale);
  return locale;
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
  if (role === 'USER' && protectedUserRoutes.includes(pathname)) {
    if (pathname === AppRoutes.SIGNIN || pathname === AppRoutes.SIGN_UP) {
      return false;
    }
    return true;
  }
  if (publicRoutes.includes(pathname)) {
    console.log('Includes: ', publicRoutes.includes(pathname));
    return true;
  }
  return false;
}

// export function getToken(req: NextRequest){
//   const fullUrl = req.url;
//   const urlObj = new URL(fullUrl);
//   const token = urlObj.searchParams.get('token');
//   console.log('Token from URL: ', token);
//   return token
// }

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const fullUrl = req.url;
  const urlObj = new URL(fullUrl);
  const pathnameFromUrlObj = urlObj.pathname;
  const searchParams = urlObj.search;
  const fullPath = `${pathnameFromUrlObj}${searchParams}`;
  console.log('FullPath: ', fullPath);
  console.log('fullUrl: ', fullUrl);
  console.log('PATH_NAME: ', pathname);

  const token = urlObj.searchParams.get('token');
  const auth = urlObj.searchParams.get('auth');
  console.log('Token from URL: ', token);

  // Check access rights first
  const role = await getSessionAndRole(req);
  console.log('ROLE: ', role);
  const isLocale = hasLocale(pathname);
  console.log('Has locale: ', isLocale);

  let parts = pathname.split('/'); // [ '', 'uk-UA', 'contacts', '' ]
  console.log(parts);
  let locale;
  if (isLocale) {
    locale = parts.splice(1, 1)[0];
  }
  let newPathname = `${parts.join('/')}${searchParams}`;
  newPathname = newPathname === `//` ? `/` : newPathname;
  console.log('NewPathName', newPathname);
  const pathnameCleaned = isLocale ? newPathname : fullPath;
  console.log('PathNameCleaned: ', pathnameCleaned);
  const isAllowed = checkAccess(role, pathnameCleaned);
  console.log('Is allowed: ', isAllowed);

  // Handle access for reset-password route with token
  if (auth === 'reset-password' && token) {
    // Perform your token validation here
    console.log('Reset password token found: ', token);
    // Assuming token validation passes, allow the request to proceed
    return NextResponse.next();
  }

  if (!isAllowed && isLocale) {
    const targetUrl = role === 'guest' ? `/${locale}${AppRoutes.SIGNIN}` : `/${locale}/error`;
    return NextResponse.redirect(new URL(targetUrl, req.url));
  } else if (!isAllowed) {
    const targetUrl =
      role === 'guest'
        ? `/${i18n.defaultLocale}${AppRoutes.SIGNIN}`
        : `/${i18n.defaultLocale}/error`;

    return NextResponse.redirect(new URL(targetUrl, req.url));
  }

  // Then handle locale redirection for authorized users
  if (!isLocale) {
    return NextResponse.redirect(
      new URL(`${urlObj.origin}/${i18n.defaultLocale}${newPathname}`, req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
  unstable_allowDynamic: [
    // allows a single file
    '/lib/utilities.js',
    // use a glob to allow anything in the function-bind 3rd party module
    '/node_modules/function-bind/**',
    // Add a glob pattern for the problematic module
    '/node_modules/@babel/runtime/regenerator/**',
  ],
};
