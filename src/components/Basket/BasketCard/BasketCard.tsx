'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import delivery from '../../../../public/icons/delivery.svg';
import styles from './BasketCard.module.css';
import BasketList from '../BasketList/BasketList';

interface IBasketCardProps {
  formData: {
    name: string;
    surname: string;
    tel?: string;
    postAddress: string;
    city: string;
    pochtIndex: string;
    basket: any[];
    company?: string;
    mpe?: string;
    comment: string;
  };
  setFormData: any;
}

const BasketCard: React.FC<IBasketCardProps> = ({ formData, setFormData }) => {
  const [sumOrder, setSumOrder] = useState(0);

  return (
    <div>
      <h2 className={styles.title}>Ваше замовлення</h2>
      <BasketList setSumOrder={setSumOrder} setFormData={setFormData} formData={formData} />
      <div className={styles.delivery_container}>
        <div className={styles.delivery}>
          <p>Доставка</p>
          <Image src={delivery} alt="delivery" />

          <span>0 ₴</span>
        </div>
      </div>
      <div className={styles.coupon}>
        <p> Є купон зі знижкою?</p>
        <input name="coupon" placeholder="Введіть промокод" />
      </div>
      <p className={styles.sumOrder}>
        Загальна сума
        <span>{sumOrder}</span>
      </p>
    </div>
  );
};

export default BasketCard;
