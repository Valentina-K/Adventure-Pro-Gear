import { IOrderType } from '@/types';
import React from 'react';
import arrow from '../../../../../public/icons/arrow-right-down.svg';
import download from '../../../../../public/icons/Download.svg';
import Link from 'next/link';
import { AppRoutes } from '@/constants/routes';
import Image from 'next/image';
import styles from './OrdersListMobile.module.css';

interface OrdersListProp {
  orders: IOrderType[];
  t: (key: string) => string;
  page?: number;
}

const OrdersListMobile = ({ orders, t, page = 0 }: OrdersListProp) => {
  const begin = 4 * page;
  const end = begin + 4;
  const ordersOnPage = orders.length > 4 ? orders.slice(begin, end) : orders;

  return (
    <div className={styles.ordersListMobile_container}>
      {ordersOnPage.map((order, ind) => (
        <>
          <ul key={ind} className={`${styles.list} ${ind % 2 === 0 ? `${styles.odd}` : ''}`}>
            <li key={order.id} className={styles.item}>
              <p> {t('orders.number')}</p>
              <Link
                href={`${AppRoutes.PERSONAL_ACCOUNT}/orders/${order?.id}`}
                className={styles.link}
              >
                {order?.id}
              </Link>
            </li>
            <li key={order.orderDate} className={styles.item}>
              <p> {t('orders.date')}</p>
              <span>{new Date(order?.orderDate).toLocaleDateString()}</span>
            </li>
            <li key={order.price} className={styles.item}>
              <p> {t('orders.totalAmount')}</p>
              <span>{order?.price}</span>
            </li>
            <li key={order.status} className={`${styles.item} ${styles.status}`}>
              <p> {t('orders.status')}</p>
              <span>{order?.status}</span>
            </li>
            <li key={order.comment}>
              <div className={styles.btn_container}>
                <button type="button" className={styles.btn}>
                  <Image src={download} alt="arrow" width={24} height={24} />
                  <span>{t('orders.download')}</span>
                </button>
                <Link
                  href={`${AppRoutes.PERSONAL_ACCOUNT}/orders/${order?.id}`}
                  className={styles.btn_link}
                >
                  <span>{t('orders.datails')}</span>
                  <Image src={arrow} alt="arrow" width={14} height={14} />
                </Link>
              </div>
            </li>
          </ul>
        </>
      ))}
    </div>
  );
};

export default OrdersListMobile;
