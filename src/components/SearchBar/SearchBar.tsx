'use client';

/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, useState } from 'react';
import styles from './SearchBar.module.css';
import Price from './Price/Price';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import { useLocale } from 'next-intl';

interface ISearchBarProps {
  createQueryString: any;
  setMinValue: any;
  setMaxValue: any;
  maxValue: number;
  minValue: number;
  setPage: any;
  minRange?: number;
  maxRange?: number;
  difference?: number;
}
// eslint-disable-next-line arrow-body-style
const SearchBar: FC<ISearchBarProps> = ({
  setMinValue,
  createQueryString,
  setMaxValue,
  maxValue,
  minValue,
  setPage,
  minRange = 0,
  maxRange = 100000,
  difference = 100,
}) => {
  const locale = useLocale()
  const widthWindow = useWindowWidth();

  return (
    <div className={styles.container}>
      <form>
        {widthWindow < 1179 && (
          <li>
            <div className={styles.input_filter}>
              <p className={styles.filter_title}>{locale === 'uk' ? 'Фільтр' : 'Filter'} </p>
            </div>
          </li>
        )}

        <Price
          minValue={minValue}
          maxValue={maxValue}
          createQueryString={createQueryString}
          setMinValue={setMinValue}
          setMaxValue={setMaxValue}
          setPage={setPage}
          difference={difference}
          minRange={minRange}
          maxRange={maxRange}
        />
      </form>
    </div>
  );
};
export default SearchBar;
