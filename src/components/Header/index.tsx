'use client';

import React, { useState } from 'react';
import { NextPage } from 'next';
import { IVisibleSubcategory } from '@/types';
import { HeaderProps } from '../../types/HeaderType';
import NavBar from './NavBar/NavBar';
import Container from '../Container';
import ProductNavBar from './ProductNavBar';
import styles from './Header.module.css';
import Subcategory from '../CatalogList/Subcategory/Subcategory';

const Header: NextPage<HeaderProps> = ({ translation, locale, products }) => {
  const [visibleSubcategory, setVisibleSubcategory] = useState<IVisibleSubcategory[]>([]);
  const [toggleCatalog, setToggleCatalog] = useState<boolean>(false);
  return (
    <>
      <header className={styles.header}>
        <Container>
          <NavBar translation={translation} locale={locale} setToggleCatalog={setToggleCatalog} />
        </Container>
        <ProductNavBar
          translation={translation}
          locale={locale}
          products={products}
          setVisibleSubcategory={setVisibleSubcategory}
          setToggleCatalog={setToggleCatalog}
          toggleCatalog={toggleCatalog}
        />
      </header>
      <Container>
        {visibleSubcategory.length > 0 && (
          <Subcategory
            locale={locale}
            visibleSubcategory={visibleSubcategory}
            setToggleCatalog={setToggleCatalog}
            setVisibleSubcategory={setVisibleSubcategory}
          />
        )}
      </Container>
    </>
  );
};

export default Header;
