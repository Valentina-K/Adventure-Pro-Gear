'use client';

import React, { useEffect } from 'react';
import { IOrderType } from '@/types';
import OrderItem from '../OrderItem';
import styles from './OrdersList.module.css';

interface OrdersListProp {
  orders: IOrderType[];
  t: (key: string) => string;
  page?: number;
}

function OrdersList({ orders, t, page = 0 }: OrdersListProp) {
  // const begin = 4 * (page - 1);
  const begin = 4 * page;
  const end = begin + 4;
  const ordersOnPage = orders.length > 4 ? orders.slice(begin, end) : orders;

return (
    <table className={styles.ordersTable}>
      <thead className={styles.tableTitle}>
        <tr>
          <th>{t('orders.number')}</th>
          <th>{t('orders.date')}</th>
          <th>{t('orders.totalAmount')}</th>
          <th>{t('orders.status')}</th>
        </tr>
      </thead>
      <tbody>
        {ordersOnPage.map((order, ind) => (
          <OrderItem
            key={order.id}
            order={order}
            className={ind % 2 !== 0 ? `${styles.odd}` : ''}
          />
        ))}
      </tbody>
    </table>
  );
}

export default OrdersList;
