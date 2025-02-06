'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import SearchIcon from '@/../public/icons/SearchIcon.svg';
import { AppRoutes } from '@/constants/routes';
import { Locale } from '@/i18n-config';
import { Product } from '@/interfaces/product';
import { useProduct } from '@/contexts/ProductContext';
import Button from '../Button';
import styles from './Search.module.css';
import { set } from 'lodash';

interface SearchProps {
  placeholder: string;
  unavailable: string;
  showall: string;
  locale: Locale;
}

const Search: React.FC<SearchProps> = ({
  placeholder,
  unavailable,
  showall,
  locale,
}) => {
  const [value, setValue] = useState<string>('');
  const [filteredItems, setFilteredItems] = useState<Product[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const router = useRouter();
  const { products, setProduct, setFilteredProducts } = useProduct();
  useEffect(() => {
    if (value.length >= 1) {
      const filtered = products.filter(product =>
        (locale === 'uk-UA' ? product.productNameUa : product.productNameEn)
          .toLowerCase()
          .includes(value.toLowerCase()));
      setFilteredItems(filtered);
    } else {
      setFilteredItems([]);
    }
  }, [setFilteredItems, products, value, locale]);

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
    setProduct(product);
    router.push(`/${locale}/product/${product.productId}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // need to fix this
      setFilteredProducts(filteredItems);
      router.push(`/${locale}${AppRoutes.PRODUCTS.replace('*', value)}`);
    }
  };

  const handleAllClick = () => {
    setFilteredProducts(filteredItems);
    router.push(`/${locale}${AppRoutes.PRODUCTS.replace('*', value)}`);
  };

  return (
    <div className={styles.search_box}>
      <input
        className={styles.search}
        placeholder={placeholder}
        value={value}
        onChange={handlerOnChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <span className={styles.search_icon} onClick={handleAllClick}>
        <Image src={SearchIcon} alt="Search Icon" width={22} height={22} priority />
      </span>

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
                      {/* <Image alt="Product icon" src={product.selfLink} width={80} height={80} /> */}
                      Icon
                    </span>
                    <div className={styles.smallcard_main}>
                      <span className={styles.smallcard_name}>
                        {locale === 'uk-UA' ? product.productNameUa : product.productNameEn}
                      </span>
                      <span className={styles.smallcard_price}>
                        {product.basePrice}
                        ₴
                      </span>
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
