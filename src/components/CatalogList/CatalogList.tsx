/* eslint-disable no-confusing-arrow */
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import { getCategory } from '@/clientServices/clientAxios';
import arrows from '../../../public/icons/Arrows.svg';
import styles from './CatalogList.module.css';
import { catalogImg } from './catalogImgData';
import Container from '../Container';
import Loading from '../Loading';
import NavList from '../Header/NavBar/NavList';

interface ICatalogListProps {
  // locale?: Locale;
  setVisibleSubcategory: (arr: any) => void;
  setVisibleCategory: any;
}

interface ICategoryApi {
  id: number;
  sectionCaptionUa: string;
  sectionCaptionEn: string;
  categoryNameEn: string;
  subcategories: Object[];
}

const CatalogList: React.FC<ICatalogListProps> = ({
  setVisibleSubcategory,
  setVisibleCategory,
}) => {
  const locale = useLocale();
  const widthWindow = useWindowWidth();
  const [category, setCategory] = useState<ICategoryApi[]>([]);

  useEffect(() => {
    const fetchData = (async () => {
      const categories = await getCategory();
      setCategory(categories);
    })();
  }, [setVisibleCategory]);

  const chooseSubcategory = (subcategoyId: number) => {
    const filterCategory = category.filter(({ id }) => subcategoyId === id);

    if (widthWindow !== null && widthWindow <= 743) {
      setVisibleCategory((prev: any) => !prev);
    }

    setVisibleSubcategory(filterCategory);
  };

  return (
    <div className={styles.container}>
      <Container>
        {category?.length > 0 ? (
          <div className={styles.catalogList_container}>
            <ul>
              {category?.map(({ id, sectionCaptionUa, sectionCaptionEn }) => (
                <li
                  key={id}
                  className={styles.item}
                  onClick={widthWindow !== null && widthWindow <= 743 ? () => chooseSubcategory(id) : undefined}
                  onMouseMove={widthWindow !== null && widthWindow >= 744 ? () => chooseSubcategory(id) : undefined}
                  // onClick={() => chooseSubcategory(id)}
                  // onMouseMove={() => chooseSubcategory(id)}
                  aria-hidden="true"
                >
                  <div className={styles.item_container}>
                    <div className={styles.item_title_container}>
                      {catalogImg?.map(({ id: catalogImgId, img }) =>
                        catalogImgId === id ? (
                          <Image
                            src={img}
                            alt="img"
                            width={24}
                            height={24}
                            key={id}
                            className={styles.img}
                          />
                        ) : (
                          ' '
                        ))}
                      <p className={styles.title}>
                        {locale === 'uk' ? sectionCaptionUa : sectionCaptionEn}
                      </p>
                    </div>

                    <Image
                      src={arrows}
                      alt="arrows"
                      width={20}
                      height={20}
                      className={styles.img}
                    />
                  </div>
                </li>
              ))}
            </ul>
            {widthWindow !== null && widthWindow < 1179 && (
              <div className={`${styles.navList_container} ${styles.mobail_lang}`}>
                <NavList />
              </div>
            )}
          </div>
        ) : (
          <div className={styles.spinner_container}>
            <Loading />
          </div>
        )}
      </Container>
    </div>
  );
};

export default CatalogList;
