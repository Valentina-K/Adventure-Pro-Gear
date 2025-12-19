'use client';

import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  selectProductById,
  selectProductByCategory,
  selectProductBySubcategory,
} from '@/redux/features/selectors';
import Image from 'next/image';
import noImage from '@/../public/images/no_image.png';
import { useLocale, useTranslations } from 'next-intl';
import Container from '@/components/Container';
import { AvailableColors } from '@/components/AvailableColors';
import Tabs from '@/components/Tabs';
import RatingStars from '@/components/RatingStars';
import ReviewCount from '@/components/ReviewCount';
import QuantitySelector from '@/components/QuantitySelector/QuantitySelector';
import { Attributes, Review } from '@/types/product';
import { getAllReviewsByProductId } from '@/clientServices/clientAxios';
import { setReviewedProducts, setShoppingCart } from '@/redux/products/slice';
import { usePathname } from 'next/navigation';
import Comercial from '@/../public/icons/Comercial.svg';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import ProductCardsSlider from '../ProductCardsSlider';
import Reviews from '../Tabs/Reviews';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import Navigation from '../Navigation/Navigation';
import Payment from '../Payment';
import Button from '../Button';
import FollowinIcon from '@/../public/icons/Following.svg';
import FollowingFill from '@/../public/icons/FollowingFill.svg';
import ReviewedGoods from '../ReviewedGoods';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useSession } from 'next-auth/react';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import styles from './productWrapper.module.css';
import { toast } from 'react-toastify';
import { selectOpenShoppingCart } from '@/redux/products/selectors';

interface ProductWrapperProp {
  reviews: Review[];
  productId: number;
}

const ProductWrapper: React.FC<ProductWrapperProp> = ({ reviews, productId }) => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const locale = useLocale();
  const t = useTranslations('product');
  const product = useSelector(selectProductById(Number(productId)));
  const reviewedProducts = useAppSelector(state => state.products.reviewedProducts);
  const buyWithThisProducts = useSelector(selectProductByCategory(product?.category.id, 9));
  const similarProducts = useSelector(
    selectProductBySubcategory(product?.category.subcategories[0].id, 9)
  );
  const [attrIndex, setAttrIndex] = useState(0);
  const [buyQuantity, setBuyQuantity] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [productReviews, setReviews] = useState<Review[]>(reviews);
  const [isSendReview, setIsSendReview] = useState(false);
  const pathname = usePathname();
  //const [following, setFollowing] = useState(FollowinIcon);
  const [message, setMessage] = useState<string | null>(null);
  const favStorage = useLocalStorage('favorites');
  const { addItem, removeItem, isExistItem } = favStorage;
  let shoppingCartProduct = useSelector(selectOpenShoppingCart);
  const changeSendReview = (value: boolean) => {
    setIsSendReview(value);
  }
  const width = useWindowWidth();
  const fullUrl = `${pathname}`;
  useEffect(() => {
    if (product) {
      dispatch(setReviewedProducts(product));
    }
  }, [product, dispatch]);

  const followingIcon = useMemo(() => {
    if (!session?.user) return FollowinIcon;
    return isExistItem(productId) ? FollowingFill : FollowinIcon;
  }, [session?.user, isExistItem, productId]);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(null), 2000);
    return () => clearTimeout(timer);
  }, [message]);

  const refreshReviews = async () => {
    const data = await getAllReviewsByProductId(productId);
    setReviews(data?.data);
  };

  const buyWithThisProductsMemo = useMemo(() => buyWithThisProducts, [buyWithThisProducts]);
  const similarProductsMemo = useMemo(() => similarProducts, [similarProducts]);

  const handleChangeQuantity = useCallback((quantity: number) => {
    // console.log('from changeQuantity', quantity);
    setBuyQuantity(quantity);
  }, []);

  const handleAddToFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!session?.user) {
      setMessage(t('card.addToFollowing'));
      return;
    }

    const isCurrentlyFavorite = isExistItem(productId);
    if (isCurrentlyFavorite) {
      removeItem(productId);
      //setFollowing(FollowinIcon);
    } else {
      addItem(product);
      //setFollowing(FollowingFill);
    }
  };

  if (!product) return <div>Product not found</div>;

  const isAvailable = product.attributes[attrIndex].quantity > 0;
  const newPrice =
    product.basePrice - product.basePrice * (product.attributes[0].priceDeviation / 100);

  const handleChoiceColor = (index: number) => {
    // console.log('from colorChoice', index);
    setAttrIndex(index);
  };

  const handleBuyClick = () => {
    const sale = product?.basePrice * (product?.attributes[0]?.priceDeviation / 100);

    const shoppingCart = {
      image: product.contents.length > 0 ? product.contents[0].source : noImage,
      selfLink: fullUrl,
      productNameEn: product.productNameEn,
      productNameUa: product.productNameUa,
      basePrice: product.basePrice - sale || product.basePrice,
      productId: product.productId,
      quantity: buyQuantity,
      totalQuantity: product.attributes[attrIndex].quantity,
      color: product.attributes[attrIndex].color,
      size: product.attributes[attrIndex].size,
      productAttributeId: product?.attributes?.[0]?.id,
    };
    dispatch(setShoppingCart(shoppingCart));

    const basket = shoppingCartProduct.filter(({ productId: id }) => product?.productId === id)

    if (basket?.length > 0) {
      return toast.error(
        locale === 'uk' ? 'Товар уже знаходиться у кошику.' : 'Product is already in the cart.',
        {
          position: 'top-right',
          autoClose: 2000,
        }
      );
    }

    toast.success(locale === 'uk' ? 'Товар додано у кошик' : 'Item added to cart', {
      position: 'top-right',
      autoClose: 2000,
    });
  };

  const handleChangeTab = (index: number) => setTabIndex(index);

  const handleReviewSend = async (isSend: boolean) => {
    setIsSendReview(isSend);
    if (isSend) {
      const reviewsPr = await getAllReviewsByProductId(product.productId);
      setReviews(reviewsPr?.data);
    }
  };

  const handleItemClick = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
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
      <div className={styles.layout}>
        <div className={styles.block2}>
          <ImageCarousel contents={product.contents} />
        </div>
        <div className={styles.right}>
          <div className={styles.block1}>
            <h1 className={styles.titleProduct}>
              {locale === 'uk' ? product.productNameUa : product.productNameEn}
            </h1>
          </div>
          <div className={styles.block3}>
            <div className={styles.specialContainer}>
              <div className={styles.productRating}>
                <RatingStars averageRating={product.averageRating} />
                <ReviewCount reviewCount={product.reviewCount} />
              </div>
              <div className={styles.priceBlock}>
                {product.basePrice !== newPrice ? (
                  <>
                    <div className={styles.priceWithDiscount}>
                      <span className={styles.oldPrice}>{product.basePrice}₴</span>
                      <span className={styles.discount}>
                        {product.attributes[0].priceDeviation}%
                      </span>
                    </div>
                    <p className={styles.price}>{newPrice}₴</p>
                  </>
                ) : (
                  <p className={styles.price}>{product.basePrice}₴</p>
                )}
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
            <div>
              <AvailableColors
                title={t('page.availableOptions')}
                h4={t('page.color')}
                clear={t('page.clear')}
                onColorChoice={handleChoiceColor}
                imageArray={colorItems}
              />
              <div>
                <p className={styles.textSize}>{t('page.size')}</p>
                <div className={styles.sizeContainer}>
                  {product.attributes.map((attr: Attributes, index: number) => (
                    <button
                      key={attr.id}
                      className={
                        index === activeIndex ? `${styles.size} ${styles.active}` : `${styles.size}`
                      }
                      onClick={() => handleItemClick(index)}
                    >
                      {attr.size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              {activeIndex === null && <p className={styles.alert}>{t('page.alert')}</p>}
              <div className={styles.buySection}>
                {message && <div className={`${styles.addToFavorite}`}>{message}</div>}
                <button onClick={handleAddToFavorite} className={styles.following}>
                  <Image src={followingIcon} width={20} height={18} alt="following" />
                </button>
                <QuantitySelector
                  totalQuantity={product.attributes[attrIndex].quantity}
                  onChange={quantity => handleChangeQuantity(quantity)}
                />
                <Button
                  className={styles.buyButton}
                  text={t('card.buy')}
                  disabled={!isAvailable || activeIndex === null}
                  icon={<Image src={Comercial} width={20} height={20} alt="Comercial" />}
                  onClick={handleBuyClick}
                />
              </div>
            </div>
            <Payment title={t('page.paymentMethod')} />
          </div>
        </div>
        <div className={styles.block4}>
          <Tabs
            description={locale === 'uk' ? product.descriptionUa : product.descriptionEn}
            characteristics={product.characteristics}
            isSendReview={isSendReview}
            onChangeTab={handleChangeTab}
            onReviewSend={handleReviewSend}
            changeSendReview={changeSendReview}
          />
        </div>
        <div className={styles.block5}>
          <section>
            {tabIndex === 2 && productReviews.length > 0 && (
              <Reviews
                reviews={productReviews}
                productName={locale === 'uk' ? product.productNameUa : product.productNameEn}
                reviewTitle={t('tabs.reviews')}
                helpful={t('tabs.helpful')}
                usersThink={t('tabs.usersThink')}
                refreshReviews={refreshReviews}
                changeSendReview={changeSendReview}
              />
            )}
          </section>
        </div>
        <div className={styles.block6}>
          <section className={styles.additionalOffers}>
            <div className={styles.withThisBuy}>
              <ProductCardsSlider
                products={buyWithThisProductsMemo}
                title={t('page.buyWithThis')}
              />
            </div>
            <div className={styles.relatedProducts}>
              <ProductCardsSlider
                products={similarProductsMemo}
                title={t('page.similarProducts')}
              />
            </div>
          </section>
        </div>
        <div className={styles.block7}>
          {width !== null && width < 1180 ? (
            <div className={styles.reviewed}>
              <ProductCardsSlider products={reviewedProducts.slice(0, 9)} title={t('page.previouslyViewed')} />
            </div>
          ) : (
            <ReviewedGoods title={t('page.previouslyViewed')} />
          )}
        </div>        
      </div>
    </Container>
  );
};

export default ProductWrapper;
