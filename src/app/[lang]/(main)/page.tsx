import React from 'react';
import { getServerSession } from 'next-auth/next';
import type { IPageProps } from '@/types';

import { options } from '@/config';
import Container from '@/components/Container';
import SignOutButton from '@/components/SignOutButton';
import { getProducts } from '@/services/axios';
import Hero from '@/components/Hero/Hero';
import AuthModal from '@/components/AuthModal';

async function Page({ params }: IPageProps) {
  const session = await getServerSession(options);

  // toDo: too slow
  // const res = await getProducts();
  // console.log(res);

  return (
    <section>
      <Container>
        <br />
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
      </Container>
    </section>
  );
}

export default Page;
