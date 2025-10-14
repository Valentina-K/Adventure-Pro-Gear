'use client';

import React, { useState } from 'react';
import { Characteristics } from '@/types/product';
import { useLocale, useTranslations } from 'next-intl';
import ReviewForm from './SendReview/ReviewForm';
import styles from './Tabs.module.css';

interface TabsProps {
  description: string;
  characteristics: Characteristics[];
  isSendReview: boolean;
  onChangeTab: (tabIndex: number) => void;
  onReviewSend: (isSend: boolean) => void;
  changeSendReview: (value: boolean) => void;
}

const Tabs: React.FC<TabsProps> = ({
  description,
  characteristics,
  isSendReview,
  onChangeTab,
  onReviewSend,
  changeSendReview
}) => {
  const locale = useLocale();
  const t = useTranslations('product');
  const [toggleState, setToggleState] = useState(0);

  const toggleTab = (index: number) => {
    setToggleState(index);
    if (index !== 2) changeSendReview(false);
    onChangeTab(index);
  };
  const activeTabsStyle = `${styles.tabs} ${styles.activeTabs}`;
  const activeContentStyle = `${styles.content} ${styles.activeContent}`;

  // review form
  const handleReviewSubmit = async (isOk: boolean) => {
    if (isOk) {
      changeSendReview(true);
      onReviewSend(true);
    } else {
      changeSendReview(false);
      onReviewSend(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.blockTabs}>
        <button
          className={toggleState === 0 ? activeTabsStyle : styles.tabs}
          onClick={() => toggleTab(0)}
        >
          {t('tabs.description')}
        </button>
        <button
          className={toggleState === 1 ? activeTabsStyle : styles.tabs}
          onClick={() => toggleTab(1)}
        >
          {t('tabs.characteristics')}
        </button>
        <button
          className={toggleState === 2 ? activeTabsStyle : styles.tabs}
          onClick={() => toggleTab(2)}
        >
          {t('tabs.reviews')}
        </button>
      </div>
      <div className={styles.contentTabs}>
        <div className={toggleState === 0 ? activeContentStyle : styles.content}>
          <div className={styles.description}>{description}</div>
          <div className={styles.attributesBlock}>
            <h3>
              {t('tabs.characteristics')}
              :
            </h3>
            <ul>
              {characteristics.map((item, index) => (
                <li key={index}>
                  {item.name}: {item.value}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={toggleState === 1 ? activeContentStyle : styles.content}>
          <ul>
            {characteristics.map((item, index) => (
              <li className={styles.attributesLine} key={index}>
                <span className={styles.attributesLineLeft}>{item.name}</span>
                <span className={styles.attributesLineRight}>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={toggleState === 2 ? activeContentStyle : styles.content}>
          <ReviewForm onSubmitForm={handleReviewSubmit} />
          {isSendReview && <p className={styles.thankingText}>{t('tabs.thanking')}</p>}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
