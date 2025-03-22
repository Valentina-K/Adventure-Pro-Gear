'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllProducts, selectProductById } from '@/redux/features/selectors';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import Container from '@/components/Container';
import { AvailableColors } from '@/components/AvailableColors';
import Tabs from '@/components/Tabs';
import RatingStars from '@/components/RatingStars';
import ReviewCount from '@/components/ReviewCount';
import QuantitySelector from '@/components/QuantitySelector/QuantitySelector';
import { Review } from '@/types/product';
import { getAllReviewsByProductId } from '@/clientServices/clientAxios';
import { setReviewedProducts, setShoppingCart } from '@/redux/products/slice';
import Payments from '@/constants/payments';
import Comercial from '@/../public/icons/Comercial.svg';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import ProductCardsSlider from '../ProductCardsSlider';
import Reviews from '../Tabs/Reviews';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import Navigation from '../Navigation/Navigation';
import Payment from '../Payment';
import styles from './productWrapper.module.css';
import Button from '../Button';
import ReviewedGoods from '../ReviewedGoods';

interface ProductWrapperProp {
  reviews: Review[];
  productId: number;
}

const ProductWrapper: React.FC<ProductWrapperProp> = ({ reviews, productId }) => {
  const dispatch = useAppDispatch();
  const locale = useLocale();
  const t = useTranslations('product');
  const products = useSelector(selectAllProducts);
  const product = useSelector(selectProductById(Number(productId)));
  // console.log(product, productId);
  const [attrIndex, setAttrIndex] = useState(0);
  const [buyQuantity, setBuyQuantity] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);
  const [payment, setPayment] = useState<Payments>(Payments.VISA);
  const [productReviews, setReviews] = useState<Review[]>(reviews);
  useEffect(() => {
    if (product) {
      dispatch(setReviewedProducts(product));
    }
  }, [product, dispatch]);

  if (!product) return <div>Product not found</div>;
  const isAvailable = product.attributes[attrIndex].quantity > 0;
  const newPrice =
    product.basePrice - product.basePrice * (product.attributes[0].priceDeviation / 100);

  const handleChoiceColor = (index: number) => {
    // console.log('from colorChoice', index);
    setAttrIndex(index);
  };

  const handleChangeQuantity = (quantity: number) => {
    // console.log('from changeQuantity', quantity);
    setBuyQuantity(quantity);
  };

  const handleBuyClick = () => {
    const shoppingCart = {
      productId: product.productId,
      quantity: buyQuantity,
      payment,
      color: product.attributes[attrIndex].color,
      size: product.attributes[attrIndex].size,
    };
    dispatch(setShoppingCart(shoppingCart));
  };

  const onChoisePayment = (name: Payments) => {
    setPayment(name);
    // console.log('from choise payment: ', name);
  };

  const handleFavoriteClick = () => {};

  const handleChangeTab = (index: number) => setTabIndex(index);

  const handleReviewSend = async (isSend: boolean) => {
    if (isSend) {
      const reviewsPr = await getAllReviewsByProductId(product.productId);
      setReviews(reviewsPr?.data);
    }
  };

  const colorItems = product.attributes.map((attr: { color: string; pictureUrl: string }) => ({
    color: attr.color,
    url: attr.pictureUrl,
  }));

  return (
    <Container>
      <div className={styles.breadcrumbWrapper}>
        <Navigation productName={locale === 'uk' ? product.productNameUa : product.productNameEn} />
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.leftBlock}>
          <ImageCarousel contents={product.contents} />
          <Tabs
            description={locale === 'uk' ? product.descriptionUa : product.descriptionEn}
            characteristics={product.characteristics}
            onChangeTab={handleChangeTab}
            onReviewSend={handleReviewSend}
          />
        </div>
        <div className={styles.rightBlock}>
          <section className={styles.mainInfo}>
            <div className={styles.productHeader}>
              <h1 className={styles.titleProduct}>
                {locale === 'uk' ? product.productNameUa : product.productNameEn}
              </h1>
              <div className={styles.productRating}>
                <RatingStars averageRating={product.averageRating} />
                <ReviewCount reviewCount={product.reviewCount} />
              </div>
              <div className={styles.priceBlock}>
                <p className={styles.price}>{newPrice}₴</p>
                <p className={styles.available}>
                  {isAvailable ? t('card.available') : t('card.outOfStock')}
                </p>
              </div>
              <div className={styles.specialInfo}>
                <p>
                  {t('page.code')}:<span>{product.productId}</span>
                </p>
                <p>
                  {t('page.manufacturer')}:<span>Terra Incognita</span>
                </p>
              </div>
            </div>
            <AvailableColors
              title={t('page.availableOptions')}
              h4={t('page.color')}
              clear={t('page.clear')}
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
                text={t('card.buy')}
                disabled={!isAvailable}
                icon={<Image src={Comercial} width={20} height={20} alt="Comercial" />}
                onClick={handleBuyClick}
              />
            </div>
            <Payment title={t('page.paymentMethod')} onClick={onChoisePayment} />
          </section>
          <section className={styles.additionalOffers}>
            <div className={styles.withThisBuy}>
              <ProductCardsSlider
                products={products}
                onBuyClick={handleBuyClick}
                onFavoriteClick={handleFavoriteClick}
                title={t('page.buyWithThis')}
              />
            </div>
            <div className={styles.relatedProducts}>
              <ProductCardsSlider
                products={products}
                onBuyClick={handleBuyClick}
                onFavoriteClick={handleFavoriteClick}
                title={t('page.similarProducts')}
              />
            </div>
          </section>
        </div>
      </div>
      <section>
        {tabIndex === 2 && productReviews.length > 0 && (
          <Reviews
            reviews={productReviews}
            productName={locale === 'uk' ? product.productNameUa : product.productNameEn}
            reviewTitle={t('tabs.reviews')}
            helpful={t('tabs.helpful')}
            usersThink={t('tabs.usersThink')}
          />
        )}
      </section>
      <ReviewedGoods
        title={t('page.previouslyViewed')}
        onBuyClick={handleBuyClick}
        onFavoriteClick={handleFavoriteClick}
      />
    </Container>
  );
};

export default ProductWrapper;
