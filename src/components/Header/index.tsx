'use client';

import React, { useState } from 'react';
import { NextPage } from 'next';

import { HeaderProps } from '@/types/HeaderType';
import type { IVisibleSubcategory } from '@/types';
import NavBar from './NavBar/NavBar';
import Container from '../Container';
import ProductNavBar from './ProductNavBar';
import styles from './Header.module.css';
import Subcategory from '../CatalogList/Subcategory/Subcategory';

const Header: NextPage<HeaderProps> = ({ translation, locale, products }) => {
  const [visibleSubcategory, setVisibleSubcategory] = useState<IVisibleSubcategory[]>([]);

  return (
    <>
      <header className={styles.header}>
        <Container>
          <NavBar />
        </Container>
        <ProductNavBar
          translation={translation}
          locale={locale}
          products={products}
          setVisibleSubcategory={setVisibleSubcategory}
        />
      </header>
      <Container>
        {visibleSubcategory.length > 0 && <Subcategory visibleSubcategory={visibleSubcategory} />}
      </Container>
    </>
  );
};

export default Header;
