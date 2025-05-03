'use client';

import React from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

import style from './Pagination.module.css';

const BlogPagination = ({ totalPage, currentPage }: { totalPage: number; currentPage: number }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations('blog');

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    return `?${params.toString()}`;
  };

  const handleChangePage = (page: number) => {
    const query = createQueryString('page', `${page}`);
    router.push(query);
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
        <button className={style.pagination_btn_back} onClick={handleBackPage}>
          <Image src="/icons/arrowsRight.svg" alt="arrows Right" width={20} height={20} />
          <span>{t('prev')}</span>
        </button>
      )}

      {totalPage > 0 &&
        generatePages().map((page, index) =>
          page === '...' ? (
            <span key={`dots-${index}`}>...</span>
          ) : (
            <button
              key={page}
              className={currentPage === page ? style.activePage : ''}
              onClick={() => handleChangePage(page as number)}
            >
              {page}
            </button>
          )
        )}

      {totalPage > 0 && currentPage !== totalPage && (
        <button className={style.pagination_btn_more} onClick={handleMorePage}>
          <span>{t('next')}</span>
          <Image src="/icons/Arrows.svg" alt="arrows Left" width={20} height={20} />
        </button>
      )}
    </div>
  );
};

export default BlogPagination;
