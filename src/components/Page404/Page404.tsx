'use client';

import Navigation from '../Navigation/Navigation';
import { useTranslations } from 'next-intl';
import Container from '../Container';
import styled from './Page404.module.css';
import { Link } from '@/i18n/routing';
import ArrowCorner from './ArrowCorner';

export default function NotFound() {
  const t = useTranslations('page404');

  return (
    <div className={styled.page}>
      <Container>
        <Navigation title={t('breadscrambps')} />
        <div className={styled.mainBox}>
          <div className={styled.main}>
            <h1 className={styled.title}>404</h1>
            <p className={styled.descr}>{t('description1')}</p>
            <p className={styled.descr}>{t('description2')}</p>
          </div>
          <div className={styled.img}>
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
