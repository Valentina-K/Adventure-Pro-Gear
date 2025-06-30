import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import Grids from '@/../public/icons/Grid.svg';
import CatalogList from '@/components/CatalogList/CatalogList';
import { useTranslations } from 'next-intl';
import burger from '../../../../../public/burger.svg';
import styles from './Catalog.module.css';

interface SearchProps {
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
  const widthWindow = useWindowWidth();
  const ignoreRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const evtTarget = e.target as HTMLElement;
      const className = evtTarget?.className;

      if (typeof className !== 'string') return;
      else if (
        evtTarget.className.includes('CatalogList_item') ||
        evtTarget.className.includes('CatalogList_title') ||
        evtTarget.className.includes('img') ||
        evtTarget.className.includes('catalogList_container') ||
        evtTarget.className.includes('navList_container') ||
        evtTarget.className.includes('css-1a911xt-container') ||
        evtTarget.className.includes('Header_globusIcon__Xi7Ny') ||
        evtTarget.className.includes('css-d7l1ni-option') ||
        evtTarget.className.includes('css-tr4s17-option') ||
        evtTarget.className.includes('css-6ya78u-singleValue') ||
        evtTarget.className.includes('css-ql0jyi') ||
        evtTarget.className.includes('css-15lsz6c-indicatorContainer') ||
        evtTarget.className.includes('css-630tcq-control')
      ) {
        return;
      } else if (ignoreRef.current && !ignoreRef.current.contains(e.target as Node)) {
        return;
      }
      setToggleCatalog(false);
      setVisibleSubcategory([]);
    };

    document.body.addEventListener('click', handleClick);

    return () => {
      document.body.removeEventListener('click', handleClick);
    };
  }, [setToggleCatalog, setVisibleSubcategory]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {widthWindow < 1180 ? (
        <div>
          <Image
            src={burger}
            alt="burger"
            width="70"
            height="70"
            className={styles.burger}
            onClick={e => handlerToggleCatalog(e)}
          />

          {toggleCatalog && (
            <div className={styles.catalogList__container} ref={ignoreRef}>
              <CatalogList setVisibleSubcategory={setVisibleSubcategory} />

              <div className={styles.overlay}> </div>
            </div>
          )}
        </div>
      ) : (
        <div
          className={styles.catalog}
          onClick={e => handlerToggleCatalog(e)}
          aria-hidden="true"
          ref={ignoreRef}
        >
          <Image className={styles.icon} src={Grids} width={22} height={22} alt="grid icon" />
          <p>{t('catalog')}</p>

          {toggleCatalog && (
            <div className={styles.catalogList__container} ref={ignoreRef}>
              <CatalogList setVisibleSubcategory={setVisibleSubcategory} />

              <div className={styles.overlay}> </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CatalogOfGoods;
