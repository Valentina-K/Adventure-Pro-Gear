'use client';

import React, { useEffect, useState } from 'react';
import Container from '@/components/Container';
import Skeleton from '@/components/Skeleton/Skeleton';
import { useLocale } from 'next-intl';
import { Product } from '@/types';

import { getNewProducts } from '@/app/actions';

const NewItems = () => {
  const locale = useLocale();

  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);


  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const product = await getNewProducts('');

        const productAll = await getNewProducts(product.totalElements);

        setNewProducts(productAll.content);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
      
    })();
  }, []);

  return (
    <Container>
      <Skeleton
        loading={loading}
        products={newProducts}
        navigationTitle={locale === 'uk' ? 'Новинки' : 'New items'}
        title={locale === 'uk' ? 'Новинки' : 'New items'}
        setTotalPage={setTotalPage}
        page={String(page)}
        setPage={setPage}
        totalPage={totalPage}
      />
    </Container>
  );
};

export default NewItems;
