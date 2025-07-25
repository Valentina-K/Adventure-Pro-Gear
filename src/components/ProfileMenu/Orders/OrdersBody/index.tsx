'use client';

import React, { useCallback, useState } from 'react';
import OrdersList from '../OrdersList';
import Pagination from '@/components/Pagination/Pagination';
import { IOrderType } from '@/types';
import { useTranslations } from 'next-intl';

interface OrdersBodyProp {
  countPage: number;
  orders: IOrderType[];
}

function OrdersBody({ orders, countPage }: OrdersBodyProp) {
  const t = useTranslations('profile');
  const [page, setPage] = useState(0);

  /* const createQueryString = useCallback(
    (name: string, value: string) => {
      setPage(Number(value));
      return value.toString();
    },
    [setPage]
  ); */
  const onPageChange = (name: string, value: string) => {
    console.log('page', value)
    setPage(Number(value));
  };

  return (
    <>
      <OrdersList orders={orders} t={t} page={page} />
      <Pagination
        totalPage={countPage}
        currentPage={`${page}`}
        createQueryString={onPageChange}
        size={orders?.length}
        totalElements={String(orders?.length)}
      />
    </>
  );
}

export default OrdersBody;
