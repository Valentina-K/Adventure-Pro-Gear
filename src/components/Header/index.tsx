'use client';

import React, { useState } from 'react';
import type { NextPage } from 'next';

import { HeaderProps } from '@/types/HeaderType';
import type { IVisibleSubcategory } from '@/types';
import Subcategory from '../CatalogList/Subcategory/Subcategory';
import NavBar from './NavBar/NavBar';
import Container from '../Container';
import ProductNavBar from './ProductNavBar';
import styles from './Header.module.css';

const Header: NextPage<HeaderProps> = ({ products }) => {
  const [visibleSubcategory, setVisibleSubcategory] = useState<IVisibleSubcategory[]>([]);
  const [toggleCatalog, setToggleCatalog] = useState<boolean>(false);
  const [visibleCategory, setVisibleCategory] = useState(true);

  return (
    <>
      <header className={styles.header}>
        <Container>
          <NavBar />
        </Container>
        <ProductNavBar
          products={products}
          setVisibleSubcategory={setVisibleSubcategory}
          setToggleCatalog={setToggleCatalog}
          toggleCatalog={toggleCatalog}
          visibleCategory={visibleCategory}
          setVisibleCategory={setVisibleCategory}
        />
      </header>
      <Container>
        {visibleSubcategory.length > 0 && (
          <Subcategory
            visibleSubcategory={visibleSubcategory}
            setToggleCatalog={setToggleCatalog}
            setVisibleSubcategory={setVisibleSubcategory}
            setVisibleCategory={setVisibleCategory}
          />
        )}
      </Container>
    </>
  );
};

export default Header;
