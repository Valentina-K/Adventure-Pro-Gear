import Image from 'next/image';
import { Link } from '@/i18n/routing';
import ShoppingBag from '@/../public/icons/ShoppingBag.svg';
import { selectOpenShoppingCart } from '@/redux/products/selectors';
import { useSelector } from 'react-redux';
import styles from './ShoppingCart.module.css';

function ShoppingCart() {
  let shoppingCart = useSelector(selectOpenShoppingCart);

  return (
    <Link href="/basket">
      <div className={`${styles.shoppingCart} `}>
        <p className={`${shoppingCart.length > 0 ? styles.shoppingCart_active : ''}`} />
        <Image src={ShoppingBag} alt="shopping bag icon" width={24} height={24} />
      </div>
    </Link>
  );
}

export default ShoppingCart;
