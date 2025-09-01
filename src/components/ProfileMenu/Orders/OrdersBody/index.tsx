'use client';

import React, { useCallback, useState } from 'react';
import OrdersList from '../OrdersList';
import Pagination from '@/components/Pagination/Pagination';
import { IOrderType } from '@/types';
import { useTranslations } from 'next-intl';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import OrdersListMobile from '../OrdersListMobile/OrdersListMobile';

interface OrdersBodyProp {
  countPage: number;
  orders: IOrderType[];
}

function OrdersBody({ orders, countPage }: OrdersBodyProp) {
  const t = useTranslations('profile');
  const width = useWindowWidth();
  const [page, setPage] = useState(0);
  // const [ordersOnPage, setOrdersOnPage] = useState(0);
  const ITEMS_PER_PAGE = 4;
  /* const createQueryString = useCallback(
    (name: string, value: string) => {
      setPage(Number(value));
      return value.toString();
    },
    [setPage]
  ); */

  const totalPageCount = Math.ceil(orders.length / ITEMS_PER_PAGE);

  const onPageChange = (name: string, value: string) => {
    console.log('page', value);
    setPage(Number(value));
  };
 
  const paginatedOrders = orders.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  return (
    <>
      {width < 1180 ? (
        <OrdersListMobile orders={orders} t={t} page={page} />
      ) : (
        <OrdersList orders={orders} t={t} page={page} />
      )}
      {orders.length > 0 && (
        <Pagination
          totalPage={totalPageCount}
          currentPage={String(page)}
          createQueryString={onPageChange}
          size={ITEMS_PER_PAGE}
          totalElements={String(orders.length)}
          ordersPage={true}
        />
      )}
    </>
  );
}

export default OrdersBody;
