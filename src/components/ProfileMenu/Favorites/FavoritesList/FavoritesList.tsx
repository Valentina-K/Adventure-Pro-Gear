import React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import clsx from 'clsx';
import useLocalStorage from '@/hooks/useLocalStorage';
import { Product } from '@/types';
import Comercial from '@/../public/icons/ComercialFill.svg';
import Delete from '@/../public/icons/trash.svg';
import noImage from '@/../public/images/no_image.png';
import { useAppDispatch } from '@/redux/store';
import { setShoppingCart } from '@/redux/products/slice';
import Payments from '@/constants/payments';
import styles from './FavoritesList.module.css';

const FavoritesList: React.FC = () => {
  const dispatch = useAppDispatch();
  const locale = useLocale();
  const t = useTranslations('profile.favorites');
  const { removeItem, list } = useLocalStorage('favorites');

  const domain = typeof window !== 'undefined' ? window.location.origin : '';
  const handleBuyClick: (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>,
    product: Product
  ) => void = (event, product) => {
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
    };
    dispatch(setShoppingCart(shoppingCart));
  };

  return (
    <ul className={styles.list}>
      {list.map((item, index) => {
        const productName = locale === 'uk' ? item.productNameUa : item.productNameEn;
        const isAvailable = item.attributes[0].quantity > 0;
        const productImage = item.contents.length > 0 ? item.contents[0].source : noImage;
        const availableClass = clsx(styles.available, !isAvailable && styles.outOfStock);
        return (
          <li key={index} className={styles.item}>
            <div className={styles.previewImage}>
              <Image src={productImage} alt="preview" width={80} height={80} />
            </div>
            <div className={styles.name}>
              <Link href={`/product/${item.productId}`}>{productName}</Link>
            </div>
            <div className={styles.price_container}>
              <div className={availableClass}>{isAvailable ? t('available') : t('outOfStock')}</div>
              <div className={styles.price}>{item.basePrice}₴</div>
            </div>
            <div className={styles.icon}>
              <Image
                src={Comercial}
                alt="buy"
                width={20}
                height={20}
                onClick={e => handleBuyClick(e, item)}
              />
            </div>
            <div className={styles.icon}>
              <Image src={Delete} onClick={() => removeItem(item.productId)} alt="remove" />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default FavoritesList;
