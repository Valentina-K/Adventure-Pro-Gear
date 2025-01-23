'use client';

import { Contents } from '@/interfaces/product';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import styles from '../ImageCarousel.module.css';

interface ImageSliderProps {
  contents: Contents[];
  onImageClick: (index: number) => void;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ contents, onImageClick }) => {
  const [index, setIndex] = useState(0);
  const [leftDisabled, setLeftDisabled] = useState(false);
  const [rightDisabled, setRightDisabled] = useState(false);

  const [position, setPosition] = useState(0);
  const width = 96;
  const count = contents.length < 6 ? contents.length : 6;
  useEffect(() => {
    if (index === 0) {
      setLeftDisabled(true);
    } else setLeftDisabled(false);
    if (index === contents.length - 6 || contents.length <= 6) {
      setRightDisabled(true);
    } else setRightDisabled(false);
  }, [index, contents.length]);

  const handleLeftClick = () => {
    setPosition(prev => prev + width);
    setIndex(prev => prev - 1);
  };

  const handleRightClick = () => {
    setPosition(prev => prev - width);
    setIndex(prev => prev + 1);
  };

  const handleClick = (ind: number) => {
    onImageClick(ind);
  };

  return (
    <div className={styles.sliderWrapper}>
      <div
        className={styles.list}
        style={{
          marginLeft: `${Math.max(position, -width * (contents.length - count))}px`,
        }}
      >
        {contents.map((image, ind) => (
          <button onClick={() => handleClick(ind)} key={ind} className={styles.button}>
            <Image src={image.source} alt="product" width={80} height={80} />
          </button>
        ))}
      </div>
      <div className={styles.controls}>
        <button onClick={handleLeftClick} disabled={leftDisabled} className={styles.button} aria-label="Previous image">
          <MdChevronLeft className={styles.icon} />
        </button>
        <button onClick={handleRightClick} disabled={rightDisabled} className={styles.button} aria-label="Next image">
          <MdChevronRight className={styles.icon} />
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
