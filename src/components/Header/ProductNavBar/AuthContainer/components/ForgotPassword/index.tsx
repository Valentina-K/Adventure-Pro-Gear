'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import { forgotPaswordAction } from '@/app/actions';
import Form from '@/components/Form';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import styles from './ForgotPassword.module.css';
import { toast } from 'react-toastify';

interface ForgotPasswordProps {
  closeParentModal: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({closeParentModal}) => {
  const t = useTranslations('auth.forgotPasswordModal');
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const width = useWindowWidth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (formData: FormData) => {
    const response = await forgotPaswordAction(formData);
    if (response === 200) {      
      setIsModalOpen(true);
    }
    if (response !== 200 || response !== 201) {
      toast.error(response || 'Something went wrong. Please try again later.', {
        position: 'top-right',
        autoClose: 4000,
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    closeParentModal();
  };

  return (
    <>
    {!isModalOpen ? (<Form action={handleSubmit} className={styles.forgotPasswordForm}>
        <h4 className={styles.formHeading}>{t('heading')}</h4>
        <br />
        <p>{t('info')}</p>
        <div className={styles.inputAndButtobBlock}>
          <Input
            className={styles.emailInput}
            onChange={handleChange}
            name="email"
            placeholder="E-mail"
            type="email"
            value={email}
            required
          />
          <Input type="submit" value={t('submit-button')} className={styles.sybmitEmailInput} />
        </div>
      </Form>) : (<Modal closeModal={closeModal} className={styles.setntEmailmodal}>
          <p>{t('email-directing-modal')}</p>
          {width > 1180 && (
            <Image
              src="/icons/IllustrationSendEmail.svg"
              alt="sent email icon"
              width={180}
              height={180}
            />
          )}
        </Modal>)}     
      
    </>
  );
};

export default ForgotPassword;
