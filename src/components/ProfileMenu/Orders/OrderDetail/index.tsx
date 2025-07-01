import React from 'react';
import { IOrderType } from '@/types';
import styles from './OrderDetail.module.css';

interface OrderDetailProps {
  order: IOrderType;
  className: string;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ order, className = '' }) => {
  const date = new Date(order.orderDate);
  const shortDate = date.toLocaleDateString();
  console.log(className);
  return (
    <tr className={className}>
      <td className={styles.cell}>{order.id}</td>
      <td className={styles.cell}>{shortDate}</td>
      <td className={styles.cell}>{order.price}</td>
      <td className={styles.cell}>{order.status}</td>
    </tr>
  );
};

export default OrderDetail;
