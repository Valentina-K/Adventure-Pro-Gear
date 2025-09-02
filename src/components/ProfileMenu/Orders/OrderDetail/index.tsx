import React from 'react';
import { getProductById } from '@/services/axios';
import Item from './Item';
import styles from './OrderDetail.module.css';
import { Locale } from '@/i18n-config';

interface OrderDetailProps {
  productList: [
    {
      productId: number,
      count: number
    },
  ];
  t: (key: string) => string;
  lang?: Locale;
}

const OrderDetail = async ({ productList, t, lang = 'uk' }: OrderDetailProps) => {
  const products = await Promise.all(
    productList.map(item => getProductById(item.productId))
  );

  const productsWithQuantity = products.map((product, idx) => ({
    ...product,
    count: productList[idx].count,
  }));
  const initialValue = 0;
  const sumWithInitial = productsWithQuantity.reduce(
    (accumulator, currentValue) => accumulator + currentValue.count * currentValue.basePrice,
    initialValue,
  );
  return (
    <>
      <ul>
        {productsWithQuantity.map(product => (
          <li key={product.productId}>
            <Item product={product} />
          </li>
        ))}
      </ul>
      <p className={styles.totalText}>{t('orders.totalAmount')} <span className={styles.total}>{sumWithInitial}</span></p>
    </>

  );
};

export default OrderDetail;
