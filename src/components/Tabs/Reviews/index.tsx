'use client';

import React from 'react';
import { Review } from '@/types/product';
import RatingStars from '@/components/RatingStars';
import Image from 'next/image';
import Like from '@/../public/images/ThumbsUp.png';
import Dislike from '@/../public/images/ThumbsDown.png';
import { toggleDislike, toggleLike } from '@/clientServices/clientAxios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AppRoutes } from '@/constants/routes';
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
  const { data: session, status } = useSession();
  const token = session?.user?.accessToken;
  const router = useRouter();
  if (!token && status === 'authenticated') {
    console.error('No access token found');
  }
  const handleClick = async (id:number, e: React.MouseEvent<HTMLButtonElement>) => {
    if (!session || !token) {
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
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
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        {reviewTitle}
        {' '}
        <span className={styles.productName}>
          {productName}
        </span>
      </h2>
      <ul className={styles.reviewsList}>
        {reviews.map((items, index) => (
          <li key={index} className={styles.reviewItem}>
            <div className={styles.headReview}>
              <div className={styles.reviewInfo}>
                <span className={styles.username}>{items.username}</span>
                <RatingStars averageRating={items.rating} />
                <span>
                  {items.likes + items.dislikes === 0
                    ? 0
                    : Math.round((100 * items.likes) / (items.likes + items.dislikes))}
                  {' %'}
                  {usersThink}
                </span>
              </div>
              <div>{items.date}</div>
            </div>
            <div className={styles.message}>{items.comment}</div>
            <div className={styles.footerReview}>
              <p className={styles.isHelpful}>{helpful}</p>
              <div className={styles.yesOrNot}>
                <button className={styles.like_dislike} onClick={(e) => handleClick(items.id, e)}>
                  <Image src={Like} alt="like" width={28} height={28} id="like" />
                  <span>{items.likes}</span>
                </button>
                <button className={styles.like_dislike} onClick={(e)=>handleClick(items.id, e)}>
                  <Image src={Dislike} alt="dislike" width={28} height={28} id="dislike" />
                  <span>{items.dislikes}</span>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
