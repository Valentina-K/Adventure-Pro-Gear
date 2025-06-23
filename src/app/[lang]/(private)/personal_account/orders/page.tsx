import React from 'react';
import { getTranslations } from 'next-intl/server';
import { getOrders } from '@/services/axios';
import { IPageProps } from '@/types';
import styles from './Orders.module.css';

const Orders: React.FC<IPageProps> = async ({ params }) => {
  const { lang } = params;
  const t = await getTranslations({ lang, namespace: 'profile' });
  const orders = await getOrders();
  console.log(orders);
  return (
    <section>
      <h2>{t('orders.title')}</h2>
      {orders.length < 1 ? (<p>{t('orders.notOrdersYet')}</p>) : (<>Orders list</>)}
    </section>
  );
};

export default Orders;
