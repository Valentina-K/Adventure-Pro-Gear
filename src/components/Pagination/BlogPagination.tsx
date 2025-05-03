'use client';

import React from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

import style from './Pagination.module.css';

interface PaginationProps {
  totalPage: number;
  currentPage: number;
  createQueryString?: (name: string, value: string) => void;
}

const Pagination = ({ totalPage, currentPage, createQueryString }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations('blog');

  const handleChangePage = (page: number) => {
    if (createQueryString) {
      createQueryString('page', `${page}`);
    } else {
      const params = new URLSearchParams(searchParams);
      params.set('page', `${page}`);
      router.push(`?${params.toString()}`);
    }
  };

  const handleBackPage = () => handleChangePage(currentPage - 1);
  const handleMorePage = () => handleChangePage(currentPage + 1);

  const generatePages = () => {
    const pages = [];
    const maxVisiblePages = 3;
    const sidePages = 2;

    if (totalPage <= maxVisiblePages) {
      return Array.from({ length: totalPage }, (_, i) => i + 1);
    }

    pages.push(1);
    if (currentPage > sidePages + 2) pages.push('...');

    for (
      let i = Math.max(2, currentPage - sidePages);
      i <= Math.min(totalPage - 1, currentPage + sidePages);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPage - sidePages - 1) pages.push('...');
    pages.push(totalPage);

    return pages;
  };

  return (
    <div className={style.pagination_container}>
      {totalPage > 0 && currentPage !== 1 && (
        <button
          className={style.pagination_btn_back}
          onClick={handleBackPage}
          aria-label={t('prev')}
        >
          <Image src="/icons/arrowsRight.svg" alt="Previous page" width={20} height={20} />
          <span>{t('prev')}</span>
        </button>
      )}

      {totalPage > 0 &&
        generatePages().map((page, index) =>
          page === '...' ? (
            <span key={`dots-${index}`} aria-hidden="true">
              ...
            </span>
          ) : (
            <button
              key={page}
              className={currentPage === page ? style.activePage : ''}
              onClick={() => handleChangePage(page as number)}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          )
        )}

      {totalPage > 0 && currentPage !== totalPage && (
        <button
          className={style.pagination_btn_more}
          onClick={handleMorePage}
          aria-label={t('next')}
        >
          <span>{t('next')}</span>
          <Image src="/icons/Arrows.svg" alt="Next page" width={20} height={20} />
        </button>
      )}
    </div>
  );
};

export default Pagination;
