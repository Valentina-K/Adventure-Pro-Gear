import React from 'react';
import { IOrderType } from '@/types';
import OrderDetail from '../OrderDetail';
import styles from './OrdersList.module.css';

interface OrdersListProp {
  orders: IOrderType[];
}

function OrdersList({ orders }: OrdersListProp) {
  console.log(orders);
  return (
    <ul className={styles.list}>
      {orders.map(order => (
        <OrderDetail key={order.order.id} order={order.order} />
      ))}
    </ul>
  );
}

export default OrdersList;
