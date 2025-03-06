'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { forgotPaswordAction } from '@/app/actions';
import Form from '@/components/Form';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import styles from './ForgotPassword.module.css';

const ForgotPassword = () => {
  const t = useTranslations('auth.forgotPasswordModal');
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (formData: FormData) => {
    const response = await forgotPaswordAction(formData);
    // console.log('FormData: ', formData.get('email'));
    if (response === 200) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Form action={handleSubmit} className={styles.forgotPasswordForm}>
        <h4 className={styles.formHeading}>
          {t('heading')}
        </h4>
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
          <Input
            type="submit"
            value={t('submit-button')}
            className={styles.sybmitEmailInput}
          />
        </div>
      </Form>
      {isModalOpen && (
        <Modal closeModal={closeModal} className={styles.setntEmailmodal}>
          <p>{t('email-directing-modal')}</p>
          111s
          <Image src='/icons/IllustrationSendEmail.svg' alt="sent email icon" width={180} height={180} />
        </Modal>
      )}
    </>
  );
};

export default ForgotPassword;
