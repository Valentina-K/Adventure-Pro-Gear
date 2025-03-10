'use client';

import React, { useState } from 'react';
import type { NextPage } from 'next';

import { HeaderProps } from '@/types/HeaderType';
import type { IVisibleSubcategory } from '@/types';
import NavBar from './NavBar/NavBar';
import Container from '../Container';
import ProductNavBar from './ProductNavBar';
import styles from './Header.module.css';
import Subcategory from '../CatalogList/Subcategory/Subcategory';

const Header: NextPage<HeaderProps> = ({ products }) => {
  const [visibleSubcategory, setVisibleSubcategory] = useState<IVisibleSubcategory[]>([]);

  return (
    <>
      <header className={styles.header}>
        <Container>
          <NavBar />
        </Container>
        <ProductNavBar
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
