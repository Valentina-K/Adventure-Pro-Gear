'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './AvailableColors.module.css';

interface ColorsItem {
  url: string;
  color: string;
}

interface AvailableColorsProps {
  imageArray: ColorsItem[];
  onColorChoice: (index: number) => void;
}

export const AvailableColors: React.FC<AvailableColorsProps> = ({ imageArray, onColorChoice }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const handleItemClick = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className={styles.availableBlock}>
      <div className={styles.availableHeader}>
        <h3 className={styles.availableHeaderText}>Доступні варіанти</h3>
        {activeIndex !== null && (
          <button className={styles.clearButton} onClick={() => setActiveIndex(null)}>
            Очистити
          </button>
        )}
      </div>
      <div>
        <h4 className={styles.availableColorText}>Колір</h4>
        <ul className={styles.wrapper}>
          {imageArray.map((item, index) => (
            <li
              className={
                index === activeIndex
                  ? `${styles.colorItem} ${styles.active}`
                  : `${styles.colorItem}`
              }
              key={index}
              onClick={() => handleItemClick(index)}
            >
              <div onClick={() => onColorChoice(index)}>
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
