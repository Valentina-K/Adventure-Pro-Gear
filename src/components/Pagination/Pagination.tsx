'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import arrowsLeft from '@/../public/icons/Arrows.svg';
import arrowsRight from '@/../public/icons/arrowsRight.svg';
import style from './Pagination.module.css';
import { useParams } from 'next/navigation';
import Container from '../Container';

function Pagination(
  {
    totalPage,
    currentPage,
    createQueryString,
    size,
    totalElements,
    ordersPage,
  }: {
    totalPage: number;
    currentPage: string;
    createQueryString: (name: string, value: string) => void;
    size: number;
    totalElements?: string;
    ordersPage?: boolean;
  }
  // {
  //   searchParams,
  // }: {
  //     searchParams: { [key: string]: string | string[] | undefined };
  //   }
) {
  // const page = searchParams['page'] ?? '1';
  // const perPage = searchParams['perPage'] ?? '1';

  // const start = (Number(page) - 1) * Number(perPage);
  // const end = start + Number(perPage);
  const params = useParams();
  const t = useTranslations();

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);

  const pageNum = Number(currentPage);
  const pageSize = Number(size);
  const totalItems = Number(totalElements);

  useEffect(() => {
    if (ordersPage) {
      const startRes = pageNum * size + 1;
      const endRes = Math.min((pageNum + 1) * size, totalItems);
      setStart(startRes);
      setEnd(endRes);

      return;
    } else {
      const isLastPage = pageNum === totalPage - 1;

      const startRes = !isLastPage
        ? pageNum * pageSize + 1
        : pageNum === 0
          ? totalItems - (totalItems % pageSize || pageSize) + 1
          : (totalItems - pageSize || pageSize) + 1;

      const endRes = isLastPage ? totalItems : (pageNum + 1) * pageSize;
      setStart(startRes);
      setEnd(endRes);
    }
  }, [pageNum, totalItems, pageSize]);

  const handleBackPage = () => {
    createQueryString('page', `${pageNum - 1}`);
  };

  const handleMorePage = () => {
    createQueryString('page', `${pageNum + 1}`);
  };

  const generatePages = () => {
    const pages = [];
    const maxVisiblePages = 1; // Скільки номерів відображати (без "...")
    const sidePages = 1; // Скільки сторінок навколо поточної

    if (totalPage <= maxVisiblePages) {
      return Array.from({ length: totalPage }, (_, i) => i + 1);
    }

    pages.push(1); // Перша сторінка

    if (pageNum > sidePages + 2) {
      pages.push('...');
    }

    for (
      let i = Math.max(2, pageNum - sidePages);
      i <= Math.min(totalPage - 1, pageNum + sidePages);
      i += 1
    ) {
      pages.push(i);
    }

    if (pageNum < totalPage - sidePages - 1) {
      pages.push('...');
    }

    pages.push(totalPage); // Остання сторінка

    return pages;
  };

  return (
      <div>
        {totalItems ? (
          <p className={style.pagination_total}>
            {`${params.lang === 'uk' ? `Показано з ${start} по ${end} із ${totalItems} (${Math.ceil(totalPage)} сторінок)` : `Showing ${start} to ${end} of ${totalItems} (${Math.ceil(totalPage)} pages)`}`}
          </p>
        ) : (
          ''
        )}
        <div className={style.pagination_container}>
          {totalPage > 0 && pageNum !== 0 && (
            <button className={style.pagination_btn_back} onClick={handleBackPage}>
              <Image src={arrowsRight} alt="arrows Right" width={20} height={20} />
              <span>{t('back')}</span>
            </button>
          )}
  
          {totalPage > 0 &&
            generatePages()?.map((page, index) => (
              <button
                key={index + 1}
                className={pageNum + 1 === Number(page) ? style.activePage : ''}
                onClick={() => typeof page === 'number' && createQueryString('page', `${page - 1}`)}
              >
                {page !== '...' ? Number(page) : '...'}
              </button>
            ))}
          {totalPage > 0 && pageNum !== totalPage - 1 ? (
            <button className={style.pagination_btn_more} onClick={handleMorePage}>
              <span>{t('forward')}</span>
              <Image src={arrowsLeft} alt="arrows Left" width={20} height={20} />
            </button>
          ) : (
            <div> </div>
          )}
        </div>
      </div>
  );
}

export default Pagination;
