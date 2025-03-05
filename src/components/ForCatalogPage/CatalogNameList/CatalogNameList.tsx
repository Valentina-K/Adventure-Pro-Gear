'use client';

import React from 'react';
import { Locale } from '@/i18n-config';
import { Product } from '@/interfaces/product';
import Card from '../../Card';
import styles from './CatalogNameList.module.css';

interface ICatalogNameListProps {
  item: Product;
}

const CatalogNameList: React.FC<ICatalogNameListProps> = ({ item }, locale: Locale) => {
  return (
    <Card
      product={item}
      locale={locale}
      translation={{
        card: {
          addToFollowing: '',
          sale: '',
          new: '',
          available: '',
          outOfStock: '',
          buy: '',
        },
      }}
      // eslint-disable-next-line react/jsx-no-bind
      onBuyClick={(): void => {
        throw new Error('Function not implemented.');
      }}
      onFavoriteClick={(productId: number, isFavorite: boolean): void => {
        throw new Error('Function not implemented.');
      }}
    />
  );
};

export default CatalogNameList;
