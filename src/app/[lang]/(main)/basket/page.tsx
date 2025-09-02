'use client';

import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Navigation from '@/components/Navigation/Navigation';
import { useAppDispatch } from '@/redux/store';
import { useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import { selectOpenShoppingCart } from '@/redux/products/selectors';
import { clearShoppingCart } from '@/redux/products/slice';
import Link from 'next/link';
import { postOrder } from '@/app/actions';
import Container from '@/components/Container';
import { toast } from 'react-toastify';
import BasketCard from '@/components/Basket/BasketCard/BasketCard';
import DeliveryCard from '@/components/Basket/DeliveryCard/Delivery';
import PaymentCard from '@/components/Basket/PaymentCard/PaymentCard';
import arrows from '../../../../../public/icons/Arrows.svg';
import arrowsRight from '../../../../../public/icons/arrowsRight.svg';
import styles from './basket.module.css';

//41ee4feafa@webxios.pro
//123456Aa$
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
  const { data: session, status } = useSession();
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  let shoppingCart = useSelector(selectOpenShoppingCart);
  const t = useTranslations('basket');
  const [activeCard, setActiveCard] = useState<boolean[]>([true]);
  const [activeForm, setActiveForm] = useState<string>('');
  const [disebleForm, setDisebleForm] = useState<boolean>(false);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    shoppingCart.length === 0 ? setDisebleForm(true) : setDisebleForm(false);
  }, [formData.ordersLists, shoppingCart.length]);

  // useEffect(() => {
  //   (async () => {
  //     if (!session) return;

  //     if (shoppingCart.length > 0) {
  //       try {
  //         // const orderId = await postOrderList();
  //         const shoppingCartResForServer = shoppingCart.map(
  //           ({ productId, quantity, selfLink, productAttributeId }) => ({
  //             // id: 0,
  //             orderId: Number(String(Date.now()).slice(-5) + Math.floor(Math.random() * 1000)),
  //             productAttributeId,
  //             selfLink,
  //             productId,
  //             quantity,
  //           })
  //         );

  //         const data = await postOrderList(shoppingCartResForServer);
  //         console.log("uyyuutyyuyuyuutyu", data);
  //         // dispatch(clearShoppingCart());
  //       } catch (error: any) {
  //         console.log(error);
  //         toast.error(error.message, {
  //           position: 'top-right',
  //           className: `${styles.signInToastErrorMessage}`,
  //           bodyClassName: `${styles.signInToastBody}`,
  //           autoClose: 36000000,
  //         });
  //       }
  //     }
  //   })();
  // }, [dispatch, session, shoppingCart]);

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

    try {
      const data = await postOrder(formData);
      if (data?.status === 401) {
        return toast.error('Unauthorized', {
          position: 'top-right',
          className: `${styles.signInToastErrorMessage}`,
          bodyClassName: `${styles.signInToastBody}`,
          autoClose: 36000000,
        });
      }
      if (typeof data === 'string' || data.error) {
        throw new Error(data.error || data);
      }
      router.push('/basket/success/');
      dispatch(clearShoppingCart());
      // return toast.success('Success', {
      //   position: 'top-right',
      //   className: styles.successToast,
      //   autoClose: 3000,
      // });
    } catch (error: any) {
      return toast.error(`${error}`, {
        position: 'top-right',
        className: `${styles.signInToastErrorMessage}`,
        bodyClassName: `${styles.signInToastBody}`,
        autoClose: 36000000,
      });
    }
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

      {activeCard?.length === 1 && <BasketCard formData={formData} setFormData={setFormData} />}
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
          <Link href="/" className={styles.back_link}>
            <p className={styles.back}>
              <Image src={arrowsRight} alt="arrows" className={styles.img} />
              {t('backProducts')}
            </p>
          </Link>
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
            <button type="submit" className={styles.footer_btn} disabled={disebleForm}>
              {t('submitOrder')}
            </button>
          </form>
        )}
      </div>
    </Container>
  );
};

export default Basket;
