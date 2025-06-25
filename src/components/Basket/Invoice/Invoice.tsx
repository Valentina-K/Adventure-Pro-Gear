import React from 'react';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import styles from './Invoice.module.css';
import DeliveryForm from '../DeliveryForm/DeliveryForm';

interface IInvoiceProps {
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
}
const Invoice: React.FC<IInvoiceProps> = ({
  formData,
  setFormData,
  activeForm,
  handleActiveForm,
}) => {
  const { data: session, status } = useSession();
  const params = useParams();
  const t = useTranslations('basket.invoice');
  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={styles.invoice_container}>
      {session && (
        <>
          <h2 className={styles.title}>{t('data')}</h2>

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
                {t('dataRepit')}
              </label>
            </div>

            <div
              className={styles.radio_container}
              onClick={() => handleActiveForm('other')}
              aria-hidden={true}
            >
              <input
                type="radio"
                name="invoice"
                id="other"
                value="other"
                className={styles.input}
              />
              <label htmlFor="other" className={styles.label}>
                {t('other')}
              </label>
            </div>
          </div>

          {activeForm === 'other' && (
            <div className={styles.deliveryForm_container}>
              <DeliveryForm
                formData={formData}
                handleChange={handleChange}
                activeForm={activeForm}
              />
            </div>
          )}

          <form>
            <textarea
              name="comment"
              placeholder={params.lang === 'uk' ? 'Ваше повідомлення' : 'Your message'}
              className={styles.textarea}
              onChange={handleChange}
              // value={formData.comment}
            />
          </form>
        </>
      )}
    </div>
  );
};

export default Invoice;
