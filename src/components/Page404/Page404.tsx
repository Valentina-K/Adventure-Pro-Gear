'use client';

import { useEffect, useState } from 'react';
import Navigation from '../Navigation/Navigation';
import { useTranslations } from 'next-intl';
import Container from '../Container';
import styled from './Page404.module.css';
import { Link } from '@/i18n/routing';
import ArrowCorner from './ArrowCorner';
import Image from 'next/image';

export default function NotFound() {
  const t = useTranslations('page404');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 743);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styled.page}>
      <Container>
        <Navigation title={t('breadscrambps')} breadcrumbs={[t('breadscrambps')]} />
        <div className={styled.mainBox}>
          <div className={styled.main}>
            <h1 className={styled.title}>404</h1>
            <p className={styled.descr}>{t('description1')}</p>
            <p className={styled.descr}>{t('description2')}</p>
          </div>
          <div className={styled.imgBox}>
            <Image
              src="/images/img404.png"
              alt="404 Illustration"
              width={isMobile ? 328 : 1150}
              height={isMobile ? 147 : 426}
              className={styled.img}
              priority
            />
            <Link className={styled.btn} href="/">
              <span className={styled.btnText}>{t('toMainPage')}</span>
              <ArrowCorner color="#f5ffff" />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
