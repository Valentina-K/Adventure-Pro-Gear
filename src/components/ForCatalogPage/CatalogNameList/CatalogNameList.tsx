'use client';

import React from 'react';
import { Product } from '@/types/product';
import Card from '../../Card';
// import styles from './CatalogNameList.module.css';

interface ICatalogNameListProps {
  item: Product;
  variant: 'big' | 'standart';
}

const CatalogNameList: React.FC<ICatalogNameListProps> = ({ item, variant }) => (
  <Card
    product={item}
    variant={variant}
  />
);

export default CatalogNameList;
