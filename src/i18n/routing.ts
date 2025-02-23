import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'uk'],
  defaultLocale: 'uk',

  localeDetection: false, // Prevent automatic browser-based detection
  localePrefix: 'as-needed', // Automatically prepend the locale to the URL
});

// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
