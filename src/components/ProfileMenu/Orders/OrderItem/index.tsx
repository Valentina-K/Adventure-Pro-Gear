import React from 'react';
import { IOrderType } from '@/types';
import { Link } from '@/i18n/routing';
import { AppRoutes } from '@/constants/routes';
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
      <Link href={`${AppRoutes.PERSONAL_ACCOUNT}/orders/${order.id}`} className={styles.link}>
        <td className={styles.cell}>{order.id}</td>
      </Link>
      <td className={styles.cell}>{shortDate}</td>
      <td className={styles.cell}>{order.price}</td>
      <td className={`${styles.cell} ${styles.status}`}>{order.status}</td>
    </tr>
  );
};

export default OrderItem;
