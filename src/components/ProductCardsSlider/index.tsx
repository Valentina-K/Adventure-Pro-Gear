'use client';

import React, { useState } from 'react';
import { Product } from '@/types/product';
import { useLocale, useTranslations } from 'next-intl';
import Card from '../Card';
import styles from './ProductCardsSlider.module.css';

interface CardsSliderProp {
  products: Product[];
  recommendation?: Product[];
  title: string;
}

const ProductCardsSlider: React.FC<CardsSliderProp> = ({ products, title, recommendation }) => {
  const locale = useLocale();
  const t = useTranslations('product');
  const [activeNav, setActiveNav] = useState(0);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      {!recommendation && (
        <div className={styles.slider}>
          <div className={styles.slides} style={{ transform: `translateX(-${activeNav * 33.33}%)` }}>
            <div className={styles.slide}>
              {products.slice(0, 3).map(item => (
                <Card key={item.productId} product={item} variant="small" />
              ))}
            </div>
            <div className={styles.slide}>
              {products.slice(3, 6).map(item => (
                <Card key={item.productId} product={item} variant="small" />
              ))}
            </div>
            <div className={styles.slide}>
              {products.slice(6, 9).map(item => (
                <Card key={item.productId} product={item} variant="small" />
              ))}
            </div>
          </div>
          <div className={styles.nav}>
            <button
              className={activeNav === 0 ? styles.active : ''}
              onClick={() => setActiveNav(0)}
              aria-label="Previous Slide"
            />
            <button
              className={activeNav === 1 ? styles.active : ''}
              onClick={() => setActiveNav(1)}
              aria-label="Next slide"
            />
            <button
              className={activeNav === 2 ? styles.active : ''}
              onClick={() => setActiveNav(2)}
              aria-label="Next slide"
            />
          </div>
        </div>
      )}

      {recommendation && (
        <div className={styles.slider}>
          <div className={styles.slides}>
            {recommendation?.map((slide, index) => (
              <div key={index} className={styles.slide}>
                <Card product={slide} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCardsSlider;
/* <div class="carousel">
        <input type="radio" name="slider" id="slide1" checked>
        <input type="radio" name="slider" id="slide2">
        <input type="radio" name="slider" id="slide3">
{products?.map((slide, index) => (
              <div key={index} className={styles.slide}>
                {slide.attributes.length > 0 && (
                  <Card
                    product={slide}
                    variant='small'
                  />
                )}
              </div>
            ))}
        <div class="slides">
            <div class="slide">

                <img src="image1.jpg" alt="Image 1" style="width:100%">
            </div>
            <div class="slide">
                <img src="image2.jpg" alt="Image 2" style="width:100%">
            </div>
            <div class="slide">
                <img src="image3.jpg" alt="Image 3" style="width:100%">
            </div>
        </div>

        <div class="controls">
            <label for="slide1" class="control">1</label>
            <label for="slide2" class="control">2</label>
            <label for="slide3" class="control">3</label>
        </div>
    </div> */
