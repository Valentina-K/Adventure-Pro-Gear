'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';
import FollowinIcon from '@/../public/icons/Following.svg';
import FollowingFill from '@/../public/icons/FollowingFill.svg';
import Comercial from '@/../public/icons/Comercial.svg';
import NotAvailable from '@/../public/images/soldout.png';
import { Product } from '@/interfaces/product';
import { Link } from '../../i18n/routing';
import Button from '../Button';
import RatingStars from '../RatingStars';
import ReviewCount from '../ReviewCount';
import styles from './Card.module.css';

interface CardProps {
  isLogged?: boolean;
  variant?: 'big' | 'standart' | 'small';
  /* translation: {
    card: {
      addToFollowing: string;
      sale: string;
      new: string;
      available: string;
      outOfStock: string;
      buy: string;
    };
  }; */
  onBuyClick: (productId: number) => void;
  onFavoriteClick: (productId: number, isFavorite: boolean) => void;
  product: Product;
}

const getClassName = (variant: string) => {
  switch (variant) {
    case 'big':
      return `${styles.cardWrapper} ${styles.big}`;
    case 'small':
      return `${styles.cardWrapper} ${styles.small}`;
    default:
      return styles.cardWrapper;
  }
};

const Card: React.FC<CardProps> = ({
  product,
  isLogged = false,
  variant = 'standart',
  onBuyClick,
  onFavoriteClick,
}) => {
  const session = useSession();
  const locale = useLocale();
  const t = useTranslations('product');
  const [newPrice, setNewPrice] = useState<number>(0);
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  const [productName, setProductName] = useState<string>('');
  const [classNameImg, setClassNameImg] = useState<string>(styles.imageWrapper);
  const [addToFavorite, setAddToFavorite] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [following, setFollowing] = useState(FollowinIcon);
  const productImage =
    product.contents.length > 0 ? product.contents[0].source : 'https://dummyimage.com/180x180';
  let className = getClassName(variant);
  // const { setProduct } = useProduct();
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 2000);
      return () => clearTimeout(timer); // Очистка таймера при размонтировании
    }
  }, [message]);

  useEffect(() => {
    setNewPrice(
      product.basePrice - product.basePrice * (product.attributes[0].priceDeviation / 100)
    );
    setProductName(locale === 'uk' ? product.productNameUa : product.productNameEn);
    setIsAvailable(product.attributes[0].quantity > 0);
    setClassNameImg(
      isAvailable ? `${styles.imageWrapper}` : `${styles.imageWrapper} ${styles.outStock}`
    );

    if (addToFavorite) {
      setFollowing(FollowingFill);
    } else setFollowing(FollowinIcon);
  }, [product, locale, addToFavorite, isAvailable, variant, className]);

  const handleAddToFavorite: (event: React.MouseEvent<HTMLButtonElement>) => void = event => {
    event.preventDefault(); // Отменяет переход
    event.stopPropagation(); // Остановит всплытие
    if (session.data) {
      setAddToFavorite(!addToFavorite);
      onFavoriteClick(product.productId, !addToFavorite);
    } else setMessage(t('card.addToFollowing'));
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
          <Image className={styles.image} src={productImage} alt={productName} layout="fill" />
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
            <Image src={following} width={20} height={18} alt="following" />
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
                  <span>{product.basePrice} ₴</span>
                  <span
                    className={
                      variant === 'big'
                        ? `${styles.deviation} ${styles.big}`
                        : `${styles.deviation}`
                    }
                  >
                    {product.attributes[0].priceDeviation} %
                  </span>
                </div>
                <div
                  className={
                    variant === 'big' ? `${styles.newPrice} ${styles.big}` : `${styles.newPrice}`
                  }
                >
                  {newPrice} ₴
                </div>
              </div>
            ) : (
              <div
                className={
                  variant === 'big' ? `${styles.newPrice} ${styles.big}` : `${styles.newPrice}`
                }
              >
                {product.basePrice} ₴
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
            onClick={() => onBuyClick(product.productId)}
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

export default Card;
