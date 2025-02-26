import React from 'react';
import { useTranslations } from 'next-intl';
import Container from '@/components/Container';
import Search from '@/components/Search';
import type { HeaderProps } from '@/types';
import ShoppingCart from './ShoppingCart';
import AuthContainer from './AuthContainer';
import Likes from './Likes';
import CatalogOfGoods from './Catalog';
import styles from './ProductNavBar.module.css';

const ProductNavBar: React.FC<HeaderProps> = ({ setVisibleSubcategory }) => {
  const t = useTranslations('nav');

  return (
    <div className={styles.background}>
      <Container className={styles.container}>
        <div className={styles.productNavBarChildren}>
          <CatalogOfGoods setVisibleSubcategory={setVisibleSubcategory} />
          <Search
            unavailable={t('search.unavailable')}
            showall={t('search.showall')}
            placeholder={t('search.placeholder')}
          />
          <div className={styles.userInteractions}>
            <Likes />
            <ShoppingCart />
            <AuthContainer personalAccount={t('personalAccount')} />
            <div className={styles.overlay} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductNavBar;
