import React, { Suspense } from 'react';
import { getServerSession } from 'next-auth/next';
import type { IPageProps } from '@/types';

import { options } from '@/config';
import Container from '@/components/Container';
import SignOutButton from '@/components/SignOutButton';
import { getProducts } from '@/services/axios';
import Hero from '@/components/Hero/Hero';
import AuthModal from '@/components/AuthModal';
import { getTranslations } from 'next-intl/server';
import HomeBlogList from '@/components/BlogPage/homeBlogList';

async function Page({ params }: IPageProps) {
  const { lang } = params;

  const session = await getServerSession(options);
  const tBlog = await getTranslations({ lang, namespace: 'blog' });

  // toDo: too slow
  // const res = await getProducts();
  // console.log(res);

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
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <Suspense fallback={<div>Loading...</div>}>
        <HomeBlogList lang={lang} />
      </Suspense>
    </Container>
  );
}

export default Page;
