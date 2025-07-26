'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { getProductsFilter, getSubcategoryId } from '@/clientServices/clientAxios';
import { useGetProductsQuery } from '@/redux/features/apiSlice';
import Container from '@/components/Container';
import Navigation from '@/components/Navigation/Navigation';
import SearchBar from '@/components/SearchBar/SearchBar';
import Pagination from '@/components/Pagination/Pagination';
import { Product } from '@/types/product';
import useDebounce from '@/hooks/useDebounce';
import ViewCatalogList from '@/components/ForCatalogPage/ViewCatalogList/ViewCatalogList';
import DropdownMenu from '@/components/ForCatalogPage/DropdownMenu/DropdownMenu';
import useLocalStorage from '@/hooks/useLocalStorage';
import Card from '@/components/Card';
import styles from './CatalogName.module.css';

interface ICategoriesApi {
  id: number;
  subSubCategoryNameEn: string;
  subSubCategoryNameUa: string;
  subcategories: [];
}

// eslint-disable-next-line @next/next/no-async-client-component
const CatalogId = ({
  params,
}: {
  params: {
    catalogId: string;
  };
}) => {
  const locale = useLocale();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const paramsGetPage = searchParams.get('page') || '1';

  const { data, isLoading, error } = useGetProductsQuery();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const current = new URLSearchParams(Array.from(searchParams.entries()));

  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100000);
  const debouncedMinValue = useDebounce(minValue, 500);
  const debouncedMaxValue = useDebounce(maxValue, 500);
  const [subcategory, setSubcategory] = useState<ICategoriesApi[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [totalElements, setTotalElements] = useState('');
  const [page, setPage] = useState(paramsGetPage);
  const [gridActive, setGridActive] = useState({
    table: false,
    grid: true,
  });
  const favStorage = useLocalStorage('favorites');

  useEffect(() => {
    const fetchData = (async () => {
      const productsAll = await getProductsFilter({
        page: `${page}`,
        priceFrom: `${debouncedMinValue}`,
        priceTo: `${debouncedMaxValue}`,
        subcategoryId: params.catalogId,
      });

      setTotalElements(productsAll?.data?.totalElements);
      const pages = productsAll?.data?.totalPages;

      setTotalPage(pages);

      setProducts(productsAll?.data?.content);
    })();
  }, [debouncedMaxValue, debouncedMinValue, page, params.catalogId, searchParams]);

  useEffect(() => {
    const fetchData = (async () => {
      // eslint-disable-next-line no-shadow
      const data = await getSubcategoryId(params.catalogId);
      setSubcategory(data?.data);
    })();
  }, [params.catalogId]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const paramsCreate = new URLSearchParams(searchParams.toString());
      paramsCreate.set(name, value);

      if (name === 'priceTo' || name === 'priceFrom') {
        setPage('0');
        paramsCreate.set('page', '0');
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
    console.log('filterByDecreasingPrices');
    // const sorted = products?.sort((a, b) => b.basePrice - a.basePrice);
    // console.log(sorted);
  };

  const filterByRisingPrices = () => {
    console.log('filterByRisingPrices');
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
            // =====price======
            minValue={minValue}
            maxValue={maxValue}
            setMinValue={setMinValue}
            setMaxValue={setMaxValue}
            setPage={setPage}
          />
        </div>
        <div className={styles.contentPage_container}>
          <Navigation navigationPage="каталог" />
          <div className={styles.input_container}>
            {subcategory?.map(({ subSubCategoryNameEn, subSubCategoryNameUa }) => (
              // eslint-disable-next-line react/jsx-key
              <h1 className={styles.title} key={subSubCategoryNameEn}>
                {locale === 'uk' ? subSubCategoryNameUa : subSubCategoryNameEn}
              </h1>
            ))}
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
              {products &&
                products?.map((item: Product) => (
                  <li key={item?.productId} className={styles.item}>
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
              currentPage={page}
              totalElements={totalElements}
              size={products.length}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CatalogId;
