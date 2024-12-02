'use client';

import React, { useState } from 'react';
import { Locale } from '@/i18n-config';
import { Product } from '@/interfaces/product';
import Card from '../Card';
import styles from './ProductCardsSlider.module.css';

interface CardsSliderProp {
  products: Product[];
  locale?: Locale;
  translation: {
    card: {
      addToFollowing: string;
      sale: string;
      new: string;
      available: string;
      outOfStock: string;
      buy: string;
    };
  };
  onBuyClick: (id: number) => void;
  onFavoriteClick: (productId: number, isFavorite: boolean) => void;
}

const ProductCardsSlider: React.FC<CardsSliderProp> = ({
  products,
  locale = 'uk-UA',
  translation,
  onBuyClick,
  onFavoriteClick,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNavClick = (index: number) => {
    setCurrentIndex(index * Math.ceil(products.length / 3));
  };
  const getVisibleSlides = () => {
    const start = currentIndex;
    const end = Math.min(currentIndex + Math.ceil(products.length / 3), products.length);
    return products.slice(start, end);
  };
  return (
    <div className={styles.slider}>
      <div className={styles.slides}>
        {getVisibleSlides().map((slide, index) => (
          <div key={index} className={styles.slide}>
            <Card
              product={slide}
              onBuyClick={onBuyClick}
              onFavoriteClick={onFavoriteClick}
              locale={locale}
              translation={translation}
            />
          </div>
        ))}
      </div>
      <div className={styles.nav}>
        {Array.from({ length: 3 }).map((_, index) => (
          <button key={index} onClick={() => handleNavClick(index)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
    /* <div className={styles.container}>
      <div className={styles.switch}>
        <input checked type="radio" name="slider" id="slide1" />
        <input type="radio" name="slider" id="slide2" />
        <input type="radio" name="slider" id="slide3" />
        <div className={styles.controlls}>
          <label htmlFor="slide1" />
          <label htmlFor="slide2" />
          <label htmlFor="slide3" />
        </div>
        <div className={styles.wrapper}>
          {products &&
            products.map(product => (
              <div key={product.productId} className={styles.box}>
                <div className={styles.content}>
                  <Card
                    product={product}
                    onBuyClick={onBuyClick}
                    onFavoriteClick={onFavoriteClick}
                    locale={locale}
                    translation={translation('product')}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div> */
  );
};

export default ProductCardsSlider;
