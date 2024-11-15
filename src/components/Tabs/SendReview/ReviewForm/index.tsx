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
}

const ReviewForm: React.FC<ReviewFormProp> = ({ onSubmitForm }) => {
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
        <p>Ваша думка важлива для нас!</p>
        <p>
          Розкажіть свою історію з використання нашого туристичного спорядження. Ваші враження
          можуть надихнути інших на нові пригоди. Дякуємо за те, що обрали Adventure Pro Gear - ваші
          слова значать для нас найбільше!
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
            placeholder="Пароль"
          />
        </label>
        <textarea
          className={styles.messageArea}
          {...register('comment')}
          placeholder="Повідомлення"
        />
      </div>
      <SetStarRating onStarClick={starClick} refresh={refresh} />
      <Button
        className={styles.submitReview}
        type="submit"
        text="Надіслати"
        icon={<Image src={ArrowRightDown} width={13} height={14} alt="right-down" />}
      />
    </form>
  );
};

export default ReviewForm;
