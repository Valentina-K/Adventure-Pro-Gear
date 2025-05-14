import React, { Suspense } from 'react';
import { getServerSession } from 'next-auth/next';
import { EmblaOptionsType } from 'embla-carousel';
import { getTranslations } from 'next-intl/server';

import type { IPageProps } from '@/types';
import { options } from '@/config';
import Container from '@/components/Container';
import SignOutButton from '@/components/SignOutButton';
import { getProducts } from '@/services/axios';
// import Hero from '@/components/Hero/Hero';
// import AuthModal from '@/components/AuthModal';
import HomeBlogList from '@/components/BlogPage/homeBlogList';
import ProductSlider from '@/components/ProductSlider';

async function Page({ params }: IPageProps) {
  const { lang } = params;
  const session = await getServerSession(options);
  const tBlog = await getTranslations({ lang, namespace: 'blog' });
  const OPTIONS: EmblaOptionsType = { align: 'start', loop: true };

  // toDo: too slow
  const products = await getProducts();

  return (
    <Container>
      <br />
      <section>
        {session ? (
          <>
            {/* <Hero data={res && res.data} locale={params.lang} /> */}
            <h1>Authenticated</h1>
            <SignOutButton />
          </>
        ) : (
          <>
            {/* <Hero data={res && res.data} locale={params.lang} /> */}
            <h1>Not Authenticated</h1>
          </>
        )}
        {/* <AuthModal locale={params.lang} /> */}
      </section>

      <br />

      <Suspense fallback={<div>Loading...</div>}>
        <ProductSlider title="Новинки" slides={products?.data?.content} options={OPTIONS} />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <ProductSlider
          title="Акції"
          slides={products?.data?.content}
          options={OPTIONS}
          delay={3050}
        />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <HomeBlogList lang={lang} />
      </Suspense>
      
    </Container>
  );
}

export default Page;
