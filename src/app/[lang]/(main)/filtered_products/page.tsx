'use client';

import Container from '@/components/Container';
import React, { useState } from 'react';
import { selectFilteredProducts } from '@/redux/products/selectors';
import { useSelector } from 'react-redux';
import { useLocale, useTranslations } from 'next-intl';
import Skeleton from '@/components/Skeleton/Skeleton';

interface FilteredProductsPageProps {
  searchParams: { search: string };
}

function FilteredProduct({ searchParams }: FilteredProductsPageProps) {
  const { search } = searchParams;
  const locale = useLocale();
  const products = useSelector(selectFilteredProducts);
  const t = useTranslations('nav.search');
  const [totalPage, setTotalPage] = useState<number>(0);
  const [page, setPage] = useState(0);
 
  return (
    <Container>
      <Skeleton
        products={products}
        navigationTitle={locale === 'uk' ? 'Пошук' : 'Search products'}
        title={`${t('searchResults')} "${search}"`}
        setTotalPage={setTotalPage}
        page={String(page)}
        setPage={setPage}
        totalPage={totalPage}
      />
    </Container>   
  );
}

export default FilteredProduct;
