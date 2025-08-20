'use client';

import React, { useState, useMemo } from 'react';
import { Product } from '@/types/product';
import useLocalStorage from '@/hooks/useLocalStorage';
import Card from '../Card';
import styles from './ProductCardsSlider.module.css';
import { useWindowWidth } from '@/hooks/useWindowWidth';

interface CardsSliderProp {
  products: Product[];
  recommendation?: Product[];
  title: string;
}

const ProductCardsSlider: React.FC<CardsSliderProp> = ({ products, title, recommendation }) => {
  const width = useWindowWidth();
  const [activeNav, setActiveNav] = useState(0);
  const favStorage = useLocalStorage('favorites');
  const MOBILE_MAX = 743;
  const groupedSlides = useMemo(() => {
  const itemsPerSlide = width <= MOBILE_MAX ? 2 : 3;
  const result = [];

  for (let i = 0; i < products.length; i += itemsPerSlide) {
    result.push(products.slice(i, i + itemsPerSlide));
  }

  if (width <= MOBILE_MAX) result.splice(3);
  return result;
}, [products, width]);

const slideWidthPercent = 100 / groupedSlides.length;
  const recommendationSlides = useMemo(() =>
    recommendation?.map((slide) => (
      <div key={slide.productId} className={styles.slide}>
        <Card product={slide} favoriteStore={favStorage} />
      </div>
    )), [recommendation, favStorage]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      {!recommendation && (
        <div className={styles.slider}>
          <div
            className={styles.slides}
            style={{ transform: `translateX(-${activeNav * slideWidthPercent}%)` }}
          >
            {groupedSlides.map((group, i) => (
              <div key={i} className={styles.slide}>
                {group.map(item => (
                  <Card key={item.productId} product={item} variant="small" favoriteStore={favStorage} />
                ))}
              </div>
            ))}
          </div>
          <div className={styles.nav}>
            {[0, 1, 2].map(index => (
              <button
                key={index}
                className={activeNav === index ? styles.active : ''}
                onClick={() => setActiveNav(index)}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {recommendation && (
        <div className={styles.slider}>
          <div className={styles.slides}>{recommendationSlides}</div>
        </div>
      )}
    </div>
  );
};

export default React.memo(ProductCardsSlider);
