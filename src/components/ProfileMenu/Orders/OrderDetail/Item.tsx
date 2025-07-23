import { Product } from '@/types';
import Image from 'next/image';
import React from 'react';
import { Link } from '@/i18n/routing';
import styles from './OrderDetail.module.css';
import { Locale } from '@/i18n-config';

interface ItemProps {
    product: Product & { count: number };
    lang?: Locale;
    t: (key: string) => string;
}

function Item({ product, lang = 'uk', t }: ItemProps) {
    return (
        <div className={styles.container}>
            <Image src={product.attributes[0].pictureUrl} width={108} height={108} alt='products image' />
            <div className={styles.detail}>
                <Link href={`/product/${product.productId}`}>
                    <p className={styles.productName}>{lang === 'uk' ? product.productNameUa : product.productNameEn}</p>
                </Link>
                <p>
                    {product.basePrice * product.count}
                    &#8372; ( {product.count} {t('orders.pcs')} )
                </p>
            </div>
            <p>{product.basePrice * product.count} &#8372;</p>
        </div>
    )
}

export default Item;
