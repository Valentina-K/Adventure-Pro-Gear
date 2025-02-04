import React from 'react';
import Image from 'next/image';
import paypal from '@/../public/images/payPal.png';
import googlepay from '@/../public/images/googlePay.png';
import visa from '@/../public/images/visa.png';
import mastercard from '@/../public/images/mastercard.png';
import Payments from '@/constants/payments';
import styles from './Payment.module.css';

interface PaymentProps {
  title: string;
  onClick: (name: Payments) => void;
}

const Payment: React.FC<PaymentProps> = ({ title, onClick })=> {
  const handleClick = (name: Payments) => {
    onClick(name);
  };
  return (
    <div>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.container}>
        <Image
          src={visa}
          alt="visa"
          width={60}
          height={41}
          onClick={() => handleClick(Payments.VISA)}
          className={styles.image}
        />
        <Image
          src={mastercard}
          alt="mastercard"
          width={60}
          height={41}
          onClick={() => handleClick(Payments.MASTERCARD)}
          className={styles.image}
        />
        <Image
          src={paypal}
          alt="paypal"
          width={60}
          height={41}
          onClick={() => handleClick(Payments.PAYPAL)}
          className={styles.image}
        />
        <Image
          src={googlepay}
          alt="googlepay"
          width={60}
          height={41}
          onClick={() => handleClick(Payments.GOOGLEPAY)}
          className={styles.image}
        />
      </div>
    </div>
  );
};

export default Payment;
