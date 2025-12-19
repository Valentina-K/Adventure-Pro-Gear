'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Product } from '@/types/product';
import useLocalStorage from '@/hooks/useLocalStorage';
import Card from '../Card';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import styles from './ProductCardsSlider.module.css';

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
  // swipe refs
  const touchStartX = useRef(0);
  const [dragTranslate, setDragTranslate] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

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

// swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const delta = e.touches[0].clientX - touchStartX.current;
    setDragTranslate(delta);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const threshold = window.innerWidth * 0.1; // 10% экрана

    if (dragTranslate < -threshold && activeNav < groupedSlides.length - 1) {
      setActiveNav((prev) => prev + 1);
    } else if (dragTranslate > threshold && activeNav > 0) {
      setActiveNav((prev) => prev - 1);
    }

    setDragTranslate(0);
  };

  // вычисляем итоговый translate
  const baseTranslate = -(activeNav * slideWidthPercent);
  const dragPercent = (dragTranslate / window.innerWidth) * 100; // px → %
  const finalTranslate = baseTranslate + dragPercent;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      {!recommendation && (
        <div className={styles.slider}>
          <div
            className={styles.slides}
            style={{
              transform: `translateX(${finalTranslate}%)`
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
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
            {groupedSlides.map((_, index) => (
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
