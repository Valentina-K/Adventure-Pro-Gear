import React from 'react';
import OrderStatusPoint from './OrderStatusPoint';
import styles from './OrderDetail.module.css';

const statusArray = ['NEW', 'PAID', 'AWAITING', 'SENT', 'DELIVERED'];

interface OrderStatusBarProps {
    status: string;
    t: (key: string) => string;
}

function OrderStatusBar({ status, t }: OrderStatusBarProps) {
    const statusIindex = statusArray.findIndex(item => item === status);
    return (
      <div className={styles.statusBar_wrapper}>
        <div className={styles.statusBarContainer}>
          <OrderStatusPoint />
          <div className={styles.line}></div>
          <OrderStatusPoint className={statusIindex < 1 ? `${styles.undone}` : ''} />
          <div className={styles.line}></div>
          <OrderStatusPoint className={statusIindex < 2 ? `${styles.undone}` : ''} />
          <div className={styles.line}></div>
          <OrderStatusPoint className={statusIindex < 3 ? `${styles.undone}` : ''} />
          <div className={styles.line}></div>
          <OrderStatusPoint className={statusIindex < 4 ? `${styles.undone}` : ''} />
        </div>
        <div className={styles.statusTextBlock}>
          <p className={styles.text}>{t('orders.new')}</p>
          <p className={statusIindex < 1 ? `${styles.undone}` : ''}>{t('orders.accepted')}</p>
          <p className={statusIindex < 2 ? `${styles.undone}` : ''}>{t('orders.awaiting')}</p>
          <p className={statusIindex < 3 ? `${styles.undone}` : ''}>{t('orders.sent')}</p>
          <p className={statusIindex < 4 ? `${styles.undone}` : ''}>{t('orders.delivered')}</p>
        </div>
      </div>
    );
}

export default OrderStatusBar
