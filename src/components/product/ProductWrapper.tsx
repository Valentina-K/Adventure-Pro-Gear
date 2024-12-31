'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Container from '@/components/Container';
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation';
import { Locale } from '@/i18n-config';
import { AvailableColors } from '@/components/AvailableColors';
import Tabs from '@/components/Tabs';
import RatingStars from '@/components/RatingStars';
import ReviewCount from '@/components/ReviewCount';
import QuantitySelector from '@/components/QuantitySelector/QuantitySelector';
import { Product, Review } from '@/interfaces/product';
import { createReview, getReviewsById } from '@/services/axios';
import ProductCardsSlider from '../ProductCardsSlider';
import Reviews from '../Tabs/Reviews';
import styles from './productWrapper.module.css';
// import { addReviewAction } from '@/app/actions';

interface ProductWrapperProp {
  product: Product;
  locale: Locale;
  products: Product[];
  reviews: Review[];
  translation: {
    card: {
      addToFollowing: string;
      sale: string;
      new: string;
      available: string;
      outOfStock: string;
      buy: string;
    };
    tabs: {
      description: string;
      characteristics: string;
      reviews: string;
      important_to_us: string;
      tell_us: string;
      message: string;
      rate: string;
      send: string;
      password: string;
      thanking: string;
      helpful: string;
      usersThink: string;
    };
  };
}

const ProductWrapper: React.FC<ProductWrapperProp> = ({
  product,
  locale,
  products,
  reviews,
  translation,
}) => {
  const [attrIndex, setAttrIndex] = useState(0);
  const [buyQuantity, setBuyQuantity] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);
  const [isThank, setIsThank] = useState(false);
  const { data: session, status } = useSession();

  console.log('Session:', session);
  console.log('Session status:', status);
  console.log(reviews);

  const handleChoiceColor = (index: number) => {
    console.log('from colorChoice', index);
    setAttrIndex(index);
  };

  const handleChangeQuantity = (quantity: number) => {
    console.log('from changeQuantity', quantity);
    setBuyQuantity(quantity);
  };

  const handleBuyClick = () => {};

  const handleFavoriteClick = () => {};

  const handleChangeTab = (index: number) => setTabIndex(index);

  const handleReviewSend = async (data: {}) => {
    if (status === 'loading') {
      console.log('Session is still loading');
      return;
    }
    const token = session?.user?.token.accessToken;
    console.log('access token:', token);
    if (!token) {
      console.error('No access token found');
      return;
    }
    axios
      .post(
        'https://adventure-production-f65e.up.railway.app/api/public/products/reviews',
         { ...data },
          {headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));
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
            characteristics={product.characteristics}
            translation={translation}
            locale={locale}
            onChangeTab={handleChangeTab}
            onReviewSend={handleReviewSend}
            isThank={isThank}
          />
        </div>
        <div className={styles.rightBlock}>
          <section className={styles.mainInfo}>
            <div className={styles.productHeader}>
              <h1 className={styles.titleProduct}>
                {locale === 'uk-UA' ? product.productNameUa : product.productNameEn}
              </h1>
              <div className={styles.productRating}>
                <RatingStars averageRating={product.averageRating} />
                <ReviewCount reviewCount={product.reviewCount} />
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
              <ProductCardsSlider
                products={products}
                locale={locale}
                translation={translation}
                onBuyClick={handleBuyClick}
                onFavoriteClick={handleFavoriteClick}
                title="З цим купують"
              />
            </div>
            <div className={styles.relatedProducts}>
              <ProductCardsSlider
                products={products}
                locale={locale}
                translation={translation}
                onBuyClick={handleBuyClick}
                onFavoriteClick={handleFavoriteClick}
                title="Схожі товари"
              />
            </div>
          </section>
        </div>
      </div>
      <section>
        {tabIndex === 2 && reviews.length > 0 && (
          <Reviews
            reviews={reviews}
            productName={locale === 'uk-UA' ? product.productNameUa : product.productNameEn}
            reviewTitle={translation.tabs.reviews}
            helpful={translation.tabs.helpful}
            usersThink={translation.tabs.usersThink}
          />
        )}
      </section>
      <div className={styles.prevViewed}>
        <h2>Товари, які ви переглянули</h2>
      </div>
    </Container>
  );
};

export default ProductWrapper;
