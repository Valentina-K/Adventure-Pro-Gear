import { AppRoutes } from '@/constants/routes';
import serverGuard from '@/utils/serverGuard';
import { getTranslations } from 'next-intl/server';
import { Locale } from '@/i18n-config';
import options from '@/config/nextAuth';
import { getOrderById } from '@/services/axios';
import { getServerSession } from 'next-auth';
import icon from '@/../public/images/Download.png';
import styles from './Order.module.css';
import Image from 'next/image';

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
  const date = new Date(order.orderDate);
  const shortDate = date.toLocaleDateString();
  console.log('order', order);
  console.log('session', session?.user);
  const t = await getTranslations({ lang, namespace: 'profile' });
  const attempt = parseInt(wait || '0', 10);
  await serverGuard({
    currentAttempt: attempt,
    currentPath: `${AppRoutes.PERSONAL_ACCOUNT}/orders/${id}`,
  });
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>
        Замовлення:
        <span className={styles.orderNumber}> {id}</span>
      </h1>
      <div className={styles.addressBlock}>
        <div className={styles.addressInfo}>
          <h3 className={styles.h3}>Адреса доставки</h3>
          <p className={styles.text}>
            {session?.user.name} {session?.user.surname}
          </p>
          <p className={styles.text}>+38 (050) 535-35-63</p>
          <p className={styles.text}>{order.postAddress}</p>
          <p className={styles.text}>{order.city}</p>
        </div>
        <div className={styles.addressInfo}>
          <h3 className={styles.h3}>Платіжна адреса</h3>
          <p className={styles.text}>
            {session?.user.name} {session?.user.surname}
          </p>
          <p className={styles.text}>+38 (050) 535-35-63</p>
          <p className={styles.text}>{order.postAddress}</p>
          <p className={styles.text}>{order.city}</p>
        </div>
        <button className={styles.button}>
          <Image src={icon} alt="icon" width={24} height={24} className={styles.icon} />
          Завантажити рахунок
        </button>
      </div>
      <div className={styles.h3}>Дата замовлення: {shortDate}</div>
      <div>
        <h3 className={styles.h3}>Статус замовлення</h3>
        <p className={styles.treckNumber}>Трек-номер замовлення</p>
      </div>
      <div>
        <h3 className={styles.h3}>Ваші товари</h3>
        <ul>list</ul>
      </div>
    </section>
  );
};

export default Order;
