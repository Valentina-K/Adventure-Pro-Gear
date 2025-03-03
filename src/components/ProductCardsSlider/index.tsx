'use client';

import React, { useState } from 'react';
import { Locale } from '@/i18n-config';
import { Product } from '@/interfaces/product';
import Card from '../Card';
import styles from './ProductCardsSlider.module.css';
import { useLocale, useTranslations } from 'next-intl';

interface CardsSliderProp {
  products: Product[];
  recommendation?: Product[];
 /*  translation: {
    card: {
      addToFollowing: string;
      sale: string;
      new: string;
      available: string;
      outOfStock: string;
      buy: string;
    };
  }; */
  onBuyClick: (id: number) => void;
  onFavoriteClick: (productId: number, isFavorite: boolean) => void;
  title: string;
}

const ProductCardsSlider: React.FC<CardsSliderProp> = ({
  products,
  onBuyClick,
  onFavoriteClick,
  title,
  recommendation,
}) => {
  const locale = useLocale();
  const t = useTranslations('product');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeNav, setActiveNav] = useState(0);

  const handleNavClick = (index: number) => {
    if (activeNav === 0) setCurrentIndex(prevIndex => prevIndex + index);
    else setCurrentIndex(prevIndex => prevIndex - 1);
    setActiveNav(index);
  };

  const nextSlide = (index: number) => {
    setActiveNav(index);
    if (currentIndex < products.length - 3) setCurrentIndex(prevIndex => prevIndex + 1);
    else setCurrentIndex(products.length - 3);
  };
  const prevSlide = (index: number) => {
    setActiveNav(index);
    if (currentIndex === 0) setCurrentIndex(0);
    else setCurrentIndex(prevIndex => prevIndex - 1);
  };

  const getVisibleSlides = () => {
    const start = currentIndex;
    const end = currentIndex + 3;
    return products?.slice(start, end);
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      {!recommendation && (
        <div className={styles.slider}>
          <div className={styles.slides}>
            {getVisibleSlides()?.map((slide, index) => (
              <div key={index} className={styles.slide}>
                {slide.attributes.length > 0 && (
                  <Card
                    product={slide}
                    onBuyClick={onBuyClick}
                    onFavoriteClick={onFavoriteClick}
                  />
                )}
              </div>
            ))}
          </div>
          <div className={styles.nav}>
            <button
              className={activeNav === 0 ? styles.active : ''}
              onClick={() => prevSlide(0)}
              aria-label="Previous Slide"
            />
            <button
              className={activeNav === 1 ? styles.active : ''}
              onClick={() => handleNavClick(1)}
              aria-label="Next slide"
            />
            <button
              className={activeNav === 2 ? styles.active : ''}
              onClick={() => nextSlide(2)}
              aria-label="Next-slide"
            />
          </div>
        </div>
      )}

      {recommendation && (
        <div className={styles.slider}>
          <div className={styles.slides}>
            {recommendation?.map((slide, index) => (
              <div key={index} className={styles.slide}>
                <Card
                  product={slide}
                  onBuyClick={onBuyClick}
                  onFavoriteClick={onFavoriteClick}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCardsSlider;
