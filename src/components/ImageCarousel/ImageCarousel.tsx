'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Contents } from '@/interfaces/product';
import styles from './ImageCarousel.module.css';
import ImageSlider from './ImageSlider/ImageSlider';

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
      <Image src={contents[imageIndex].source} alt="product" width={580} height={580} />
      <ImageSlider contents={contents} onImageClick={handleImageChanged} />
    </div>
  );
};

export default ImageCarousel;
