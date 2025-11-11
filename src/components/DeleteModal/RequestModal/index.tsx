'use client';

import React from 'react';
import { Button } from '@/components/UI';
import generic from '../style.module.css';
import styles from './RequestModal.module.css';

type RequestModalProps = {
  deleteReviewById: (isDelete: boolean) => void;
  t: (key: string) => string;
};

function RequestModal({ deleteReviewById, t }: RequestModalProps) {
  const handleDelete = () => {
    deleteReviewById(true);
  };

  const handleCancel = () => {
    deleteReviewById(false);
  };
  return (
    <>
      <div>
        <h2 className={generic.title}>{t('request.title')}</h2>
        <p className={generic.text}>{t('request.text')}</p>
      </div>
      <div className={styles.buttons}>
        <Button
          type="button"
          size="large"
          color="primary"
          onClick={handleDelete}
          className={styles.button}
        >
          {t('request.confirm')}
        </Button>
        <Button
          type="button"
          size="large"
          color="transparent"
          onClick={handleCancel}
          className={styles.button}
        >
          {t('request.cancel')}
        </Button>
      </div>
    </>
  );
}

export default RequestModal;
