'use client';

import Container from '@/components/Container';
import React, { useCallback, useEffect, useState } from 'react';
import Navigation from '@/components/Navigation/Navigation';
import {selectFilteredProducts} from '@/redux/products/selectors';
import { useSelector } from 'react-redux';
import CatalogNameList from '@/components/ForCatalogPage/CatalogNameList/CatalogNameList';
import Pagination from '@/components/Pagination/Pagination';
import ViewCatalogList from '@/components/ForCatalogPage/ViewCatalogList/ViewCatalogList';
import DropdownMenu from '@/components/ForCatalogPage/DropdownMenu/DropdownMenu';
import SearchBar from '@/components/SearchBar/SearchBar';
import { useLocale } from 'next-intl';
import { Product } from '@/types';
import { useRouter, usePathname } from '@/i18n/routing';
import styles from './styles.module.css';

interface FilteredProductsPageProps {
  searchParams: { search: string };
}

function FilteredProduct({ searchParams }: FilteredProductsPageProps) {
  const { search } = searchParams;
  const paramsGetPage = new URLSearchParams(searchParams.search).get('page') || '1';
  const locale = useLocale();
  const products = useSelector(selectFilteredProducts);
  const [sortProducts, setSortProducts] = useState<Product[]>(products);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [totalElements, setTotalElements] = useState(products.length);
  const [page, setPage] = useState(paramsGetPage);
  const [gridActive, setGridActive] = useState({
    table: false,
    grid: true,
  });
  const current = React.useMemo(() => new URLSearchParams(search), [search]);
  const router = useRouter();
  const pathname = usePathname();
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100000);
  const [sortOrder, setSortOrder] = useState('default');

  useEffect(() => {
    setTotalElements(products.length);
    let sorted = [...products];

    if (sortOrder === 'asc') {
      setSortProducts(sorted.sort((a, b) => a.basePrice - b.basePrice));
    } else if (sortOrder === 'desc') {
      setSortProducts(sorted.sort((a, b) => b.basePrice - a.basePrice));
    }
  }, [products, sortOrder]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const paramsCreate = new URLSearchParams(searchParams.toString());
      paramsCreate.set(name, value);

      if (name === 'priceTo' || name === 'priceFrom') {
        setPage('1');
        paramsCreate.set('page', '1');
      }

      if (name === 'page') {
        setPage(value);
      }

      // eslint-disable-next-line no-shadow
      const search = current.toString();
      const query = search ? `${paramsCreate}` : '';
      router.push(`${pathname}?${query}`);

      return value.toString();
    },
    [current, pathname, router, searchParams]
  );

  const filterByDefault = () => {
    console.log('filterByDefault');
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

  // const filteredProducts = useSelector(selectFilteredProducts);
  return (
    <Container>
      <div className={styles.catalog_container}>
        <div className={styles.searchBar_container}>
          <SearchBar
            createQueryString={createQueryString}
            // =====price======
            minValue={minValue}
            maxValue={maxValue}
            setMinValue={setMinValue}
            setMaxValue={setMaxValue}
            setPage={setPage}
          />
        </div>
        <div className={styles.contentPage_container}>
          <Navigation title="Пошук" />
          <div className={styles.input_container}>
            {/* {subcategory?.map(({ subSubCategoryNameEn, subSubCategoryNameUa }) => (
              // eslint-disable-next-line react/jsx-key
              <h1 className={styles.title} key={subSubCategoryNameEn}>
                {locale === 'uk' ? subSubCategoryNameUa : subSubCategoryNameEn}
              </h1>
            ))} */}
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
                sortProducts?.map((item: Product) => (
                  <li key={item?.productId} className={styles.item}>
                    <CatalogNameList
                      item={item}
                      variant={gridActive.table ? 'big' : 'standart'}
                    />
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <Pagination
              totalPage={totalPage}
              createQueryString={createQueryString}
              currentPage={page}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default FilteredProduct;
