'use client';

import React, { useCallback, useEffect, useRef, useState, useTransition } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Skeleton.module.css';
import Navigation from '../Navigation/Navigation';
import DropdownMenu from '../ForCatalogPage/DropdownMenu/DropdownMenu';
import ViewCatalogList from '../ForCatalogPage/ViewCatalogList/ViewCatalogList';
import { Product } from '@/types';
import Card from '../Card';
import useLocalStorage from '@/utils/favoritesContext';
import useDebounce from '@/hooks/useDebounce';
import Pagination from '../Pagination/Pagination';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import filter from "../../../public/icons/Filter.svg";
import close from '../../../public/icons/Close.svg';
import Loading from '../Loading';
import Image from 'next/image';
import { useLocale } from 'next-intl';


interface SkeletonProductsPageProps {
  products: Product[];
  navigationTitle: string;
  title: string;
  setTotalPage: any;
  page: string;
  setPage: any;
  totalPage: number;
  loading?: boolean
}

const Skeleton = ({
  products,
  navigationTitle,
  title,
  setTotalPage,
  page,
  setPage,
  totalPage,
  loading,
}: SkeletonProductsPageProps) => {
  const t = useTransition
  const locale = useLocale();
  const menuRef = useRef<HTMLDivElement | null>(null);

  const widthWindow = useWindowWidth();

  const [gridActive, setGridActive] = useState({
    table: false,
    grid: true,
  });
  const [sortProducts, setSortProducts] = useState<Product[]>([]);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [minRangeValue, setMinRangeValue] = useState(0);
  const [maxRangeValue, setMaxRangeValue] = useState(1000000);
  const debouncedMinValue = useDebounce(minValue, 500);
  const debouncedMaxValue = useDebounce(maxValue, 500);
  const [sortOrder, setSortOrder] = useState('default');
  const [difference, setDifference] = useState(0);
  const [openMenuFilter, setOpenMenuFilter] = useState(false);
  const [filteredTotal, setFilteredTotal] = useState(0);
  const favStorage = useLocalStorage();

  useEffect(() => {
    setPage(0);
  }, [debouncedMinValue, debouncedMaxValue]);

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

    const total = filtered.length;
    setTotalPage(Math.ceil(total / 12));

    const startIdx = Number(page) * 12;
    const paginated = filtered.slice(startIdx, startIdx + 12);

    setSortProducts(paginated);
    setFilteredTotal(total); // <-- новое состояние для Pagination
  }, [products, debouncedMinValue, debouncedMaxValue, sortOrder, page]);

  const createQueryString = useCallback((name: string, value: string) => {
    if (name === 'page') {
      setPage(Number(value));
    }
    return value.toString();
  }, []);

  const filterByDefault = () => {
    setSortOrder('default');
    setPage('0');
  };

  const filterByDecreasingPrices = () => {
    setSortOrder('desc');
    setPage('0');
  };
  const filterByRisingPrices = () => {
    setSortOrder('asc');
    setPage('0');
  };
  const filterByPopularity = () => {
    setPage('0');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const evtTarget = event.target as HTMLElement;

      const clickedOutside = menuRef.current && !menuRef.current.contains(event.target as Node);

      const clickedOnSkeletonFilter = evtTarget.className.includes('Skeleton_input_filter');

      if (clickedOutside && !clickedOnSkeletonFilter) {
        setOpenMenuFilter(false);
      }
    };

    if (openMenuFilter) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenuFilter]);

  return (
    <div className={styles.skeleton_container}>
      <div
        ref={menuRef}
        className={`${openMenuFilter ? styles.searchBar_container_active : styles.searchBar_container}`}
      >
        {widthWindow < 1179 && (
          <Image
            src={close}
            alt="close"
            width={20}
            height={20}
            className={styles.close}
            onClick={() => setOpenMenuFilter(prev => !prev)}
          />
        )}
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
        <Navigation title={navigationTitle} />
        <div className={styles.input_container}>
          {/* <h1 className={styles.title}>{`${t('searchResults')} "${search}"`}</h1> */}

          <h1 className={styles.title} key="">
            {/* {locale === 'uk' ? subSubCategoryNameUa : subSubCategoryNameEn} */}
            {title}
          </h1>

          <ul className={styles.input_list}>
            {widthWindow < 1179 && (
              <li>
                <div
                  className={styles.input_filter}
                  onClick={() => setOpenMenuFilter(prev => !prev)}
                >
                  <p className={styles.filter_title}>{locale === 'uk' ? 'Фільтр' : 'Filter'} </p>
                  <Image src={filter} alt="filter" width={40} height={40} />
                </div>
              </li>
            )}
            <li className={styles.input_item}>
              <DropdownMenu
                filterByDefault={filterByDefault}
                filterByDecreasingPrices={filterByDecreasingPrices}
                filterByRisingPrices={filterByRisingPrices}
                filterByPopularity={filterByPopularity}
              />
            </li>
            {widthWindow > 743 && (
              <li className={styles.input_view}>
                <ViewCatalogList setGridActive={setGridActive} gridActive={gridActive} />
              </li>
            )}
          </ul>
        </div>
        <div>
          <ul className={`${styles.list} ${gridActive.table ? styles.item_active : ''}`}>
            {loading && <Loading />}
            {sortProducts &&
              sortProducts.map((item: Product) => (
                <li key={item.productId} className={styles.item}>
                  <Card
                    product={item}
                    variant={gridActive.table ? 'big' : 'standart'}
                    favoriteStore={favStorage}
                  />
                </li>
              ))}
          </ul>
        </div>
        <div>
          <Pagination
            totalPage={totalPage}
            createQueryString={createQueryString}
            currentPage={String(page)}
            size={sortProducts.length}
            totalElements={String(filteredTotal)}
          />
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
