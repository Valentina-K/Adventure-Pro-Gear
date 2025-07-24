import { AppRoutes } from '@/constants/routes';
import serverGuard from '@/utils/serverGuard';
import { getTranslations } from 'next-intl/server';
import { Locale } from '@/i18n-config';
import options from '@/config/nextAuth';
import { getOrderById } from '@/services/axios';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import icon from '@/../public/images/Download.png';
import OrderDetail from '@/components/ProfileMenu/Orders/OrderDetail';
import OrderStatusBar from '@/components/ProfileMenu/Orders/OrderDetail/OrderStatusBar';
import styles from './Order.module.css';

interface OrderProps {
  params: {
    lang: Locale;
    id: number;
    wait?: string;
  };
}

const Order: React.FC<OrderProps> = async ({ params }) => {
  const { lang, id, wait } = params;
  const session = await getServerSession(options);
  const order = await getOrderById(id);
  type OrdersListItem = {
    productId: number;
    quantity: number;
  };
  const products = order.ordersLists.map((ord: OrdersListItem) => ({
    productId: ord.productId,
    count: ord.quantity
  }));
  const date = new Date(order.orderDate);
  const shortDate = date.toLocaleDateString();
  const t = await getTranslations({ lang, namespace: 'profile' });
  const attempt = parseInt(wait || '0', 10);
  await serverGuard({
    currentAttempt: attempt,
    currentPath: `${AppRoutes.PERSONAL_ACCOUNT}/orders/${id}`,
  });
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>
        {t('orders.title')}
        <span className={styles.orderNumber}> {id}</span>
      </h1>
      <div className={styles.addressBlock}>
        <div className={styles.addressInfo}>
          <h3 className={styles.h3}>{t('orders.shippingAddress')}</h3>
          <p className={styles.text}>
            {session?.user.name} {session?.user.surname}
          </p>
          <p className={styles.text}>+38 (050) 535-35-63</p>
          <p className={styles.text}>{order.postAddress}</p>
          <p className={styles.text}>{order.city}</p>
        </div>
        <div className={styles.addressInfo}>
          <h3 className={styles.h3}>{t('orders.billingAddress')}</h3>
          <p className={styles.text}>
            {session?.user.name} {session?.user.surname}
          </p>
          <p className={styles.text}>+38 (050) 535-35-63</p>
          <p className={styles.text}>{order.postAddress}</p>
          <p className={styles.text}>{order.city}</p>
        </div>
        <button className={styles.button}>
          <Image src={icon} alt="icon" width={24} height={24} className={styles.icon} />
          {t('orders.invoice')}
        </button>
      </div>
      <div className={styles.h3}>{t('orders.orderDate')} {shortDate}</div>
      <div>
        <h3 className={`${styles.h3} ${styles.treck}`}>{t('orders.orderStatus')}</h3>
        <p className={styles.treck}>
          {t('orders.track')} <span className={styles.treckNumber}>{id}</span>
        </p>
        <OrderStatusBar status={order.status} t={t} />
      </div>
      <div>
        <h3 className={styles.h3}>{t('orders.yourGoods')}</h3>
        <OrderDetail productList={products} t={t} lang={lang} />
      </div>
    </section>
  );
};

export default Order;
