import React from 'react';
import { getAllTranslations, getTranslation } from '@/dictionaries/dictionaries';
import { getProductById } from '@/services/axios';
import ProductWrapper from '@/components/product/ProductWrapper';

async function Product() {
  const translations = await getAllTranslations("uk-UA");
  const translation = getTranslation(translations);
  const res = await getProductById(130);
  return (
    <ProductWrapper product={res && res.data} locale='uk-UA' />
  );
}

export default Product;
