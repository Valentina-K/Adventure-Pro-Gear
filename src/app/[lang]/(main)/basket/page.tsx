'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Navigation from '@/components/Navigation/Navigation';
import Container from '@/components/Container';
import BasketCard from '@/components/Basket/BasketCard/BasketCard';
import DeliveryCard from '@/components/Basket/DeliveryCard/Delivery';
import PaymentCard from '@/components/Basket/PaymentCard/PaymentCard';
import { useAppDispatch } from '@/redux/store';
import { clearShoppingCart } from '@/redux/products/slice';
import arrows from '../../../../../public/icons/Arrows.svg';
import arrowsRight from '../../../../../public/icons/arrowsRight.svg';
import styles from './basket.module.css';

const Basket = () => {
  const [formData, setFormData] = useState({
    basket: [],
    name: '',
    surname: '',
    tel: '',
    postAddress: '',
    city: '',
    pochtIndex: '',
    company: '',
    mpe: '',
    comment: '',
  });

  const dispatch = useAppDispatch();

  const [activeCard, setActiveCard] = useState<boolean[]>([true]);
  const [activeForm, setActiveForm] = useState<string>('');

  const handleActiveForm = (value: string) => {
    setActiveForm(value);
  };

  const handleChooseCard = (value: boolean) => {
    if (!value) {
      setActiveCard([true]);
      return;
    }
    setActiveCard(prev => ([...prev, value]));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('formData', formData);
    dispatch(clearShoppingCart());
  };
  return (
    <Container>
      <Navigation title="Оформлення замовлення" />
      <h2 className={styles.title}>Оформлення замовлення</h2>
      <ul className={styles.list}>
        <li className={clsx(styles.item)}>
          <p className={clsx(styles.item_title, styles.item_active)}>Кошик</p>
          <Image src={arrows} alt="arrow" />
        </li>
        <li className={styles.item}>
          <p
            className={clsx(
              styles.item_title,
              activeCard.length === 2 || activeCard.length === 3 ? styles.item_active : ''
            )}
          >
            Доставка
          </p>
          <Image src={arrows} alt="arrow" />
        </li>
        <li className={styles.item}>
          <p className={clsx(styles.item_title, activeCard.length === 3 ? styles.item_active : '')}>
            Оплата
          </p>
        </li>
      </ul>

      {activeCard?.length === 1 && <BasketCard formData={formData} setFormData={setFormData} />}
      {activeCard?.length === 2 && (
        <DeliveryCard
          setFormData={setFormData}
          formData={formData}
          activeForm={activeForm}
          handleActiveForm={handleActiveForm}
        />
      )}
      {activeCard?.length === 3 && <PaymentCard setFormData={setFormData} />}

      <div className={styles.footer} style={activeForm === 'other' ? { marginTop: '272px' } : {}}>
        {activeCard?.length !== 1 ? (
          <p className={styles.back} onClick={() => handleChooseCard(false)} aria-hidden="true">
            <Image src={arrowsRight} alt="arrows" className={styles.img} />
            Повернутися до кошика
          </p>
        ) : (
          <p className={styles.back}>
            <Image src={arrowsRight} alt="arrows" className={styles.img} />
            Повернутися до вибору товару
          </p>
        )}

        {activeCard?.length !== 3 ? (
          <button
            type="submit"
            className={styles.footer_btn}
            onClick={() => handleChooseCard(true)}
          >
            Продовжити
          </button>
        ) : (
          <form onSubmit={handleSubmit}>
            <button type="submit" className={styles.footer_btn}>
              Оформити замовлення
            </button>
          </form>
        )}
      </div>
    </Container>
  );
};

export default Basket;
