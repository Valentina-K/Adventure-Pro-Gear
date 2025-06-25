import React from 'react';
import { IOrderType } from '@/types';
import OrderDetail from '../OrderDetail';
import styles from './OrdersList.module.css';

interface OrdersListProp {
  orders: IOrderType[];
  t: (key: string) => string;
}

function OrdersList({ orders, t }: OrdersListProp) {
  console.log(orders);
  return (
    <table className={styles.ordersTable}>
      <thead>
        <tr>
          <th>{t('orders.number')}</th>
          <th>{t('orders.date')}</th>
          <th>{t('orders.totalAmount')}</th>
          <th>{t('orders.status')}</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, ind) => (
          <OrderDetail key={order.order.id} order={order.order} className={ind % 2 === 0 ? 'even' : 'odd'} />
        ))}
      </tbody>
    </table>
  );
}

export default OrdersList;
