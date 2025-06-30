import React from 'react';
import { IOrderType } from '@/types';
import styles from './OrderItem.module.css';

interface OrderDetailProps {
  order: IOrderType;
  className: string;
}

const OrderItem: React.FC<OrderDetailProps> = ({ order, className = '' }) => {
  const date = new Date(order.orderDate);
  const shortDate = date.toLocaleDateString();
  console.log('order.ordersLists', order.ordersLists);
  return (
    <tr className={className}>
      <td className={styles.cell}>{order.id}</td>
      <td className={styles.cell}>{shortDate}</td>
      <td className={styles.cell}>{order.price}</td>
      <td className={styles.cell}>{order.status}</td>
    </tr>
  );
};

export default OrderItem;
