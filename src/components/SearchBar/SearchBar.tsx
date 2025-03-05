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
}
// eslint-disable-next-line arrow-body-style
const SearchBar: FC<ISearchBarProps> = ({
  setMinValue,
  createQueryString,
  setMaxValue,
  maxValue,
  minValue,
  setPage,
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
      />
    </form>
  </div>
);
export default SearchBar;
