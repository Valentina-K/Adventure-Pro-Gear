'use client';

import React, { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import SignUp from '@/components/Header/ProductNavBar/AuthContainer/components/SignUp';
import SignIn from '@/components/Header/ProductNavBar/AuthContainer/components/SignIn';
import Invoice from '../Invoice/Invoice';
import DeliveryForm from '../DeliveryForm/DeliveryForm';
import styles from './Delivery.module.css';

interface IDeliveryCardProps {
  formData: {
    // name: string;
    // surname: string;
    // tel?: string;
    postAddress: string;
    city: string;
    // pochtIndex: string;
    // basket: any[];
    // company?: string;
    // mpe?: string;
    comment: string;
    ordersLists: {}[];
  };
  activeForm: string;
  handleActiveForm: (value: string) => void;
  setFormData: any;
  setDisebleForm: any;
}

const DeliveryCard: React.FC<IDeliveryCardProps> = ({
  setFormData,
  formData,
  activeForm,
  handleActiveForm,
  setDisebleForm,
}) => {
  const { data: session, status } = useSession();
  const t = useTranslations('basket.delivery');
  const [newUser, setNewUser] = useState(true);
  const [authUser, setAuthUser] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    !session ? setDisebleForm(true) : setDisebleForm(false);
  }, [session, setDisebleForm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeUserStatus = (statusUser: string) => {
    if (statusUser === 'newUser') {
      setNewUser(true);
      setAuthUser(false);
    }
    if (statusUser === 'authUser') {
      setNewUser(false);
      setAuthUser(true);
    }
  };

  return (
    <div className={styles.deliveryCard_container}>
      <h3 className={styles.title}>{t('contact')}</h3>
      <p className={styles.descr}>{t('descr')}</p>
      {!session && (
        <ul className={styles.btn_container}>
          <li>
            <button
              type="button"
              onClick={() => handleChangeUserStatus('newUser')}
              className={clsx(styles.btn, newUser && styles.active)}
            >
              {t('newClient')}
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => handleChangeUserStatus('authUser')}
              className={clsx(styles.btn, !newUser && styles.active)}
            >
              {t('oldClient')}
            </button>
          </li>
        </ul>
      )}
      <div className={styles.right_container}>
        <Invoice
          setFormData={setFormData}
          formData={formData}
          handleActiveForm={handleActiveForm}
          activeForm={activeForm}
        />
      </div>
      {!session && (
        <div className={styles.auth_container}>
          {newUser && <SignUp />}
          {authUser && <SignIn />}
        </div>
      )}
      {session && (
        <>
          <p className={styles.form_title}>{t('dataDelivery')}</p>
          <DeliveryForm handleChange={handleChange} formData={formData} activeForm={activeForm} />

          <div className={styles.checkbox_container}>
            <input
              id="checkbox"
              type="checkbox"
              className={styles.checkbox}
              // onChange={handleCheckboxChange}
            />
            <label htmlFor="checkbox" className={styles.label}>
              {t('saveAddress')}
            </label>
          </div>
        </>
      )}
    </div>
  );
};

export default DeliveryCard;
