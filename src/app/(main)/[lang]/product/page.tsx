import React from 'react';
import Container from '@/components/Container';
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation';
import styles from './product.module.css';

function Product() {
  return (
    <Container>
      <div className={styles.breadcrumbWrapper}>
        <BreadcrumbNavigation locale="uk-UA" />
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.leftBlock}>leftBlock</div>
        <div className={styles.rightBlock}>
          <section className={styles.mainInfo}>
            <h1>Title</h1>
          </section>
          <section className={styles.additionalOffers}>
            <div className={styles.withThisBuy}>
              <h2>З цим купують</h2>
            </div>
            <div className={styles.relatedProducts}>
              <h2>Схожі товари</h2>
            </div>
          </section>
        </div>
      </div>
      <div className={styles.prevViewed}>
        <h2>Товари, які ви переглянули</h2>
      </div>
    </Container>
  );
}

export default Product;
