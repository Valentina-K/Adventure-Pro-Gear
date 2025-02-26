import type { Metadata, NextPage } from 'next';
import { ToastContainer } from 'react-toastify';
import { Montserrat } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ProductProvider } from '@/contexts/ProductContext';
import { getProducts } from '@/services/axios';
import { routing } from '@/i18n/routing';
import ReduxProvider from '@/redux/provider';
import AuthProvider from '@/components/AuthProvider';
import { getAllTranslations, getTranslation } from '@/dictionaries/dictionaries';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import AuthModal from '@/components/AuthModal';
import Container from '@/components/Container';
import { Locale } from '../../i18n-config';
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
  children: React.ReactNode | React.ReactNode[];
  auth: React.ReactNode;
  params: {
    lang: Locale;
  };
}

const RootLayout: NextPage<RootLayoutProps> = async ({ params: { lang: locale }, children }) => {
  const translations = await getAllTranslations('ua');
  const translation = getTranslation(translations);
  // toDo: too slow
  const res = await getProducts();
  // console.log('products: ', res);
  // console.log(children);
  // const session = await getServerSession(options);
  // console.log("session: ",session);

  // Ensure that the incoming `locale` is valid
  // if (!routing.locales.includes(locale as any)) {
  //   notFound();
  // }

  const messages = await getMessages();

  return (
    <ReduxProvider>
      <AuthProvider>
        <ProductProvider initialProducts={res?.data.content}>
          <html lang={locale}>
            <body className={inter.className}>
              <NextIntlClientProvider messages={messages}>
                <Header translation={translation('nav')} locale={locale} products={null} />
                <main>{children}</main>
                <Footer />
                <ScrollToTop />
                <Container>
                  <AuthModal locale={locale} />
                </Container>
                <ToastContainer hideProgressBar={true} />
              </NextIntlClientProvider>
            </body>
          </html>
        </ProductProvider>
      </AuthProvider>
    </ReduxProvider>
  );
};

export default RootLayout;
