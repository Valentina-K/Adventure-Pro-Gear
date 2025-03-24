'use client';

import React from 'react';
import { Product } from '@/types/product';
import Card from '../../Card';
import styles from './CatalogNameList.module.css';

interface ICatalogNameListProps {
  item: Product;
  onBuyClick: (id: number) => void;
}

const CatalogNameList: React.FC<ICatalogNameListProps> = ({ item, onBuyClick }) => {
  return (
    <Card
      product={item}
      onBuyClick={onBuyClick}
      onFavoriteClick={(productId: number, isFavorite: boolean): void => {
        throw new Error('Function not implemented.');
      }}
    />
  );
};

export default CatalogNameList;
