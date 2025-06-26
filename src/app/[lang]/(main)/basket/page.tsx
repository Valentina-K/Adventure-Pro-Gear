'use client';

import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Navigation from '@/components/Navigation/Navigation';
import { useAppDispatch } from '@/redux/store';
import { useSelector } from 'react-redux';
import { selectOpenShoppingCart } from '@/redux/products/selectors';
import { clearShoppingCart } from '@/redux/products/slice';
import { postOrder, updatePersonalData } from '@/app/actions';
import Container from '@/components/Container';
import BasketCard from '@/components/Basket/BasketCard/BasketCard';
import DeliveryCard from '@/components/Basket/DeliveryCard/Delivery';
import PaymentCard from '@/components/Basket/PaymentCard/PaymentCard';
<<<<<<< HEAD
import { useAppDispatch } from '@/redux/store';
import { clearShoppingCart } from '@/redux/products/slice';
=======
>>>>>>> develop
import arrows from '../../../../../public/icons/Arrows.svg';
import arrowsRight from '../../../../../public/icons/arrowsRight.svg';
import styles from './basket.module.css';

const Basket = () => {
  const [formData, setFormData] = useState({
    // basket: [],
    // name: '',
    // surname: '',
    // tel: '',
    postAddress: '',
    city: '',
    // pochtIndex: '',
    // company: '',
    // mpe: '',
    comment: '',
    ordersLists: [],
  });
  const params = useParams();
  const dispatch = useAppDispatch();
  let shoppingCart = useSelector(selectOpenShoppingCart);
  const t = useTranslations('basket');
  const [activeCard, setActiveCard] = useState<boolean[]>([true]);
  const [activeForm, setActiveForm] = useState<string>('');
  const [disebleForm, setDisebleForm] = useState<boolean>(false);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    shoppingCart.length === 0 ? setDisebleForm(true) : setDisebleForm(false);
  }, [setDisebleForm, shoppingCart]);

  const handleActiveForm = (value: string) => {
    setActiveForm(value);
  };

  const handleChooseCard = (value: boolean) => {
    if (!value) {
      setActiveCard([true]);
      return;
    }
    setActiveCard(prev => [...prev, value]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('formData', formData);
    const data = await postOrder(formData);
    dispatch(clearShoppingCart());
  };
  return (
    <Container>
      <Navigation title={params.lang === 'uk' ? 'Оформлення замовлення' : 'Placing an order'} />
      <h2 className={styles.title}>{t('title')}</h2>
      <ul className={styles.list}>
        <li className={clsx(styles.item)}>
          <p className={clsx(styles.item_title, styles.item_active)}>{t('basket')}</p>
          <Image src={arrows} alt="arrow" />
        </li>
        <li className={styles.item}>
          <p
            className={clsx(
              styles.item_title,
              activeCard.length === 2 || activeCard.length === 3 ? styles.item_active : ''
            )}
          >
            {t('basketCard.delivery')}
          </p>
          <Image src={arrows} alt="arrow" />
        </li>
        <li className={styles.item}>
          <p className={clsx(styles.item_title, activeCard.length === 3 ? styles.item_active : '')}>
            {t('payment')}
          </p>
        </li>
      </ul>

      {activeCard?.length === 1 && (
        <BasketCard formData={formData} setFormData={setFormData} />
      )}
      {activeCard?.length === 2 && (
        <DeliveryCard
          setFormData={setFormData}
          formData={formData}
          activeForm={activeForm}
          handleActiveForm={handleActiveForm}
          setDisebleForm={setDisebleForm}
        />
      )}
      {activeCard?.length === 3 && <PaymentCard setFormData={setFormData} />}

      <div className={styles.footer} style={activeForm === 'other' ? { marginTop: '272px' } : {}}>
        {activeCard?.length !== 1 ? (
          <p className={styles.back} onClick={() => handleChooseCard(false)} aria-hidden="true">
            <Image src={arrowsRight} alt="arrows" className={styles.img} />
            {t('backBasket')}
          </p>
        ) : (
          <p className={styles.back}>
            <Image src={arrowsRight} alt="arrows" className={styles.img} />
            {t('backProducts')}
          </p>
        )}

        {activeCard?.length !== 3 ? (
          <button
            type="submit"
            className={styles.footer_btn}
            disabled={disebleForm}
            onClick={() => handleChooseCard(true)}
          >
            {t('continue')}
          </button>
        ) : (
          <form onSubmit={handleSubmit}>
            <button type="submit" className={styles.footer_btn}>
              {t('submitOrder')}
            </button>
          </form>
        )}
      </div>
    </Container>
  );
};

export default Basket;
