'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import delivery from '../../../../public/icons/delivery.svg';
import styles from './BasketCard.module.css';
import BasketList from '../BasketList/BasketList';

interface IBasketCardProps {
  formData: {
    // name: string;
    // surname: string;
    // tel?: string;
    postAddress: string;
    city: string;
    // pochtIndex: string;
    // basket: any[];
    // company?: string;
    // mpe?: string;
    comment: string;
    ordersLists: {}[];
  };
  setFormData: (form: any) => void;
}

const BasketCard: React.FC<IBasketCardProps> = ({ formData, setFormData }) => {
  const t = useTranslations('basket.basketCard');
  const params = useParams();
  const [sumOrder, setSumOrder] = useState(0);

  return (
    <div>
      <h2 className={styles.title}>{t('title')}</h2>
      <BasketList
        setSumOrder={setSumOrder}
        setFormData={setFormData}
        formData={formData}
      />
      <div className={styles.delivery_container}>
        <div className={styles.delivery}>
          <p>{t('delivery')}</p>
          <Image src={delivery} alt="delivery" />

          <span>0 ₴</span>
        </div>
      </div>
      <div className={styles.coupon}>
        <p>{t('coupon')}</p>
        <input
          name="coupon"
          placeholder={params.lang === 'uk' ? 'Введіть промокод' : 'Enter promo code'}
        />
      </div>
      <p className={styles.sumOrder}>
        {t('sum')}
        <span>{sumOrder}</span>
      </p>
    </div>
  );
};

export default BasketCard;
