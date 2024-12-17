'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import ArrowRightDown from '@/../public/icons/arrow-right-down.svg';
import Button from '@/components/Button';
import SetStarRating from '../SetStarRating';
import styles from './ReviewForm.module.css';

type FormValues = {
  password: string;
  email: string;
  comment: string;
};

interface ReviewFormProp {
  onSubmitForm: (data: {}) => void;
  translation: {
    tabs: {
      description: string;
      characteristics: string;
      reviews: string;
      important_to_us: string;
      tell_us: string;
      message: string;
      rate: string;
      send: string;
      password: string;
      thanking: string;
    };
  };
}

const ReviewForm: React.FC<ReviewFormProp> = ({ onSubmitForm, translation }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [rating_, setRating] = useState(0);
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = data => {
    onSubmitForm({ ...data, rating_ });
    reset();
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (isSubmitted) {
      setRefresh(true);
      setIsSubmitted(false);
    } else setRefresh(false);
  }, [isSubmitted]);
  const starClick = (rating: number) => setRating(rating);
  return (
    <form className={styles.reviewForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.textReviewBlock}>
        <p>{translation.tabs.important_to_us}</p>
        <p>
          {translation.tabs.tell_us}
        </p>
      </div>
      <div className={styles.inputBlock}>
        <label>
          <input
            className={styles.reviewInput}
            type="email"
            {...register('email', { required: true })}
            placeholder="E-mail"
          />
        </label>
        <label>
          <input
            className={styles.reviewInput}
            type="password"
            {...register('password', { required: true })}
            placeholder={translation.tabs.password}
          />
        </label>
        <textarea
          className={styles.messageArea}
          {...register('comment')}
          placeholder={translation.tabs.message}
        />
      </div>
      <SetStarRating onStarClick={starClick} refresh={refresh} rate={translation.tabs.rate} />
      <Button
        className={styles.submitReview}
        type="submit"
        text={translation.tabs.send}
        icon={<Image src={ArrowRightDown} width={13} height={14} alt="right-down" />}
      />
    </form>
  );
};

export default ReviewForm;
