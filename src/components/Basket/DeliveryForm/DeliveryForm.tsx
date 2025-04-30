import React from 'react';
import styles from './DeliveryForm.module.css';

interface IDeliveryFormProps {
  formData: {
    basket: any[];
    name: string;
    surname: string;
    tel?: string;
    postAddress: string;
    city: string;
    pochtIndex: string;
    company?: string;
    mpe?: string;
  };
  activeForm: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DeliveryForm: React.FC<IDeliveryFormProps> = ({ handleChange, formData, activeForm }) => {
  return (
    <form>
      <div className={styles.input_container}>
        <input
          type="text"
          name="name"
          // value={formData.name}
          placeholder="Ім'я"
          className={styles.input}
          onChange={handleChange}
        />
        <input
          type="text"
          name="surname"
          // value={formData.surname}
          placeholder="Прізвище"
          className={styles.input}
          onChange={handleChange}
        />
        {activeForm === 'other' ? (
          <>
            <input
              type="text"
              name="company"
              // value={formData?.company}
              placeholder="Компанія (необов'язково)"
              className={styles.input}
              onChange={handleChange}
            />

            <input
              type="text"
              name="mpe"
              // value={formData?.mpe}
              placeholder="Номер платника ПДВ (необов'язково)"
              className={styles.input}
              onChange={handleChange}
            />
          </>
        ) : (
          <input
            type="tel"
            name="tel"
            // value={formData?.tel}
            placeholder="Телефон"
            className={styles.input}
            onChange={handleChange}
          />
        )}

        <input
          type="text"
          name="postAddress"
          // value={formData.postAddress}
          placeholder="Вулиця та номер будинку"
          className={styles.input}
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          // value={formData.city}
          placeholder="Місто"
          className={styles.input}
          onChange={handleChange}
        />
        <input
          type="text"
          name="pochtIndex"
          // value={formData.pochtIndex}
          placeholder="Поштовий індекс"
          className={styles.input}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default DeliveryForm;
