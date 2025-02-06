'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Container from '@/components/Container';
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation';
import { Locale } from '@/i18n-config';
import { AvailableColors } from '@/components/AvailableColors';
import Tabs from '@/components/Tabs';
import RatingStars from '@/components/RatingStars';
import ReviewCount from '@/components/ReviewCount';
import QuantitySelector from '@/components/QuantitySelector/QuantitySelector';
import { Product, Review } from '@/interfaces/product';
import { getAllReviewsByProductId } from '@/clientServices/clientAxios';
import Payments from '@/constants/payments';
import Comercial from '@/../public/icons/Comercial.svg';
import ProductCardsSlider from '../ProductCardsSlider';
import Reviews from '../Tabs/Reviews';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import Navigation from '../Navigation/Navigation';
import Payment from '../Payment';
import styles from './productWrapper.module.css';
import Button from '../Button';
import { useProduct } from '@/contexts/ProductContext';

interface ProductWrapperProp {
  /* product: Product; */
  locale: Locale;
  /* products: Product[]; */
  reviews: Review[];
  translation: {
    page: {
      code: string;
      manufacturer: string;
      buyWithThis: string;
      similarProducts: string;
      previouslyViewed: string;
      paymentMethod: string;
      availableOptions: string;
      color: string;
      clear: string;
    };
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
  /* product, */
  locale,
  /* products, */
  reviews,
  translation,
}) => {
  const { product, products } = useProduct();
  const [attrIndex, setAttrIndex] = useState(0);
  const [buyQuantity, setBuyQuantity] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);
  const [payment, setPayment] = useState<Payments>(Payments.VISA);
  const [productReviews, setReviews] = useState<Review[]>(reviews);
  const isAvailable = product.attributes[attrIndex].quantity > 0;
  const cart = {
    productId: product.productId,
    quantity: 0,
    payment,
    color: product.attributes[attrIndex].color
  };
  const handleChoiceColor = (index: number) => {
    console.log('from colorChoice', index);
    setAttrIndex(index);
  };

  const handleChangeQuantity = (quantity: number) => {
    console.log('from changeQuantity', quantity);
    setBuyQuantity(quantity);
  };

  const handleBuyClick = () => {
    cart.productId = product.productId;
    cart.quantity = buyQuantity;
    cart.payment = payment;
    cart.color = product.attributes[attrIndex].color;
    console.log('from buyClick: ', cart);
  };

  const onChoisePayment = (name: Payments) => {
    setPayment(name);
    console.log('from choise payment: ', name);
  };

  const handleFavoriteClick = () => {};

  const handleChangeTab = (index: number) => setTabIndex(index);

  const handleReviewSend = async (isSend: boolean) => {
    if (isSend) {
      const reviewsPr = await getAllReviewsByProductId(product.productId);
      setReviews(reviewsPr?.data);
    }
  };

  const colorItems = product.attributes.map(attr => ({ color: attr.color, url: attr.pictureUrl }));

  return (
    <Container>
      <div className={styles.breadcrumbWrapper}>
        {/* <BreadcrumbNavigation locale={locale} /> */}
        <Navigation
          productName={locale === 'uk-UA' ? product.productNameUa : product.productNameEn}
        />
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.leftBlock}>
          <ImageCarousel contents={product.contents} />
          <Tabs
            description={locale === 'uk-UA' ? product.descriptionUa : product.descriptionEn}
            characteristics={product.characteristics}
            translation={translation}
            locale={locale}
            onChangeTab={handleChangeTab}
            onReviewSend={handleReviewSend}
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
                <p className={styles.price}>
                  {product.basePrice}
                  ₴
                </p>
                <p className={styles.available}>
                  {isAvailable ? translation.card.available : translation.card.outOfStock}
                </p>
              </div>
              <div className={styles.specialInfo}>
                <p>
                  {translation.page.code}
                  :
                  <span>{product.productId}</span>
                </p>
                <p>
                  {translation.page.manufacturer}
                  :
                  <span>Terra Incognita</span>
                </p>
              </div>
            </div>
            <AvailableColors
              title={translation.page.availableOptions}
              h4={translation.page.color}
              clear={translation.page.clear}
              onColorChoice={handleChoiceColor}
              imageArray={colorItems}
            />
            <div className={styles.buySection}>
              <QuantitySelector
                quantity={product.attributes[attrIndex].quantity}
                onChange={quantity => handleChangeQuantity(quantity)}
              />
              <Button
                className={styles.buyButton}
                text={translation.card.buy}
                disabled={!isAvailable}
                icon={<Image src={Comercial} width={20} height={20} alt="Comercial" />}
                onClick={handleBuyClick}
              />

            </div>
            <Payment title={translation.page.paymentMethod} onClick={onChoisePayment} />
          </section>
          <section className={styles.additionalOffers}>
            <div className={styles.withThisBuy}>
              <ProductCardsSlider
                products={products}
                locale={locale}
                translation={translation}
                onBuyClick={handleBuyClick}
                onFavoriteClick={handleFavoriteClick}
                title={translation.page.buyWithThis}
              />
            </div>
            <div className={styles.relatedProducts}>
              <ProductCardsSlider
                products={products}
                locale={locale}
                translation={translation}
                onBuyClick={handleBuyClick}
                onFavoriteClick={handleFavoriteClick}
                title={translation.page.similarProducts}
              />
            </div>
          </section>
        </div>
      </div>
      <section>
        {tabIndex === 2 && productReviews.length > 0 && (
          <Reviews
            reviews={productReviews}
            productName={locale === 'uk-UA' ? product.productNameUa : product.productNameEn}
            reviewTitle={translation.tabs.reviews}
            helpful={translation.tabs.helpful}
            usersThink={translation.tabs.usersThink}
          />
        )}
      </section>
      <div className={styles.prevViewed}>
        <h2>{translation.page.previouslyViewed}</h2>
      </div>
    </Container>
  );
};

export default ProductWrapper;
