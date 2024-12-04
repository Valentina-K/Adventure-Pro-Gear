'use client';

import React, { useEffect, useState } from 'react';
import Container from '@/components/Container';
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation';
import { Locale } from '@/i18n-config';
import { AvailableColors } from '@/components/AvailableColors';
import Tabs from '@/components/Tabs';
import RatingStars from '@/components/RatingStars';
import ReviewCount from '@/components/ReviewCount';
import QuantitySelector from '@/components/QuantitySelector/QuantitySelector';
import styles from './productWrapper.module.css';

interface Attribute {
  id: number;
  productId: number;
  size: string;
  color: string;
  additional: string;
  priceDeviation: number;
  quantity: number;
  label: string;
  pictureUrl: string;
  selfLink: string;
}

interface Content {
  productId: number;
  source: string;
  selfLink: string;
}

interface Product {
  productId: number;
  productNameUa: string;
  productNameEn: string;
  descriptionUa: string;
  descriptionEn: string;
  basePrice: number;
  gender: 'MALE' | 'FEMALE' | 'UNISEX';
  category: {
    categoryNameUa: string;
    categoryNameEn: string;
    sectionId: number;
    parentCategoryId: number;
    subcategories: [];
    selfLink: string;
  };
  attributes: Attribute[];
  contents: Content[];
  selfLink: string;
}

interface ProductWrapperProp {
  product: Product;
  locale: Locale;
}

const ProductWrapper: React.FC<ProductWrapperProp> = ({ product, locale }) => {
  const [attrIndex, setAttrIndex] = useState(0);
  const [buyQuantity, setBuyQuantity] = useState(0);
  useEffect(() => {}, []);
  const handleChoiceColor = (index: number) => {
    console.log('from colorChoice', index);
    setAttrIndex(index);
  };

  const handleChangeQuantity = (quantity: number) => {
    console.log('from changeQuantity', quantity);
    setBuyQuantity(quantity);
  };

  const colorItems = product.attributes.map(attr => {
    return { color: attr.color, url: attr.pictureUrl };
  });

  return (
    <Container>
      <div className={styles.breadcrumbWrapper}>
        <BreadcrumbNavigation locale={locale} />
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.leftBlock}>
          <div>ImageCarousel</div>
          <Tabs
            description={locale === 'uk-UA' ? product.descriptionUa : product.descriptionEn}
            attributes={product.attributes[0]}
          />
        </div>
        <div className={styles.rightBlock}>
          <section className={styles.mainInfo}>
            <div className={styles.productHeader}>
              <h1 className={styles.titleProduct}>
                {locale === 'uk-UA' ? product.productNameUa : product.productNameEn}
              </h1>
              <div className={styles.productRating}>
                <RatingStars averageRating={4} />
                <ReviewCount reviewCount={42} />
              </div>
              <div className={styles.priceBlock}>
                <p className={styles.price}>{product.basePrice}₴</p>
                <p className={styles.available}>В наявності</p>
              </div>
              <div className={styles.specialInfo}>
                <p>
                  Код товару: <span>{product.productId}</span>
                </p>
                <p>
                  Виробник: <span>Terra Incognita</span>
                </p>
              </div>
            </div>
            <AvailableColors onColorChoice={handleChoiceColor} imageArray={colorItems} />
            <QuantitySelector
              quantity={product.attributes[attrIndex].quantity}
              onChange={quantity => handleChangeQuantity(quantity)}
            />
            <div className={styles.payBlock}>
              <h3>Спосіб оплати</h3>
            </div>
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
};

export default ProductWrapper;
