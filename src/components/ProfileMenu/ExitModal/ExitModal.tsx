'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/UI';
import { AppRoutes } from '@/constants/routes';
import { signOut } from 'next-auth/react';
import styles from './ExitModal.module.css';

function ExitModal() {
  const t = useTranslations('profile.exitModal');
  const router = useRouter();
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{t("title")}</h2>
      <p className={styles.text}>{t("text")}</p>
      <div className={styles.buttons}>
        <Button type="button" size='large' color='transparent' onClick={()=>router.back()} className={styles.button}>{t("cancel")}</Button>
        <Button type="button" size='large' color='primary' onClick={()=>signOut({ callbackUrl: AppRoutes.HOME })} className={styles.button}>{t("continue")}</Button>
      </div>
    </div>
  );
}

export default ExitModal;
