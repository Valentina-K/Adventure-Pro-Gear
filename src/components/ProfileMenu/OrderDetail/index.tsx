import React from 'react';
import { IOrderType } from '@/types';
import styles from './OrderDetail.module.css';

const OrderDetail: React.FC<IOrderType> = ({ order, className = '' }) => {
  return (
    <tr className={className}>
      <td className={styles.cell}>{order.id}</td>
      <td className={styles.cell}>{order.orderDate}</td>
      <td className={styles.cell}>{order.price}</td>
      <td className={styles.cell}>{order.status}</td>
    </tr>
  );
};

export default OrderDetail;
