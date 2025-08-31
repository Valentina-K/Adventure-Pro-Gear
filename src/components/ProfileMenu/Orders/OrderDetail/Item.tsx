'use client';

import { Product } from '@/types';
import Image from 'next/image';
import React from 'react';
import { Link } from '@/i18n/routing';
import styles from './OrderDetail.module.css';
import {useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useWindowWidth } from '@/hooks/useWindowWidth';

interface ItemProps {
    product: Product & { count: number };
    // lang?: Locale;
    // t: (key: string) => string;
}

function Item({ product }: ItemProps) {
  const params = useParams();
  const t = useTranslations('profile');
  const width = useWindowWidth();
    
    return (
      <div className={styles.container}>
        <Image
          src={product.attributes[0].pictureUrl}
          width={108}
          height={108}
          alt="products image"
        />
        <div className={styles.detail}>
          <Link href={`/product/${product.productId}`}>
            <p className={styles.productName}>
              {params.lang === 'uk' ? product.productNameUa : product.productNameEn}
            </p>
          </Link>
          <p>
            {product.basePrice * product.count}
            &#8372; ( {product.count} {t('orders.pcs')} )
          </p>
        </div>
        {width > 743 && (
          <p className={styles.sum}>
            {product.basePrice * product.count} <span>&#8372;</span>
          </p>
        )}
      </div>
    );
}

export default Item;
