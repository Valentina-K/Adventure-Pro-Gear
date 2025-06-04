import React, { Suspense } from 'react';
import { getServerSession } from 'next-auth/next';
import { EmblaOptionsType } from 'embla-carousel';
import { getTranslations } from 'next-intl/server';
import type { IPageProps } from '@/types';
import options from '@/config/nextAuth';
import Container from '@/components/Container';
import SignOutButton from '@/components/SignOutButton';
import { getProducts } from '@/services/axios';
import HomeBlogList from '@/components/BlogPage/homeBlogList';
import ProductSlider from '@/components/ProductSlider';
import MainListCat from '@/components/MainListCat';
import Banner from '@/components/ProductSlider/Banner';

async function Page({ params }: IPageProps) {
  const { lang } = params;
  const session = await getServerSession(options);
  const tHome = await getTranslations({ lang, namespace: 'homePage' });
  const OPTIONS: EmblaOptionsType = { align: 'start', loop: true };

  // toDo: too slow
  const products = await getProducts();

  return (
    <Container>
      <Banner />

      <Suspense fallback={<div>Loading...</div>}>
        <MainListCat />
      </Suspense>

      <br />

      <Suspense fallback={<div>Loading...</div>}>
        <ProductSlider title={tHome('news')} slides={products?.data?.content} options={OPTIONS} />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <ProductSlider
          title={tHome('sale')}
          slides={products?.data?.content}
          options={OPTIONS}
          delay={3050}
        />
      </Suspense>

      <br />
      <br />

      <Suspense fallback={<div>Loading...</div>}>
        <HomeBlogList lang={lang} />
      </Suspense>

      <br />
      <br />
    </Container>
  );
}

export default Page;
