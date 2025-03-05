'use client';

import React, { useState } from 'react';
import type { NextPage } from 'next';

import { HeaderProps } from '@/types/HeaderType';
import type { IVisibleSubcategory } from '@/types';
import NavBar from './NavBar/NavBar';
import Container from '../Container';
import ProductNavBar from './ProductNavBar';
import Subcategory from '../CatalogList/Subcategory/Subcategory';
import styles from './Header.module.css';

const Header: NextPage<HeaderProps> = ({ products }) => {
  const [visibleSubcategory, setVisibleSubcategory] = useState<IVisibleSubcategory[]>([]);
  const [toggleCatalog, setToggleCatalog] = useState<boolean>(false);
  return (
    <>
      <header className={styles.header}>
        <Container>
          <NavBar setToggleCatalog={setToggleCatalog} />
        </Container>
        <ProductNavBar
          products={products}
          setVisibleSubcategory={setVisibleSubcategory}
          setToggleCatalog={setToggleCatalog}
          toggleCatalog={toggleCatalog}
        />
      </header>
      <Container>
        {visibleSubcategory.length > 0 && (
          <Subcategory
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
