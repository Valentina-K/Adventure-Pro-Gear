import React from 'react';
import Image from 'next/image';
import paypal from '@/../public/images/payPal.png';
import googlepay from '@/../public/images/googlePay.png';
import visa from '@/../public/images/visa.png';
import mastercard from '@/../public/images/mastercard.png';
import styles from './Payment.module.css';

interface PaymentProps {
  onClick: (name: string) => void;
}

const Payment: React.FC<PaymentProps> = ({ onClick })=> {
  const handleClick = (name: string) => {
    onClick(name);
  };
  return (
    <div>
      <h3 className={styles.title}>Спосіб оплати</h3>
      <div className={styles.container}>
        <Image
          src={visa}
          alt="visa"
          width={60}
          height={41}
          onClick={() => handleClick('visa')}
          className={styles.image}
        />
        <Image
          src={mastercard}
          alt="mastercard"
          width={60}
          height={41}
          onClick={() => handleClick('mastercard')}
          className={styles.image}
        />
        <Image
          src={paypal}
          alt="paypal"
          width={60}
          height={41}
          onClick={() => handleClick('paypal')}
          className={styles.image}
        />
        <Image
          src={googlepay}
          alt="googlepay"
          width={60}
          height={41}
          onClick={() => handleClick('googlepay')}
          className={styles.image}
        />
      </div>
    </div>
  );
};

export default Payment;
