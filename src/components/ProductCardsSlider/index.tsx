'use client';

import React, { useState, useMemo } from 'react';
import { Product } from '@/types/product';
import Card from '../Card';
import styles from './ProductCardsSlider.module.css';

interface CardsSliderProp {
  products: Product[];
  recommendation?: Product[];
  title: string;
}

const ProductCardsSlider: React.FC<CardsSliderProp> = ({ products, title, recommendation }) => {
  const [activeNav, setActiveNav] = useState(0);
  const groupedSlides = useMemo(() =>
    [products.slice(0, 3), products.slice(3, 6), products.slice(6, 9)], [products]);

  const recommendationSlides = useMemo(() =>
    recommendation?.map((slide) => (
      <div key={slide.productId} className={styles.slide}>
        <Card product={slide} />
      </div>
    )), [recommendation]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      {!recommendation && (
        <div className={styles.slider}>
          <div
            className={styles.slides}
            style={{ transform: `translateX(-${activeNav * 33.33}%)` }}
          >
            {groupedSlides.map((group, i) => (
              <div key={i} className={styles.slide}>
                {group.map(item => (
                  <Card key={item.productId} product={item} variant="small" />
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
