'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import styles from './PaymentCard.module.css';
import visa from '../../../../public/images/visa.png';
import payPal from '../../../../public/images/payPal.png';
import googlePay from '../../../../public/images/googlePay.png';

import BasketList from '../BasketList/BasketList';
import { useParams } from 'next/navigation';

const PaymentCard = ({ setFormData }: { setFormData: (form: any) => void }) => {
  const params = useParams();
  const t = useTranslations('basket.choosePayment');
  const [activePayment, setActivePayment] = useState(1);
  const [sumOrder, setSumOrder] = useState(0);

  const handlePayment = (value: number) => {
    setActivePayment(value);
  };

  return (
    <div className={styles.paymentCard_container}>
      <div>
        <h2 className={styles.title}>{t('chooseMethod')}</h2>

        <div className={styles.radio_container}>
          <div className={styles.checked_container}>
            <input
              type="radio"
              name="payment"
              value="card"
              id="card"
              defaultChecked
              className={styles.input}
              onClick={() => handlePayment(1)}
            />
            <label
              htmlFor="card"
              className={styles.label}
              onClick={() => handlePayment(1)}
              aria-hidden={true}
            >
              {t('card')}
            </label>
            <Image src={visa} alt="card" />
          </div>

          {activePayment === 1 && (
            <form className={styles.form}>
              <input
                type="text"
                placeholder={params.lang === 'uk' ? 'Номер картки' : 'Card number'}
                className={styles.input_field}
              />

              <div className={styles.card_details}>
                <input
                  type="text"
                  placeholder={params.lang === 'uk' ? 'Термін дії мм/рр' : 'Expiration date mm/yy'}
                  className={`${styles.input_field} ${styles.half}`}
                />
                <input
                  type="text"
                  placeholder={params.lang === 'uk' ? 'CVV код' : 'CVV code'}
                  className={`${styles.input_field} ${styles.half}`}
                />
              </div>

              <input
                type="text"
                placeholder={params.lang === 'uk' ? 'Ім’я власника' : 'Name of the owner'}
                className={styles.input_field}
              />
            </form>
          )}
          <div className={styles.checked_container}>
            <input
              type="radio"
              name="payment"
              value="payPal"
              id="payPal"
              className={styles.input}
              onClick={() => handlePayment(2)}
              aria-hidden={true}
            />
            <label
              htmlFor="payPal"
              className={styles.label}
              onClick={() => handlePayment(2)}
              aria-hidden={true}
            >
              {t('paymentVia')}
            </label>
            <Image src={payPal} alt="payPal" />
          </div>
          {activePayment === 2 && <p className={styles.descr}>{t('descrPayPal')}</p>}
          <div className={styles.checked_container}>
            <input
              type="radio"
              name="payment"
              value="googlePay"
              id="googlePay"
              className={styles.input}
              onClick={() => handlePayment(3)}
              aria-hidden={true}
            />
            <label
              htmlFor="googlePay"
              className={styles.label}
              onClick={() => handlePayment(3)}
              aria-hidden={true}
            >
              {t('paymentVia')}
            </label>
            <Image src={googlePay} alt="googlePay" />
          </div>
          {activePayment === 3 && <p className={styles.descr}>{t('descrGooglePay')}</p>}
        </div>
      </div>
      <div>
        <p className={styles.subTitle}>{t('title')}</p>
        <BasketList
          setSumOrder={setSumOrder}
          variant="small"
          formData={{
            // name: '',
            // surname: '',
            // tel: undefined,
            postAddress: '',
            city: '',
            // pochtIndex: '',
            // basket: [],
            // company: undefined,
            // mpe: undefined,
            comment: '',
            ordersLists: [],
          }}
          setFormData={setFormData}
        />
        <p className={styles.sumOrder}>
          {t('sum')}
          <span>{sumOrder}</span>
        </p>
      </div>
    </div>
  );
};
export default PaymentCard;
