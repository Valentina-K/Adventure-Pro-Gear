import React from 'react';
import styles from './Invoice.module.css';
import DeliveryForm from '../DeliveryForm/DeliveryForm';

interface IInvoiceProps {
  formData: {
    comment: string;
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
  handleActiveForm: (value: string) => void;
  setFormData: any;
}
const Invoice: React.FC<IInvoiceProps> = ({
  formData,
  setFormData,
  activeForm,
  handleActiveForm,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={styles.invoice_container}>
      <h2 className={styles.title}>Данні Рахунку фактури</h2>

      <div className={styles.radio_container}>
        <div
          className={styles.radio_container}
          onClick={() => handleActiveForm('dataDelivery')}
          aria-hidden={true}
        >
          <input
            type="radio"
            id="dataDelivery"
            name="invoice"
            value="dataDelivery"
            defaultChecked
            className={styles.input}
          />
          <label htmlFor="dataDelivery" className={styles.label}>
            Такі самі як дані доставки
          </label>
        </div>

        <div
          className={styles.radio_container}
          onClick={() => handleActiveForm('other')}
          aria-hidden={true}
        >
          <input type="radio" name="invoice" id="other" value="other" className={styles.input} />
          <label htmlFor="other" className={styles.label}>
            Інше / компанія
          </label>
        </div>
      </div>

      {activeForm === 'other' && (
        <div className={styles.deliveryForm_container}>
          <DeliveryForm formData={formData} handleChange={handleChange} activeForm={activeForm} />
        </div>
      )}

      <form>
        <textarea
          name="comment"
          placeholder="Ваше повідомлення"
          className={styles.textarea}
          // value={formData.comment}
        />
      </form>
    </div>
  );
};

export default Invoice;
