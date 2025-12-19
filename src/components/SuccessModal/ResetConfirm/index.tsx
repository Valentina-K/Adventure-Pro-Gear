'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import SucceessIcon from '@/../public/icons/success _vector.svg';
import WarningIcon from '@/../public/icons/warning.svg';
import { ErrorMessages, resetPaswordAction } from '@/app/actions';
import { getResetPasswordSchema } from '@/validation';
import Input from '@/components/Input';
import Form from '@/components/Form';
import { AppRoutes } from '@/constants/routes';
import generic from '../style.module.css';
import styles from './ResetPassword.module.css';
import clsx from 'clsx';

interface Credentials {
  newPassword: string;
  confirmPassword: string;
}

const ResetPassword: React.FC = () => {
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const t = useTranslations('auth');
  const router = useRouter();
  const [credentials, setCredentials] = useState<Credentials>({
    newPassword: '',
    confirmPassword: '',
  });

  const [authTranslation, setAuthTranslation] = useState<any>(null);
  const [validationErrors, setValidationErrors] = useState<ErrorMessages>({});
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [icon, setIcon] = useState(WarningIcon);

  useEffect(() => {
    setToken(searchParams.get('token'));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (formData: FormData) => {
    if (token) {
      formData.append('token', token);
    }
    const response = await resetPaswordAction(formData);
    if (response === 200) {
      setSuccess(true);
      setIcon(SucceessIcon);
    } else if (response && response >= 300) {
      setSuccess(false);
    }
    setIsModalOpen(true);
  };

  type CredentialsKeys = keyof Credentials;

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const field = event.target.name as CredentialsKeys;
    const resetPasswordSchema = getResetPasswordSchema(authTranslation);
    const result = resetPasswordSchema.safeParse({
      [field]: credentials[field],
    });

    if (!result.success) {
      setValidationErrors(prevErrors => ({
        ...prevErrors,
        [field]: result.error.errors.map(e => e.message),
      }));
    } else {
      setValidationErrors(prevErrors => ({
        ...prevErrors,
        [field]: undefined,
      }));
    }
  };

  const handleConfirmPasswordBlur = () => {
    if (credentials.newPassword !== credentials.confirmPassword) {
      setConfirmPasswordErrorMessage(authTranslation.confirmPassword);
    } else {
      setConfirmPasswordErrorMessage('');
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        router.replace(AppRoutes.SIGNIN);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  useEffect(() => {
    const isKeyinErrorObj = () => {
      if (validationErrors.newPassword && validationErrors.newPassword.length > 0) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    };
    isKeyinErrorObj();
  }, [validationErrors.newPassword]);

  return (
    <>
      <Form action={handleSubmit} className={clsx({ [styles.form]: isModalOpen })}>
        <div className={styles.resetPasswordInfoContainer}>
          <h4 className={styles.resetPasswordHeading}>
            {authTranslation && authTranslation.resetPasswordModal.heading}
          </h4>
          <br />
          <p className={styles.resetPasswordSubHeading}>
            {authTranslation && authTranslation.resetPasswordModal.info}
          </p>
        </div>
        <Input
          placeholder={authTranslation && authTranslation.resetPasswordModal.placeholder[0]}
          name="newPassword"
          type="password"
          value={credentials.newPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={validationErrors.newPassword && validationErrors.newPassword.join(', ')} // validationErrors.name && validationErrors.name.join(', ')
        />
        <Input
          placeholder={authTranslation && authTranslation.resetPasswordModal.placeholder[1]}
          name="confirmPassword"
          type="password"
          value={credentials.confirmPassword}
          onChange={handleChange}
          disabled={disabled && true}
          onBlur={handleConfirmPasswordBlur}
          error={confirmPasswordErrorMessage}
        />
        <Input
          type="submit"
          value={authTranslation && authTranslation.resetPasswordModal['submit-button']}
        />
      </Form>
      {isModalOpen && (
        <div className={generic.containerModal}>
          <div className={generic.modal}>
            {success ? (
              <h2 className={generic.title}>{t('reset-confirm.0')}</h2>
            ) : (
              <h2 className={generic.title}>{t('reset-confirm.1')}</h2>
            )}
            <div className={styles.iconWrapper}>
              <Image src={icon} width={85} height={100} alt="icon" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
