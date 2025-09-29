import React from 'react';
import { useParams } from 'next/navigation';
import Error from '@/../public/icons/Error.svg';
import styles from './DeliveryForm.module.css';
import Image from 'next/image';

interface IDeliveryFormProps {
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
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: any;
}


const DeliveryForm: React.FC<IDeliveryFormProps> = ({
  handleChange,
  formData,
  activeForm,
  errors,
}) => {
  const params = useParams();

  return (
    <form>
      <div className={styles.input_container}>
        <input
          type="text"
          name="name"
          placeholder={params.lang === 'uk' ? "Ім'я" : 'Name'}
          // value={formData.name}
          className={styles.input}
          onChange={handleChange}
        />
        <input
          type="text"
          name="surname"
          placeholder={params.lang === 'uk' ? 'Прізвище' : 'Surname'}
          // value={formData.surname}
          className={styles.input}
          onChange={handleChange}
        />
        {activeForm === 'other' ? (
          <>
            <input
              type="text"
              name="company"
              placeholder={params.lang === 'uk' ? "Компанія (необов'язково)" : 'Company (optional)'}
              // value={formData?.company}
              className={styles.input}
              onChange={handleChange}
            />

            <input
              type="text"
              name="mpe"
              placeholder={
                params.lang === 'uk'
                  ? "Номер платника ПДВ (необов'язково)"
                  : 'VAT number (optional)'
              }
              // value={formData?.mpe}
              className={styles.input}
              onChange={handleChange}
            />
          </>
        ) : (
          <>
            <input
              type="tel"
              name="tel"
              placeholder={params.lang === 'uk' ? 'Телефон' : 'Phone'}
              // value={formData?.tel}
              className={styles.input}
              onChange={handleChange}
            />
          </>
        )}
        {errors?.postAddress && (
          <div className={styles.errorContainer}>
            <Image
              src={Error}
              alt="error icon"
              width={11}
              height={11}
              className={styles.errorImage}
            />
            <p className={styles.error}>{errors?.postAddress}</p>
          </div>
        )}
        <input
          type="text"
          name="postAddress"
          placeholder={params.lang === 'uk' ? 'Вулиця та номер будинку' : 'Street and house number'}
          // value={formData.postAddress}
          className={styles.input}
          onChange={handleChange}
        />
        {errors?.city && (
          <div className={styles.errorContainer}>
            <Image
              src={Error}
              alt="error icon"
              width={11}
              height={11}
              className={styles.errorImage}
            />
            <p className={styles.error}>{errors?.city}</p>
          </div>
        )}

        <input
          type="text"
          name="city"
          placeholder={params.lang === 'uk' ? 'Місто' : 'City'}
          // value={formData.city}
          className={styles.input}
          onChange={handleChange}
        />
        <input
          type="text"
          name="pochtIndex"
          placeholder={params.lang === 'uk' ? 'Поштовий індекс' : 'Postal code'}
          // value={formData.pochtIndex}
          className={styles.input}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default DeliveryForm;
