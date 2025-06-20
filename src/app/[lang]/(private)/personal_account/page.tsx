import { Locale } from '@/i18n-config';
import React from 'react';
import ReviewedGoodsProfile from '@/components/ReviewedGoodsProfile';
import { getTranslations } from 'next-intl/server';
import styles from './personalAccount.module.css';

interface PersonalAccountProps {
  params: {
    lang: Locale;
  };
}

const PersonalAccount: React.FC<PersonalAccountProps> = async ({ params }) => {
  const { lang } = params;
  const t = await getTranslations({ lang, namespace: 'profile' });
  return (
    <section className={styles.alreadyShownBox}>
      <p className={styles.welcomeMessage}>{t('welcomeMessage')}</p>
      <ReviewedGoodsProfile title={t('alreadyShownProducts')} emptyBanner={t('noShownProducts')} />
    </section>
  );
};

export default PersonalAccount;
