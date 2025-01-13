import Image from 'next/image';
import React from 'react';
import arrowsLeft from '@/../public/icons/Arrows.svg';
import arrowsRight from '@/../public/icons/arrowsRight.svg';
import style from './Pagination.module.css';

function Pagination({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // const page = searchParams['page'] ?? '1';
  // const perPage = searchParams['perPage'] ?? '1';

  // const start = (Number(page) - 1) * Number(perPage);
  // const end = start + Number(perPage);
  return (
    <div className={style.pagination_container}>
      <button className={style.pagination_btn_back}>
        <Image src={arrowsRight} alt="arrows Right" width={20} height={20} />
        <span> Назад</span>
      </button>
      <button>...</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>...</button>
      <button className={style.pagination_btn_more}>
        <span>Вперед</span>
        <Image src={arrowsLeft} alt="arrows Left" width={20} height={20} />
      </button>
    </div>
  );
}

export default Pagination;
