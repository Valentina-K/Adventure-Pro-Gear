'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Contents } from '@/types/product';
import noImage from '@/../public/images/no_image.png';
import ImageSlider from './ImageSlider/ImageSlider';
import styles from './ImageCarousel.module.css';

interface ImageCarouselProps {
  contents: Contents[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ contents }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const handleImageChanged = (index: number) => {
    setImageIndex(index);
  };
  return (
    <div className={styles.wrapper}>
      {contents.length === 0 ? (
        <div className={styles.mainImg}>
          <Image
            src={noImage}
            alt="no image"
            width={580}
            height={580}
            style={{ backgroundColor: 'var(--darkBlue)', width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
      ) : (
        <>
          <div className={styles.mainImg}>
            <Image
              src={contents[imageIndex].source}
              alt="product"
              width={580}
              height={580}
              sizes="(max-width: 743px) 328px, (max-width: 1179px) 664px, 580px"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          <ImageSlider contents={contents} onImageClick={handleImageChanged} />
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
