'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ArrowRightDown from '@/../public/icons/arrow-right-down.svg';
import Button from '@/components/Button';
import { useParams, useRouter } from 'next/navigation';
import { AppRoutes } from '@/constants/routes';
import { createReview } from '@/clientServices/clientAxios';
import { useLocale, useTranslations } from 'next-intl';
import SetStarRating from '../SetStarRating';
import styles from './ReviewForm.module.css';

type FormValues = {
  password: string;
  email: string;
  comment: string;
};

interface ReviewFormProp {
  onSubmitForm: (isOk: boolean) => void;
}

const ReviewForm: React.FC<ReviewFormProp> = ({ onSubmitForm }) => {
  const locale = useLocale();
  const t = useTranslations('product');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [rating_, setRating] = useState(0);
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const { data: session, status } = useSession();

  const params = useParams();
  const router = useRouter();
  const token = session?.user?.accessToken;
  console.log('token', token, 'status', status);
  if (!token && status === 'authenticated') {
    console.error('No access token found');
  }

  const handleSubmitForm: SubmitHandler<FormValues> = async data => {
    if (!session || !token) {
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      router.push(`/${AppRoutes.SIGNIN}`);
      return;
    }
    const { comment } = data;
    const { productId } = params;
    const response = await createReview({ comment, rating: rating_, productId }, token);
    if (response) onSubmitForm(true);
    else onSubmitForm(false);
    reset();
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (isSubmitted) {
      setRefresh(true);
      setIsSubmitted(false);
    } else setRefresh(false);
  }, [isSubmitted]);
  const starClick = useCallback((rating: number) => setRating(rating), []);
  return (
    <form className={styles.reviewForm} onSubmit={handleSubmit(handleSubmitForm)}>
      <div className={styles.textReviewBlock}>
        <p>{t('tabs.important_to_us')}</p>
        <p>{t('tabs.tell_us')}</p>
      </div>
      <div className={styles.inputBlock}>
        {!session && (
          <>
            <label htmlFor="review-email">
              <input
                id="review-email"
                className={styles.reviewInput}
                type="email"
                {...register('email', { required: true })}
                placeholder="E-mail"
              />
            </label>
            <label htmlFor="review-password">
              <input
                id="review-password"
                className={styles.reviewInput}
                type="password"
                {...register('password', { required: true })}
                placeholder={t('tabs.password')}
              />
            </label>
          </>
        )}
        <textarea
          className={styles.messageArea}
          {...register('comment')}
          placeholder={t('tabs.message')}
        />
      </div>
      <SetStarRating onStarClick={starClick} refresh={refresh} rate={t('tabs.rate')} />
      <Button
        className={styles.submitReview}
        type="submit"
        text={t('tabs.send')}
        icon={<Image src={ArrowRightDown} width={13} height={14} alt="right-down" />}
      />
    </form>
  );
};

export default ReviewForm;
