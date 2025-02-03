'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './AvailableColors.module.css';

interface ColorsItem {
  url: string;
  color: string;
}

interface AvailableColorsProps {
  title: string;
  h4: string;
  clear: string;
  imageArray: ColorsItem[];
  onColorChoice: (index: number) => void;
}

export const AvailableColors: React.FC<AvailableColorsProps> = (
  {
    title, h4, clear, imageArray, onColorChoice
  }
) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const handleItemClick = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
    onColorChoice(index);
  };

  return (
    <div className={styles.availableBlock}>
      <div className={styles.availableHeader}>
        <h3 className={styles.availableHeaderText}>{title}</h3>
        {activeIndex !== null && (
          <button className={styles.clearButton} onClick={() => setActiveIndex(null)}>
            {clear}
          </button>
        )}
      </div>
      <div>
        <h4 className={styles.availableColorText}>{h4}</h4>
        <ul className={styles.wrapper}>
          {imageArray.map((item, index) => (
            <li
              className={
                index === activeIndex
                  ? `${styles.colorItem} ${styles.active}`
                  : `${styles.colorItem}`
              }
              key={index}
            >
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleItemClick(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleItemClick(index);
                  }
                }}
              >
                <Image src={item.url} alt={item.color} width={103} height={103} />
                <h3 className={styles.color}>{item.color}</h3>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AvailableColors;
