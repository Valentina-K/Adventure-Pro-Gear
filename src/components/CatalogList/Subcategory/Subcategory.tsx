import React from 'react';
import { Locale } from '@/i18n-config';
import { IVisibleSubcategory } from '@/types/IVisibleSubcategory';
import style from './Subcategory.module.css';

interface ISubcategoryProps {
  locale: Locale;
  visibleSubcategory: IVisibleSubcategory[];
}

// eslint-disable-next-line arrow-body-style
const Subcategory: React.FC<ISubcategoryProps> = ({ locale, visibleSubcategory }) => {
  return (
    <div className={style.container}>
      <ul className={style.list}>
        {visibleSubcategory?.map(({ categories }) =>
          categories?.map(
            ({
              id,
              categoryNameUa,
              categoryNameEn,
              subcategories,
            }) => (
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
                      <li key={id}>
                        <p className={style.list_descr}>
                          {locale === 'uk-UA' ? subcategoryNameUa : subcategoryNameEn}
                        </p>
                      </li>
                    )
                  )}
                </ul>
              </li>
            )
          ))}
      </ul>
    </div>
  );
};

export default Subcategory;
