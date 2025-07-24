import React from 'react';
import { getTranslations } from 'next-intl/server';
import { getOrders } from '@/services/axios';
import { IPageProps } from '@/types';
import serverGuard from '@/utils/serverGuard';
import { AppRoutes } from '@/constants/routes';
import OrdersBody from '@/components/ProfileMenu/Orders/OrdersBody';
import styles from './Orders.module.css';

const Orders: React.FC<IPageProps> = async ({ params }) => {
  const { lang, wait } = params;
  const t = await getTranslations({ lang, namespace: 'profile' });
  const attempt = parseInt(wait || '0', 10);
  await serverGuard({
    currentAttempt: attempt,
    currentPath: `${AppRoutes.PERSONAL_ACCOUNT}/orders`,
  });

  const orders = await getOrders();
  const countPage = orders.length > 4 ? Math.trunc(orders.length) / 4 : 1;
  return (
    <section>
      <h2 className={styles.title}>{t('orders.title')}</h2>
      {orders?.length < 1 ? (
        <p className={styles.text}>{t('orders.notOrdersYet')}</p>
      ) : (
        <OrdersBody orders={orders} countPage={countPage} />
      )}
    </section>
  );
};

export default Orders;
