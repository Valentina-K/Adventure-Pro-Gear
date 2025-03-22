import React from 'react';
import { getTranslations } from 'next-intl/server';
import type { IPageProps } from '@/types';

import Container from '@/components/Container';
import AboutHeader from '@/components/AboutUs/AboutHeader/AboutHeader';
import AboutHero from '@/components/AboutUs/AboutHero/AboutHero';
import AboutCard from '@/components/AboutUs/AboutCard/AboutCard';
import AboutListInfo from '@/components/AboutUs/AboutListInfo/AboutListInfo';

import styles from './aboutUs.module.css';

async function AboutUs({ params }: IPageProps) {
  const { lang } = params;
  const t = await getTranslations({ lang, namespace: 'aboutPage' });

  return (
    <div>
      <AboutHeader />

      <Container>
        <AboutHero />
        <AboutCard />
        <AboutListInfo />

        <div className={styles.img_container}>
          <div className={styles.footer_img} />
          <p className={styles.about_text}>{t('advantages.sectionThanks.desc')}</p>
        </div>
      </Container>
    </div>
  );
}

export default AboutUs;
