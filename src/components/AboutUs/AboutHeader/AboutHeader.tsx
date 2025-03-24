import React from 'react';
import Image from 'next/image';
import Navigation from '@/components/Navigation/Navigation';
import Container from '@/components/Container';
import aboutLogo from '@/../public/images/about/aboutLogo.svg';
import styles from './AboutHeader.module.css';
import { useTranslations } from 'next-intl'

function AboutHeader() {
  const t = useTranslations('aboutPage.hero');

  const slugs: Record<string, string> = {
    'about-us': 'Про нас',
    contact: 'Контакти',
    products: 'Товари',
  };

  return (
    <div className={styles.about}>
      <Container>
        <Navigation navigationPage="Про нас" />
        <div className={styles.about_container}>
          <p className={styles.descr_overtext}>{t('title')}</p>
          <Image src={aboutLogo} alt="logo" fill sizes="auto" className={styles.about_logo} />
          <p className={styles.descr_subtext}>{t('subtitle')}</p>
        </div>
      </Container>
    </div>
  );
}

export default AboutHeader;
