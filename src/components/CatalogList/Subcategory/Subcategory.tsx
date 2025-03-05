/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Link from 'next/link';
import { Locale } from '@/i18n-config';
import { IVisibleSubcategory } from '@/types/IVisibleSubcategory';
import style from './Subcategory.module.css';

interface ISubcategoryProps {
  locale: Locale;
  visibleSubcategory: IVisibleSubcategory[];
  setVisibleSubcategory: any;
  setToggleCatalog: (str: any) => void;
}

// eslint-disable-next-line arrow-body-style
const Subcategory: React.FC<ISubcategoryProps> = ({
  locale,
  visibleSubcategory,
  setToggleCatalog,
  setVisibleSubcategory,
}) => {
  const handlerToggleCatalog = () => {
    setToggleCatalog((prev: any) => !prev);
    setVisibleSubcategory([]);
  };
  return (
    <div className={style.container}>
      <ul className={style.list}>
        {visibleSubcategory?.map(({ categories }) =>
          categories?.map(({ id, categoryNameUa, categoryNameEn, subcategories }) => (
            <li key={id} className={style.list_item}>
              <h2 className={style.list_item_title}>
                {locale === 'uk-UA' ? categoryNameUa : categoryNameEn}
              </h2>
              <ul>
                {subcategories?.map(
                  ({
                    // eslint-disable-next-line no-shadow
                    id,
                    subcategoryNameUa,
                    subcategoryNameEn,
                  }) => (
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                    <li
                      // eslint-disable-next-line react/jsx-indent-props
                      key={id}
                      onClick={handlerToggleCatalog}
                    >
                      <Link href={`/catalog/${id}?page=1`}>
                        <p className={style.list_descr}>
                          {locale === 'uk-UA' ? subcategoryNameUa : subcategoryNameEn}
                        </p>
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </li>
          )))}
      </ul>
    </div>
  );
};

export default Subcategory;
