'use client';

import Image from 'next/image';
import React from 'react';
import { useParams } from 'next/navigation';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslations } from 'use-intl';
// eslint-disable-next-line import/no-unresolved
import Navigation from '@/components/Navigation/Navigation';
// eslint-disable-next-line import/no-unresolved
import Container from '@/components/Container';
import deliverySuccess from '../../../../../../public/images/illustration_success.svg';
import styles from './success.module.css';

const Success = () => {
  const params = useParams();
  const t = useTranslations('basket');

  return (
    <Container>
      <Navigation title={params?.lang === 'uk' ? 'Оформлення замовлення' : 'Placing an order'} />
      <div className={styles.success_container}>
        <div className={styles.success_left}>
          <p className={styles.descr}>{t('successfulPayment.descr_under')}</p>
          <h2 className={styles.title}>{t('successfulPayment.title')}</h2>
          <p className={styles.descr}>
            {t('successfulPayment.descr_2')}
            {' '}
            <span className={styles.accent}>{t('successfulPayment.accent_2')}</span>
          </p>
          <p className={styles.descr}>
            {t('successfulPayment.descr_3')}
            {' '}
            <span className={styles.accent}>{t('successfulPayment.accent_3')}</span>
            {' '}
            {t('successfulPayment.descr_4')}
          </p>
          <p className={styles.descr}>
            {t('successfulPayment.name')}
            <span className={styles.accent_name}> Adventure Pro Gear</span>
          </p>
        </div>
        <div className={styles.success_right}>
          <Image src={deliverySuccess} alt="img" width={540} height={319} />
        </div>
      </div>
    </Container>
  );
};

export default Success;
