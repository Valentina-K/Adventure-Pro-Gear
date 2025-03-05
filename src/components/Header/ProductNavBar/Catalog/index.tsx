import React, { useState } from 'react';
import { Locale } from '@/i18n-config';
import Image from 'next/image';
import Grids from '@/../public/icons/Grid.svg';
import CatalogList from '@/components/CatalogList/CatalogList';
import styles from './Catalog.module.css';
import { useTranslations } from 'next-intl';

interface SearchProps {
  locale?: Locale;
  catalog?: string;
  setVisibleSubcategory: any;
  setToggleCatalog: (str: any) => void;
  toggleCatalog?: boolean;
}

const CatalogOfGoods: React.FC<SearchProps> = ({
  catalog,
  setVisibleSubcategory,
  setToggleCatalog,
  toggleCatalog,
}) => {
  const t = useTranslations('nav');

  const handlerToggleCatalog = (e: React.MouseEvent<HTMLDivElement>) => {
    const evtTarget = e.target as HTMLElement;
    if (
      evtTarget.className.includes('CatalogList_item') ||
      evtTarget.className.includes('CatalogList_title') ||
      evtTarget.className.includes('img')
    ) {
      return;
    }

    setToggleCatalog((prev: any) => !prev);
    setVisibleSubcategory([]);
  };

  return (
    <div className={styles.catalog} onClick={e => handlerToggleCatalog(e)} aria-hidden="true">
      <Image className={styles.icon} src={Grids} width={22} height={22} alt="grid icon" />
      <p>{t('catalog')}</p>

      {toggleCatalog && (
        <div className={styles.catalogList__container}>
          <CatalogList setVisibleSubcategory={setVisibleSubcategory} />

          <div className={styles.overlay}> </div>
        </div>
      )}
    </div>
  );
};

export default CatalogOfGoods;
