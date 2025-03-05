import Image from 'next/image';
import React from 'react';
import arrowsLeft from '@/../public/icons/Arrows.svg';
import arrowsRight from '@/../public/icons/arrowsRight.svg';
import style from './Pagination.module.css';

function Pagination(
  {
    totalPage,
    currentPage,
    createQueryString,
  }: {
    totalPage: number;
    currentPage: string;
    createQueryString: (name: string, value: string) => void;
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
  const handleBackPage = () => {
    createQueryString('page', `${Number(currentPage) - 1}`);
  };

  const handleMorePage = () => {
    createQueryString('page', `${Number(currentPage) + 1}`);
  };

  const generatePages = () => {
    const pages = [];
    const maxVisiblePages = 3; // Скільки номерів відображати (без "...")
    const sidePages = 2; // Скільки сторінок навколо поточної

    if (totalPage <= maxVisiblePages) {
      return Array.from({ length: totalPage }, (_, i) => i + 1);
    }

    pages.push(1); // Перша сторінка

    if (Number(currentPage) > sidePages + 2) {
      pages.push('...');
    }

    for (
      let i = Math.max(2, Number(currentPage) - sidePages);
      i <= Math.min(totalPage - 1, Number(currentPage) + sidePages);
      i += 1
    ) {
      pages.push(i);
    }

    if (Number(currentPage) < totalPage - sidePages - 1) {
      pages.push('...');
    }

    pages.push(totalPage); // Остання сторінка

    return pages;
  };

  return (
    <div className={style.pagination_container}>
      {totalPage > 0 && Number(currentPage) !== 1 && (
        <button className={style.pagination_btn_back} onClick={handleBackPage}>
          <Image src={arrowsRight} alt="arrows Right" width={20} height={20} />
          <span> Назад</span>
        </button>
      )}

      {totalPage > 0
        ? generatePages()?.map((page, index) => (
          <button
            key={index + 1}
            className={Number(currentPage) === page ? style.activePage : ''}
            onClick={() => typeof page === "number" && createQueryString('page', `${page}`)}
          >
            {page}
          </button>
        ))
        : ''}
      {totalPage > 0 && Number(currentPage) !== totalPage ? (
        <button className={style.pagination_btn_more} onClick={handleMorePage}>
          <span>Вперед</span>
          <Image src={arrowsLeft} alt="arrows Left" width={20} height={20} />
        </button>
      ) : (
        <div> </div>
      )}
    </div>
  );
}

export default Pagination;
