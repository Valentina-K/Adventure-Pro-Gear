import React from 'react';
import { IOrderType } from '@/types';
import styles from './OrderDetail.module.css';

const OrderDetail: React.FC<IOrderType> = ({ order }) => {
  return (
    <li className={styles.orderContainer}>
      <div className={styles.item}>{order.id}</div>
      <div className={styles.item}>{order.orderDate}</div>
      <div className={styles.item}>{order.price}</div>
      <div className={styles.item}>{order.status}</div>
    </li>
  );
};

export default OrderDetail;
