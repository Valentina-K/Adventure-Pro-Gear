'use client';

import Container from '@/components/Container';
import React, { useCallback, useEffect, useState } from 'react';
import Navigation from '@/components/Navigation/Navigation';
import { selectFilteredProducts } from '@/redux/products/selectors';
import { useSelector } from 'react-redux';
import CatalogNameList from '@/components/ForCatalogPage/CatalogNameList/CatalogNameList';
import Pagination from '@/components/Pagination/Pagination';
import ViewCatalogList from '@/components/ForCatalogPage/ViewCatalogList/ViewCatalogList';
import DropdownMenu from '@/components/ForCatalogPage/DropdownMenu/DropdownMenu';
import SearchBar from '@/components/SearchBar/SearchBar';
import { useTranslations } from 'next-intl';
import { Product } from '@/types';
import useDebounce from '@/hooks/useDebounce';
import styles from './styles.module.css';

interface FilteredProductsPageProps {
  searchParams: { search: string };
}

function FilteredProduct({ searchParams }: FilteredProductsPageProps) {
  const { search } = searchParams;
  const products = useSelector(selectFilteredProducts);
  const [sortProducts, setSortProducts] = useState<Product[]>(products);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [gridActive, setGridActive] = useState({
    table: false,
    grid: true,
  });
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [minRangeValue, setMinRangeValue] = useState(0);
  const [maxRangeValue, setMaxRangeValue] = useState(1000000);
  const debouncedMinValue = useDebounce(minValue, 500);
  const debouncedMaxValue = useDebounce(maxValue, 500);
  const [sortOrder, setSortOrder] = useState('default');
  const [difference, setDifference] = useState(0);
  const t = useTranslations('nav.search');

  useEffect(() => {
    if (products.length === 0) return;
    const prices = products.map(p => p.basePrice);
    setMinRangeValue(Math.min(...prices));
    setMaxRangeValue(Math.max(...prices));
    setMinValue(Math.min(...prices));
    setMaxValue(Math.max(...prices));
    setDifference((Math.max(...prices) - Math.min(...prices)) / 10);
  }, [products]);

  useEffect(() => {
    let filtered = products.filter(
      item => item.basePrice >= debouncedMinValue && item.basePrice <= debouncedMaxValue
    );

    if (sortOrder === 'asc') filtered.sort((a, b) => a.basePrice - b.basePrice);
    else if (sortOrder === 'desc') filtered.sort((a, b) => b.basePrice - a.basePrice);

    setTotalPage(Math.ceil(filtered.length / 12));

    const startIdx = (page - 1) * 12;
    const paginated = filtered.slice(startIdx, startIdx + 12);
    setSortProducts(paginated);
  }, [products, debouncedMinValue, debouncedMaxValue, sortOrder, page]);

  const createQueryString = useCallback((name: string, value: string) => {
    if (name === 'page') {
      setPage(Number(value));
    }
    return value.toString();
  }, []);

  const filterByDefault = () => {
    setSortOrder('default');
  };

  const filterByDecreasingPrices = () => {
    setSortOrder('desc');
  };
  const filterByRisingPrices = () => {
    setSortOrder('asc');
  };
  const filterByPopularity = () => {
    console.log('filterByPopularity');
  };

  return (
    <Container>
      <div className={styles.catalog_container}>
        <div className={styles.searchBar_container}>
          <SearchBar
            createQueryString={createQueryString}
            minValue={minValue}
            maxValue={maxValue}
            setMinValue={setMinValue}
            setMaxValue={setMaxValue}
            setPage={setPage}
            minRange={minRangeValue}
            maxRange={maxRangeValue}
            difference={difference}
          />
        </div>
        <div className={styles.contentPage_container}>
          <Navigation title="Пошук" />
          <div className={styles.input_container}>
            <h1 className={styles.title}>{`${t('searchResults')} "${search}"`}</h1>
            <ul className={styles.input_list}>
              <li className={styles.input_item}>
                <DropdownMenu
                  filterByDefault={filterByDefault}
                  filterByDecreasingPrices={filterByDecreasingPrices}
                  filterByRisingPrices={filterByRisingPrices}
                  filterByPopularity={filterByPopularity}
                />
              </li>
              <ViewCatalogList setGridActive={setGridActive} gridActive={gridActive} />
            </ul>
          </div>
          <div>
            <ul className={`${styles.list} ${gridActive.table ? styles.item_active : ''}`}>
              {sortProducts &&
                sortProducts.map((item: Product) => (
                  <li key={item.productId} className={styles.item}>
                    <CatalogNameList item={item} variant={gridActive.table ? 'big' : 'standart'} />
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <Pagination
              totalPage={totalPage}
              createQueryString={createQueryString}
              currentPage={String(page)}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default FilteredProduct;
