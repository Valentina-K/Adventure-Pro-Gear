'use client';

import React from 'react';
import { Locale } from '@/i18n-config';
import { Product } from '@/interfaces/product';
import Card from '../Card';
import styles from './ProductCardsSlider.module.css';

interface CardsSliderProp {
  products: Product[];
  locale?: Locale;
  translation: {};
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
  return (
    <div className={styles.container}>
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
    </div>
  );
};

export default ProductCardsSlider;
