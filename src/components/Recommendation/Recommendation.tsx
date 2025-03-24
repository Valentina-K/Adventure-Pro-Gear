'use client';

import React, { useEffect, useState } from 'react';
import { Product } from '@/types/product';
import { Locale } from '@/i18n-config';
import style from './Recommendation.module.css';
import ProductCardsSlider from '../ProductCardsSlider';

export const dynamic = 'force-dynamic';

interface IRecommendationProp {
  recommendation: Product[];
  t: any;
}

const Recommendation: React.FC<IRecommendationProp> = ({ recommendation, t }) => {
  const [sizeView, setSizeView] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setSizeView(window.innerWidth);
    };
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleBuyClick = (productId: number) => {
    console.log('from buyClick: ', productId);
  };

  const handleFavoriteClick = () => {};

  return (
    <>
      <h1 className={style.title}>{t('recommendation')}</h1>

      {sizeView < 1179 ? (
        <ProductCardsSlider
          products={recommendation}
          onBuyClick={handleBuyClick}
          onFavoriteClick={handleFavoriteClick}
          title=""
        />
      ) : (
        <ProductCardsSlider
          recommendation={recommendation}
          products={[]}
          onBuyClick={handleBuyClick}
          onFavoriteClick={handleFavoriteClick}
          title=""
        />
      )}
    </>
  );
};

export default Recommendation;
