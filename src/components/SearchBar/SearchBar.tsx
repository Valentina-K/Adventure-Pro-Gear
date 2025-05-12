'use client';

/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, useState } from 'react';
import styles from './SearchBar.module.css';
import Price from './Price/Price';

interface ISearchBarProps {
  createQueryString: any;
  setMinValue: any;
  setMaxValue: any;
  maxValue: number;
  minValue: number;
  setPage: any;
  minRange?: number;
  maxRange?: number;
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
}) => (
  <div className={styles.container}>
    <form>
      <Price
        minValue={minValue}
        maxValue={maxValue}
        createQueryString={createQueryString}
        setMinValue={setMinValue}
        setMaxValue={setMaxValue}
        setPage={setPage}
        minRange={minRange}
        maxRange={maxRange}
      />
    </form>
  </div>
);
export default SearchBar;
