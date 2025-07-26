import Image from 'next/image';
import React from 'react';
import { useTranslations } from 'next-intl';
import arrowsLeft from '@/../public/icons/Arrows.svg';
import arrowsRight from '@/../public/icons/arrowsRight.svg';
import style from './Pagination.module.css';
import { useParams } from 'next/navigation';

function Pagination(
  {
    totalPage,
    currentPage,
    createQueryString,
    size,
    totalElements,
  }: {
    totalPage: number;
    currentPage: string;
    createQueryString: (name: string, value: string) => void;
    size: number;
    totalElements?: string;
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

  const pageNum = Number(currentPage);
  const pageSize = Number(size);
  const totalItems = Number(totalElements);

  // Корректный расчет для последней страницы
  const isLastPage = pageNum === totalPage - 1;

  const start = !isLastPage
    ? pageNum * pageSize + 1
    : pageNum === 0
      ?
        totalItems - (totalItems % pageSize || pageSize) + 1
      : (totalItems - pageSize || pageSize) + 1;

  const end = isLastPage ? totalItems : (pageNum + 1) * pageSize;

  const handleBackPage = () => {
    createQueryString('page', `${pageNum - 1}`);
  };

  const handleMorePage = () => {
    createQueryString('page', `${pageNum + 1}`);
  };

  const generatePages = () => {
    const pages = [];
    const maxVisiblePages = 2; // Скільки номерів відображати (без "...")
    const sidePages = 2; // Скільки сторінок навколо поточної

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
          {`${params.lang === 'uk' ? `Показано з ${start} по ${end} із ${totalItems} (${totalPage} сторінок)` : `Showing ${start} to ${end} of ${totalItems} (${totalPage} pages)`}`}
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
