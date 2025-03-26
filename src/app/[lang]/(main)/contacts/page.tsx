import Container from '@/components/Container';
import React from 'react';
import Navigation from '@/components/Navigation/Navigation';
import { getTranslations } from 'next-intl/server';
import { IPageProps } from '@/types/IPageProps'

async function Contacts({ params }: IPageProps) {
  const { lang } = params;
  const t = await getTranslations({ lang, namespace: 'contactPage' });

  return (
    <section>
      <Container>
        <Navigation title={t('title')} />
        <div>
          <h1>{t('title')}</h1>
        </div>
      </Container>
    </section>
  );
}

export default Contacts;
