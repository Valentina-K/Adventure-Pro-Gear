'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/UI';
import DeleteModal from '..';
import generic from '../style.module.css';
import styles from './RequestModal.module.css';

function RequestModal() {
  const t = useTranslations('product.reviews.request');
  const handleDelete = () => {
    console.log('delete');
  };

  const handleCancel = () => {
    console.log('cancel');
  };
  return (
    <DeleteModal>
      <div>
        <h2 className={generic.title}>{t('title')}</h2>
        <p className={generic.text}>{t('text')}</p>
        <div className={styles.buttons}>
          <Button
            type="button"
            size="large"
            color="primary"
            onClick={handleDelete}
            className={styles.button}
          >
            {t('cancel')}
          </Button>
          <Button
            type="button"
            size="large"
            color="transparent"
            onClick={handleCancel}
            className={styles.button}
          >
            {t('continue')}
          </Button>
        </div>
      </div>
    </DeleteModal>
  );
}

export default RequestModal;
