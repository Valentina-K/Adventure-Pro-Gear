import React from 'react';
import Image from 'next/image';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import paypal from '@/../public/images/payPal.png';
import googlepay from '@/../public/images/googlePay.png';
import visa from '@/../public/images/visa.png';
import mastercard from '@/../public/images/mastercard.png';
import styles from './Payment.module.css';

interface PaymentProps {
  title: string;
}

const Payment: React.FC<PaymentProps> = ({ title }) => {
  const width = useWindowWidth();
  return (
    <div>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.container}>
        <Image src={visa} alt="visa" width={60} height={41} className={styles.image} />
        <Image src={mastercard} alt="mastercard" width={60} height={41} className={styles.image} />
        <Image src={paypal} alt="paypal" width={60} height={41} className={styles.image} />
        {width !== null && width > 743 && (
          <Image src={googlepay} alt="googlepay" width={60} height={41} className={styles.image} />
        )}
      </div>
    </div>
  );
};

export default Payment;
