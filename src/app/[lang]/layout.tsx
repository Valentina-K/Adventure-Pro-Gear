import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Montserrat } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { getServerSession } from 'next-auth/next';
import ReduxProvider from '@/redux/provider';
import SessionProvider from '@/components/SessionProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import AuthModal from '@/components/AuthModal';
import Container from '@/components/Container';
import type { Metadata, NextPage } from 'next';

import '@/app/styles/_normilize.css';
import '@/app/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'Adventure Pro Gear',
  description: 'Інтернет магазин туристоичного спорядження',
};

const inter = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'],
});

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    lang?: string;
  };
}

const RootLayout: NextPage<RootLayoutProps> = async ({ params: { lang: locale }, children }) => {
  const messages = await getMessages();
  const session = await getServerSession();

  // toDo: too slow
  // const res = await getProducts();
  //
  // console.log('products: ', res);
  // console.log(children);
  // console.log("session: ",session);

  // Ensure that the incoming `locale` is valid
  // if (!routing.locales.includes(locale as any)) {
  //   notFound();
  // }
  return (
    <ReduxProvider>
      <html lang={locale}>
        <body className={inter.className}>
          <SessionProvider session={session}>
            <NextIntlClientProvider messages={messages}>
              <Header products={null} />
              <main>{children}</main>
              <Footer />
              <ScrollToTop />
              <Container>
                <AuthModal />
              </Container>
              <ToastContainer hideProgressBar={true} />
            </NextIntlClientProvider>
          </SessionProvider>
        </body>
      </html>
    </ReduxProvider>
  );
};

export default RootLayout;

/* 
<ProductProvider initialProducts={res?.data.content}>
</ProductProvider>
 */
