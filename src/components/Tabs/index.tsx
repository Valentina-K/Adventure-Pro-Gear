'use client';

import React, { useState } from 'react';
import styles from './Tabs.module.css';

interface TabsProps {
  description: string;
  attributes: [];
  reviews: [] | null;
}

const Tabs: React.FC<TabsProps> = ({ description, attributes, reviews }) => {
  const [toggleState, setToggleState] = useState(0);
  const toggleTab = (index: number) => {
    setToggleState(index);
  };
  const activeTabsStyle = `${styles.tabs} ${styles.activeTabs}`;
  const activeContentStyle = `${styles.content} ${styles.activeContent}`;
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
        <div
          className={
            toggleState === 0
              ? activeContentStyle : styles.content
          }
        >
          <div>{description}</div>
          <div className={styles.attributesBlock}>
            <h3>Характеристики:</h3>
            <ul>
              {attributes.map(attr => (
                <li className={styles.attributesItem} key={attr[0]}>
                  {attr[0]}: {attr[1]}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={toggleState === 1 ? activeContentStyle : styles.content}>
          <ul>
            {attributes.map(attr => (
              <li className={styles.attributesLine} key={attr[0]}>
                <span>{attr[0]}</span>
                <span>{attr[1]}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={toggleState === 2 ? activeContentStyle : styles.content}>
          <div className="leaveReviewBlock"></div>
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
