'use client';

import React, { useEffect, useState } from 'react';
import { Review } from '@/types/product';
import RatingStars from '@/components/RatingStars';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Like from '@/../public/images/ThumbsUp.png';
import Dislike from '@/../public/images/ThumbsDown.png';
import Trash from '@/../public/images/trash.png';
import { toggleDislike, toggleLike, deleteReview } from '@/clientServices/clientAxios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AppRoutes } from '@/constants/routes';
import DeleteModal from '@/components/DeleteModal';
import RequestModal from '@/components/DeleteModal/RequestModal';
import ResponseModal from '@/components/DeleteModal/ResponseModal';
import styles from './Reviews.module.css';

interface ReviewsProp {
  productName: string;
  reviews: Review[];
  reviewTitle: string;
  helpful: string;
  usersThink: string;
  refreshReviews: () => void;
}

const Reviews: React.FC<ReviewsProp> = ({
  productName,
  reviews,
  reviewTitle,
  helpful,
  usersThink,
  refreshReviews,
}) => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const router = useRouter();
  const t = useTranslations('product.reviews');
  const [reviewId, setReviewId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isResult, setIsResult] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<'400' | '401' | '404' | '503' | null>(null);

  useEffect(() => {
    if (isResult) {
      const timer = setTimeout(() => {
        setIsResult(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isResult]);

  const deleteReviewById = async (isDelete: boolean) => {
    setIsModalOpen(false);
    if (!isDelete) return;
    let response;
    if (token && reviewId) {
      response = deleteReview(reviewId, token);
      console.log(response);
      //делаю либо setError либо setIsSuccess, затем setIsOpenModal(false), setIsResult(true)
    }
    //
    
  };

  const handleClick = async (id: number, e: React.MouseEvent<HTMLButtonElement>) => {
    if (!session || session?.error === 'RefreshAccessTokenError' || !token) {
      localStorage.setItem('redirectAfterLogin', window.location.pathname);
      router.push(`/${AppRoutes.SIGNIN}`);
      return;
    }
    e.preventDefault();
    const target = e.target as HTMLButtonElement;
    let response;
    if (target.id === 'like') response = await toggleLike(id, token);
    else response = await toggleDislike(id, token);
    if (!response) {
      console.log('Error response');
      return;
    }
    refreshReviews();
  };

  const handleTrash = (id: number, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setReviewId(id);
    setIsModalOpen(true);
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        {reviewTitle} <span className={styles.productName}>{productName}</span>
      </h2>
      <ul className={styles.reviewsList}>
        {reviews.map((items, index) => (
          <li key={index} className={styles.reviewItem}>
            <div className={styles.headReview}>
              <div className={styles.leftBlock}>
                <span className={styles.username}>
                  {items.username === session?.user?.name ? t('user') : items.username}
                </span>
                <div className={styles.usefullTrash}>
                  <RatingStars averageRating={items.rating} />
                  {items.username !== session?.user?.name && (
                    <span>
                      {items.likes + items.dislikes === 0
                        ? 0
                        : Math.round((100 * items.likes) / (items.likes + items.dislikes))}
                      {' %'}
                      {usersThink}
                    </span>
                  )}
                  {items.username === session?.user?.name && ( 
                  <button className={styles.trashButton} onClick={e => handleTrash(items.id, e)}>
                    <Image src={Trash} width={16} height={20} alt="trash" />
                  </button>
                  )}
                </div>
              </div>
              <div className={styles.date}>{items.date}</div>
            </div>
            <div className={styles.message}>{items.comment}</div>
            <div className={styles.footerReview}>
              <p className={styles.isHelpful}>{helpful}</p>
              <div className={styles.yesOrNot}>
                <button className={styles.like_dislike} onClick={e => handleClick(items.id, e)}>
                  <Image src={Like} alt="like" width={28} height={28} id="like" />
                  <span>{items.likes}</span>
                </button>
                <button className={styles.like_dislike} onClick={e => handleClick(items.id, e)}>
                  <Image src={Dislike} alt="dislike" width={28} height={28} id="dislike" />
                  <span>{items.dislikes}</span>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <DeleteModal>
          <RequestModal deleteReviewById={deleteReviewById} t={t} />
        </DeleteModal>
      )}
      {isResult && (
        <DeleteModal>
          <ResponseModal isSuccess={isSuccess} errorType={error} t={t} />
        </DeleteModal>
      )}
    </div>
  );
};

export default Reviews;
