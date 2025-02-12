/* eslint-disable no-confusing-arrow */
import React, { useEffect, useState } from 'react';
import { getCategory } from '@/clientServices/clientAxios';
import Spinner from '@/app/(main)/[lang]/loading';
import Image from 'next/image';
import { Locale } from '@/i18n-config';
import arrows from '../../../public/icons/Arrows.svg';
import style from './CatalogList.module.css';
import { catalogImg } from './catalogImgData';
import Container from '../Container';

interface ICatalogListProps {
  locale: Locale;
  setVisibleSubcategory: (arr: any) => void;
}

interface ICategoryApi {
  id: number;
  sectionCaptionUa: string;
  sectionCaptionEn: string;
  categoryNameEn: string;
  subcategories: Object[];
}
// eslint-disable-next-line arrow-body-style
const CatalogList: React.FC<ICatalogListProps> = ({ locale, setVisibleSubcategory }) => {
  const [category, setCategory] = useState<ICategoryApi[]>([]);

  useEffect(() => {
    const fetchData = (async () => {
      const categories = await getCategory();
      setCategory(categories);
    })();
  }, []);

  const chooseSubcategory = (subcategoyId: number) => {
    const filterCategory = category.filter(({ id }) => subcategoyId === id);
    setVisibleSubcategory(filterCategory);
  };

  return (
    <div className={style.container}>
      <Container>
        {category?.length > 0 ? (
          <div className={style.catalogList_container}>
            <ul>
              {category?.map(({ id, sectionCaptionUa, sectionCaptionEn }) => (
                <li
                  key={id}
                  className={style.item}
                  // onClick={() => chooseSubcategory(id)}
                  onMouseMove={() => chooseSubcategory(id)}
                  aria-hidden="true"
                >
                  <div className={style.item_container}>
                    <div className={style.item_title_container}>
                      {catalogImg?.map(({ id: catalogImgId, img }) =>
                        catalogImgId === id ? (
                          <Image
                            src={img}
                            alt="img"
                            width={24}
                            height={24}
                            key={id}
                            className={style.img}
                          />
                        ) : (
                          ' '
                        ))}
                      <p className={style.title}>
                        {locale === 'uk-UA' ? sectionCaptionUa : sectionCaptionEn}
                      </p>
                    </div>

                    <Image src={arrows} alt="arrows" width={20} height={20} className={style.img} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className={style.spinner_container}>
            <Spinner />
          </div>
        )}
      </Container>
    </div>
  );
};

export default CatalogList;
