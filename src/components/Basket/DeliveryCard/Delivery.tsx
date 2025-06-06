'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { clsx } from 'clsx';

import styles from './Delivery.module.css';
import Invoice from '../Invoice/Invoice';
import DeliveryForm from '../DeliveryForm/DeliveryForm';

interface IDeliveryCardProps {
  formData: {
    name: string;
    surname: string;
    tel?: string;
    postAddress: string;
    city: string;
    pochtIndex: string;
    basket: any[];
    company?: string;
    mpe?: string;
    comment: string;
  };
  activeForm: string;
  handleActiveForm: (value: string) => void;
  setFormData: any;
}

const DeliveryCard: React.FC<IDeliveryCardProps> = ({
  setFormData,
  formData,
  activeForm,
  handleActiveForm,
}) => {
  const [newUser, setNewUser] = useState(true);
  const [authUser, setAuthUser] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={styles.deliveryCard_container}>
      <h3 className={styles.title}>Контактна інформація</h3>
      <p className={styles.descr}>
        Дякуємо за ваш вибір! Для завершення покупки та оформлення доставки, будь ласка, увійдіть до
        свого облікового запису або зареєструйтеся, щоб ми могли швидше та зручніше обробити ваше
        замовлення. Це допоможе нам забезпечити успішну доставку вашого товару. Дякуємо за розуміння
        та співпрацю!
      </p>
      <ul className={styles.btn_container}>
        <li>
          <button type="button" className={clsx(styles.btn, newUser && styles.active)}>
            Я новий клієнт
          </button>
        </li>
        <li>
          <button type="button" className={clsx(styles.btn, !newUser && styles.active)}>
            Я постійний клієнт
          </button>
        </li>
      </ul>
      <div className={styles.right_container}>
        <Invoice
          setFormData={setFormData}
          formData={formData}
          handleActiveForm={handleActiveForm}
          activeForm={activeForm}
        />
      </div>
      {newUser && (
        <form>
          <input type="text" />
          <input type="text" />
        </form>
      )}
      {authUser && (
        <form>
          <input type="text" />
          <input type="text" />
        </form>
      )}
      <p className={styles.form_title}>Дані доставки</p>
      <DeliveryForm handleChange={handleChange} formData={formData} activeForm={activeForm} />

      <div className={styles.checkbox_container}>
        <input id="checkbox" type="checkbox" className={styles.checkbox} />
        <label htmlFor="checkbox" className={styles.label}>
          Зберегти адресу для наступних покупок
        </label>
      </div>
    </div>
  );
};

export default DeliveryCard;
