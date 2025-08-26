'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import SearchIcon from '@/../public/icons/SearchIcon.svg';
import { AppRoutes } from '@/constants/routes';
import { Product } from '@/types/product';
import { useGetProductsQuery } from '@/redux/features/apiSlice';
import { useDispatch } from 'react-redux';
import { setFilteredProducts } from '@/redux/products/slice';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import noImage from '@/../public/images/no_image.png';
import Button from '../Button';
import styles from './Search.module.css';

interface SearchProps {
  placeholder: string;
  unavailable: string;
  showall: string;
}

const Search: React.FC<SearchProps> = ({ placeholder, unavailable, showall }) => {
  const locale = useLocale();
  const widthWindow = useWindowWidth();
  const ignoreRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>('');
  const [visibleSearch, setVisibleSearch] = useState<boolean>(true);
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const [filteredItems, setFilteredItems] = useState<Product[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const router = useRouter();
  const { data, isLoading, error } = useGetProductsQuery();
  const dispatch = useDispatch();

  if (error) console.log(error);

  useEffect(() => {
    if (widthWindow < 1180) {
      setVisibleSearch(false);
    }
    if (widthWindow >= 1180) {
      setVisibleSearch(true);
    }
  }, [setVisibleSearch, widthWindow]);

  useEffect(() => {
    if (widthWindow < 1180) {
      const handleClick = (e: MouseEvent | KeyboardEvent) => {
        
        if (ignoreRef.current && !ignoreRef.current.contains(e.target as Node)) {
          setVisibleSearch(false);
          setIsSearchActive(false);
        }
      };

      document.body.addEventListener('click', handleClick);
      document.addEventListener('keydown', (e: KeyboardEvent) => handleClick(e));

      return () => {
        document.body.removeEventListener('click', handleClick);
        document.removeEventListener('keydown', (e: KeyboardEvent) => handleClick(e));
      };
    }
  }, [widthWindow]);

  useEffect(() => {
    if (value.length >= 1) {
      const filtered = data?.content.filter(
        product =>
          product.productNameUa.toLowerCase().includes(value.toLowerCase()) ||
          product.productNameEn.toLowerCase().includes(value.toLowerCase())
      );
      if (filtered) setFilteredItems(filtered);
    } else {
      setFilteredItems([]);
    }
  }, [setFilteredItems, data, value, locale]);

  const handlerOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleFocus = () => {
    setValue('');
    setIsDropdownVisible(true);
  };

  const handleBlur = () => {
    setTimeout(() => setIsDropdownVisible(false), 200);
  };

  const handleProductClick = (product: Product) => {
    setValue('');
    router.push(`/product/${product.productId}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(setFilteredProducts(filteredItems));
      setValue('');
      if (widthWindow < 1180) {
      setVisibleSearch(false); 
      }
      router.push(`${AppRoutes.PRODUCTS.replace('*', value)}`);
    }
  };

  const handleAllClick = () => {
    dispatch(setFilteredProducts(filteredItems));
    setValue('');
    router.push(`${AppRoutes.PRODUCTS.replace('*', value)}`);
  };

  const handleVisible = () => {
    if (widthWindow < 1180) {
      setVisibleSearch((prev: any) => !prev);
      setIsSearchActive(prev => !prev);
    }
  };

  return (
    <div className={styles.search_box}>
      {visibleSearch && (
        <input
          className={styles.search}
          placeholder={placeholder}
          value={value}
          onChange={handlerOnChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={ignoreRef}
        />
      )}
      {widthWindow < 1180 ? (
        <>
          <Image
            src={SearchIcon}
            alt="Search Icon"
            width={22}
            height={22}
            priority
            className={styles.search_icon}
            onClick={handleVisible}
          />
          <button
            className={visibleSearch ? styles.search_icon_active : styles.search_none}
            onClick={handleAllClick}
            aria-label="Search"
          >
            <Image src={SearchIcon} alt="Search Icon" width={22} height={22} priority />
          </button>
        </>
      ) : (
        <button className={styles.search_icon} onClick={handleAllClick} aria-label="Search">
          <Image src={SearchIcon} alt="Search Icon" width={22} height={22} priority />
        </button>
      )}

      {isDropdownVisible && value.length >= 1 && (
        <ul className={styles.dropdown}>
          {filteredItems.length > 0 ? (
            <>
              {filteredItems.slice(0, 5).map(product => (
                <li key={product.productId}>
                  <button
                    className={styles.dropdown_li}
                    onClick={() => handleProductClick(product)}
                  >
                    <span className={styles.smallcard_icon}>
                      <Image
                        alt="Product icon"
                        src={product.contents.length > 0 ? product.contents[0].source : noImage}
                        width={80}
                        height={80}
                      />
                    </span>
                    <div className={styles.smallcard_main}>
                      <span className={styles.smallcard_name}>
                        {locale === 'uk' ? product.productNameUa : product.productNameEn}
                      </span>
                      <span className={styles.smallcard_price}>{product.basePrice}₴</span>
                    </div>
                  </button>
                </li>
              ))}
              <li key="dropdown-button" className={styles.dropdown_li_end}>
                <Button
                  className={styles.dropdown_button}
                  text={showall}
                  border="1px solid #1E5F72"
                  onClick={handleAllClick}
                />
              </li>
            </>
          ) : (
            <li className={styles.smallcard_noproduct} key="no-product-found">
              {unavailable}
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Search;
