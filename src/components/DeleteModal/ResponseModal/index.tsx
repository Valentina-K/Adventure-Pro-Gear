import React from 'react'
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import SucceessIcon from '@/../public/icons/success.svg';
import WarningIcon from '@/../public/icons/warning.svg';
import generic from '../style.module.css';
import styles from './ResponseModal.module.css';

interface ResponseModalProps {
  isSuccess: boolean;
  errorType: "400" | "401" | "404" | "503" | null;
  t: (key: string) => string;
}

const error = {
    "400": "error400",
    "401": "error401",
    "404": "error404",
    "503": "error503"
}

function ResponseModal({isSuccess, errorType, t}: ResponseModalProps) {    
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
  const typeOfError = errorType ? error[errorType] : undefined;
  return (
    <>
      <h2 className={generic.title}>{isSuccess ? t("success.title") : t(`${typeOfError}.title`)}</h2>
      <p className={generic.text}>{isSuccess ? t("success.text") : t(`${typeOfError}.text`)}</p>
      <div className={styles.icon}>
        <Image src={icon} width={width} height={height} alt='icon'/>
      </div>
    </>
  )
}

export default ResponseModal;
