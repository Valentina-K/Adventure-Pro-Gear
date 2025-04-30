import React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import ShoppingBag from '@/../public/icons/ShoppingBag.svg';
import styles from './ShoppingCart.module.css';

function ShoppingCart() {
  return (
    <Link href='/basket'>
      <div className={styles.shoppingCart}>
        <Image src={ShoppingBag} alt="shopping bag icon" width={24} height={24} />
      </div>
    </Link>
  );
}

export default ShoppingCart;
