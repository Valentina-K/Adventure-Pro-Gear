import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Montserrat } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { getServerSession } from 'next-auth/next';
import ReduxProvider from '@/redux/provider';

import type { Metadata, NextPage } from 'next';
import type { IPageProps } from '@/types';
import SessionProvider from '@/components/SessionProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import AuthModal from '@/components/AuthModal';
import { FavoritesProvider } from '@/utils/favoritesContext';

import '@/app/styles/_normilize.css';
import '@/app/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'Adventure Pro Gear',
  description: 'Інтернет магазин туристоичного спорядження',
};

const inter = Montserrat({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
});

interface RootLayoutProps extends IPageProps {
  children: React.ReactNode;
}

const RootLayout: NextPage<RootLayoutProps> = async ({ params: { lang: locale }, children }) => {
  const messages = await getMessages();
  const session = await getServerSession();

  return (
    <ReduxProvider>
      <html lang={locale}>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body className={inter.className}>
          <SessionProvider session={session}>
            <NextIntlClientProvider messages={messages}>
              <Header products={null} />
              <FavoritesProvider>
              <main>{children}</main>
              </FavoritesProvider>
              <Footer />
              <ScrollToTop />
              <AuthModal />
              <ToastContainer hideProgressBar={true} />
            </NextIntlClientProvider>
          </SessionProvider>
        </body>
      </html>
    </ReduxProvider>
  );
};

export default RootLayout;
