'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import styles from './Tabs.module.css';
import ReviewForm from './SendReview/ReviewForm';

interface Review {
  productId: number;
  rating: number;
  comment: string;
}

interface TabsProps {
  description: string;
  attributes: {
    [key: string]: any;
  };
  reviews?: [];
}

const Tabs: React.FC<TabsProps> = ({ description, attributes, reviews }) => {
  const { productId } = useParams();
  const [toggleState, setToggleState] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSendReview, setIsSendReview] = useState(false);

  const toggleTab = (index: number) => {
    setToggleState(index);
    if (index !== 2) setIsSendReview(false);
  };
  const activeTabsStyle = `${styles.tabs} ${styles.activeTabs}`;
  const activeContentStyle = `${styles.content} ${styles.activeContent}`;

  // review form
  const handleReviewSubmit = (data: {}) => {
    console.log(data);
    setIsSendReview(true);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.blockTabs}>
        <button
          className={toggleState === 0 ? activeTabsStyle : styles.tabs}
          onClick={() => toggleTab(0)}
        >
          Опис
        </button>
        <button
          className={toggleState === 1 ? activeTabsStyle : styles.tabs}
          onClick={() => toggleTab(1)}
        >
          Характеристики
        </button>
        <button
          className={toggleState === 2 ? activeTabsStyle : styles.tabs}
          onClick={() => toggleTab(2)}
        >
          Відгуки
        </button>
      </div>
      <div className={styles.contentTabs}>
        <div className={toggleState === 0 ? activeContentStyle : styles.content}>
          <div>{description}</div>
          <div className={styles.attributesBlock}>
            <h3>Характеристики:</h3>
            <ul>
              {Object.entries(attributes).map(([key, value]) => (
                <li key={key}>
                  {key}: {value}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={toggleState === 1 ? activeContentStyle : styles.content}>
          <ul>
            {Object.entries(attributes).map(([key, value]) => (
              <li className={styles.attributesLine} key={key}>
                <span>{key}</span>
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={toggleState === 2 ? activeContentStyle : styles.content}>
          <div className={styles.leaveReviewBlock}>
            <ReviewForm onSubmitForm={handleReviewSubmit} />
            {isSendReview && (
              <p className={styles.thankingText}>
                Дякуємо за ваш відгук! Ваша думка надзвичайно важлива для нас.
              </p>
            )}
          </div>
          {reviews && (
            <ul>
              {reviews.map(review => (
                <li key={review}>{review}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
