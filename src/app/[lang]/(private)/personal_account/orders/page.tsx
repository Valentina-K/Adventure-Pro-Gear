import React from 'react';
import { getTranslations } from 'next-intl/server';
import { getOrders } from '@/services/axios';
import { IPageProps } from '@/types';
import OrdersList from '@/components/ProfileMenu/OrdersList';
import styles from './Orders.module.css';

const Orders: React.FC<IPageProps> = async ({ params }) => {
  const { lang } = params;
  const t = await getTranslations({ lang, namespace: 'profile' });
  const orders = await getOrders();
  console.log('orders', orders);
  return (
    <section>
      <h2 className={styles.title}>{t('orders.title')}</h2>
      {!orders ? (<p className={styles.text}>{t('orders.notOrdersYet')}</p>) : (<OrdersList orders={orders} t={t} />)}
    </section>
  );
};

export default Orders;
