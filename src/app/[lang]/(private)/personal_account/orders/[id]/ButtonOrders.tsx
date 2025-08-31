'use client';

import Image from 'next/image';
import React from 'react'
import icon from '@/../public/images/Download.png';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import styles from "./ButtonOrders.module.css";
import { useTranslations } from 'next-intl';


export const ButtonOrders = () => {
  const t = useTranslations('profile');
  const width = useWindowWidth();

  return (
    <button className={styles.button}>
      <Image src={icon} alt="icon" width={24} height={24} className={styles.icon} />
      {width > 1179 && `${t('orders.invoice')}`}
    </button>
  );
};
