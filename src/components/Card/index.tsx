'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';
import FollowinIcon from '@/../public/icons/Following.svg';
import FollowingFill from '@/../public/icons/FollowingFill.svg';
import Comercial from '@/../public/icons/Comercial.svg';
import NotAvailable from '@/../public/images/soldout.png';
import { Product } from '@/types/product';
import Payments from '@/constants/payments';
import { setShoppingCart } from '@/redux/products/slice';
import { useAppDispatch } from '@/redux/store';
import noImage from '@/../public/images/no_image.png';
import type { FavoriteStore } from '@/hooks/useLocalStorage';
import { Link } from '../../i18n/routing';
import Button from '../Button';
import RatingStars from '../RatingStars';
import ReviewCount from '../ReviewCount';
import styles from './Card.module.css';

interface CardProps {
  variant?: 'big' | 'standart' | 'small';
  product: Product;
  favoriteStore: FavoriteStore;
}

const getClassName = (variant: string) => {
  switch (variant) {
    case 'big':
      return `${styles.cardWrapper} ${styles.cardBig}`;
    case 'small':
      return `${styles.cardWrapper} ${styles.cardSmall}`;
    default:
      return styles.cardWrapper;
  }
};

const getImgClassName = (variant: string, isAvailable: boolean) => {
  switch (variant) {
    case 'big':
      return !isAvailable
        ? `${styles.imageWrapper} ${styles.imgBig} ${styles.outStock}`
        : `${styles.imageWrapper} ${styles.imgBig}`;
    case 'small':
      return !isAvailable
        ? `${styles.imageWrapper} ${styles.imgSmall} ${styles.outStock}`
        : `${styles.imageWrapper} ${styles.imgSmall}`;
    default:
      return !isAvailable ? `${styles.imageWrapper} ${styles.outStock}` : styles.imageWrapper;
  }
};

const Card: React.FC<CardProps> = ({ product, variant = 'standart', favoriteStore }) => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const locale = useLocale();
  const t = useTranslations('product');
  const { addItem, removeItem, isExistItem } = favoriteStore;

  const isAvailable = product.attributes[0].quantity > 0;
  const newPrice =
    product.basePrice - product.basePrice * (product.attributes[0].priceDeviation / 100);
  const productName = locale === 'uk' ? product.productNameUa : product.productNameEn;
  const classNameImg = getImgClassName(variant, isAvailable);

  //const [addToFavorite, setAddToFavorite] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  //const [following, setFollowing] = useState(FollowinIcon);
  const productImage = product.contents.length > 0 ? product.contents[0].source : noImage;
  const className = getClassName(variant);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(null), 2000);
    return () => clearTimeout(timer);
  }, [message]);

  const followingIcon = useMemo(() => {
    if (!session?.user) return FollowinIcon;
    return isExistItem(product.productId) ? FollowingFill : FollowinIcon;
  }, [session?.user, isExistItem, product.productId]);

  const handleAddToFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!session?.user) {
      setMessage(t('card.addToFollowing'));
      return;
    }

    const isCurrentlyFavorite = isExistItem(product.productId);
    if (isCurrentlyFavorite) {
      removeItem(product.productId);
    } else {
      addItem(product);
    }
  };

  const domain = typeof window !== 'undefined' ? window.location.origin : '';
  const handleBuyClick: (event: React.MouseEvent<HTMLButtonElement>) => void = event => {
    event.preventDefault();
    event.stopPropagation();
    const shoppingCart = {
      image: product.contents.length > 0 ? product.contents[0].source : noImage,
      selfLink: `${domain}/product/${product.productId}`,
      productNameEn: product.productNameEn,
      productNameUa: product.productNameUa,
      basePrice: product.basePrice,
      productId: product.productId,
      quantity: 1,
      totalQuantity: product.attributes[0].quantity,
      payment: Payments.VISA,
      color: product.attributes[0].color,
      size: product.attributes[0].size,
      productAttributeId: product?.attributes?.[0]?.id,
    };
    dispatch(setShoppingCart(shoppingCart));
  };

  return (
    <section
      className={className}
      /* onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} */
    >
      <Link href={`/product/${product.productId}`} className={styles.cardLink}>
        <div className={classNameImg}>
          {message && (
            <div
              className={
                variant === 'big'
                  ? `${styles.addToFavorite} ${styles.big}`
                  : `${styles.addToFavorite}`
              }
            >
              {message}
            </div>
          )}
          <Image className={styles.image} src={productImage} alt={productName} fill={true} />
          <div
            className={
              variant === 'big'
                ? `${styles.specialWrapper} ${styles.big}`
                : `${styles.specialWrapper}`
            }
          >
            {!isAvailable && (
              <Image
                className={styles.saleOut}
                src={NotAvailable}
                alt="not available"
                width={105}
                height={49}
              />
            )}
            {product.basePrice > newPrice && <div className={styles.sale}>{t('card.sale')}</div>}
            {product.attributes[0].label && <div className={styles.new}>{t('card.new')}</div>}
          </div>
          <button onClick={handleAddToFavorite} className={styles.following}>
            <Image src={followingIcon} width={20} height={18} alt="following" />
          </button>
        </div>
        <div className={styles.cardContent}>
          <div className={styles.cardInfo}>
            <h3
              className={
                variant === 'big' ? `${styles.productName} ${styles.big}` : `${styles.productName}`
              }
            >
              {productName}
            </h3>
            <div className={styles.rating}>
              <RatingStars averageRating={product.averageRating} />
              <ReviewCount reviewCount={product.reviewCount} />
            </div>
            {product.basePrice !== newPrice ? (
              <div className={styles.price}>
                <div className={styles.oldPrice}>
                  <span>{product.basePrice}₴</span>
                  <span
                    className={
                      variant === 'big'
                        ? `${styles.deviation} ${styles.big}`
                        : `${styles.deviation}`
                    }
                  >
                    {product.attributes[0].priceDeviation}%
                  </span>
                </div>
                <div
                  className={
                    variant === 'big' ? `${styles.newPrice} ${styles.big}` : `${styles.newPrice}`
                  }
                >
                  {newPrice}₴
                </div>
              </div>
            ) : (
              <div
                className={
                  variant === 'big' ? `${styles.newPrice} ${styles.big}` : `${styles.newPrice}`
                }
              >
                {product.basePrice}₴
              </div>
            )}
          </div>
          <div
            className={
              variant === 'big' ? `${styles.available} ${styles.big}` : `${styles.available}`
            }
          >
            {isAvailable ? t('card.available') : t('card.outOfStock')}
          </div>
        </div>
        <div className={styles.buySection}>
          <Button
            onClick={handleBuyClick}
            text={t('card.buy')}
            className={
              variant === 'big' ? `${styles.buyButton} ${styles.big}` : `${styles.buyButton}`
            }
            disabled={!isAvailable}
            icon={<Image src={Comercial} width={20} height={20} alt="Comercial" />}
          />
        </div>
      </Link>
    </section>
  );
};

export default React.memo(Card);
