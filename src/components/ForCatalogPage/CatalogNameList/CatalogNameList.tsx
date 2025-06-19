'use client';

import React from 'react';
import { Product } from '@/types/product';
import { FavoriteStore } from '@/hooks/useLocalStorage';
import Card from '../../Card';

interface ICatalogNameListProps {
  item: Product;
  variant: 'big' | 'standart';
  favoriteStore: FavoriteStore;
}

const CatalogNameList: React.FC<ICatalogNameListProps> = ({ item, variant, favoriteStore }) => (
  <Card
    product={item}
    variant={variant}
    favoriteStore={favoriteStore}
  />
);

export default CatalogNameList;
