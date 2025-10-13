import React from 'react'
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import SucceessIcon from '@/../public/icons/success.svg';
import WarningIcon from '@/../public/icons/warning.svg';
import generic from '../style.module.css';
import styles from './ResponseModal.module.css';

interface ResponseModalProps {
  isSuccess: boolean;
  errorStatusCode: number | null;
  t: (key: string) => string;
}

function getError(status: number) {
  switch (status) {
    case 400:
      return "error400";
    case 401:
      return "error401";
    case 404:
      return "error404";
    case 503:
      return "error503";
    default:
      return "error503";
  }
}

function ResponseModal({ isSuccess, errorStatusCode, t }: ResponseModalProps) {
  const icon = isSuccess ? SucceessIcon : WarningIcon;
  const sizesMap = {
    success: {
      width: 85,
      height: 100,
    },
    error: {
      width: 108,
      height: 90,
    },
  };
  const { width, height } = isSuccess ? sizesMap['success'] : sizesMap['error'];
  const typeOfError = errorStatusCode !== null ? getError(errorStatusCode) : null;
  return (
    <>
      <h2 className={generic.title}>{isSuccess ? t("success.title") : t(`${typeOfError}.title`)}</h2>
      <p className={generic.text}>{isSuccess ? t("success.text") : t(`${typeOfError}.text`)}</p>
      <div className={styles.icon}>
        <Image src={icon} width={width} height={height} alt='icon' />
      </div>
    </>
  )
}

export default ResponseModal;
