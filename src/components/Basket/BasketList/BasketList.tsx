import QuantitySelector from '@/components/QuantitySelector/QuantitySelector';
import React, { useState } from 'react';
import { Cart } from '@/types';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/redux/store';
import { setQuantityCart } from '@/redux/products/slice';
import { selectOpenShoppingCart } from '@/redux/products/selectors';
import trash from '../../../../public/icons/trash.svg';
import styles from './BasketList.module.css';

interface IBasketListProps {
  formData: {
    name: string;
    surname: string;
    tel?: string;
    postAddress: string;
    city: string;
    pochtIndex: string;
    basket: any[];
    company?: string;
    mpe?: string;
    comment: string;
  };
  setFormData: any;
  setSumOrder: any;
  variant?: 'default' | 'small';
}

const BasketList: React.FC<IBasketListProps> = ({
  formData,
  setFormData,
  setSumOrder,
  variant = 'default',
}) => {
  let shoppingCart = useSelector(selectOpenShoppingCart);
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState<Cart[]>(shoppingCart);

  const trs = (basePrice: number, quantity: number) => {
    setSumOrder((prev: number) => prev + basePrice * quantity);
  };

  const handleChangeQuantity = (quantity: number, productId: number, basePrice: number) => {
    // const changeProduct = products.map(item =>
    //   (item.productId === productId ? { ...item, quantity: quantity } : item));
    dispatch(
      setQuantityCart({
        productId,
        quantity,
      })
    );
    // setProducts(changeProduct);
    trs(basePrice, quantity);
  };

  return (
    <ul className={styles.list}>
      {products?.map(
        ({
          selfLink,
          productNameEn,
          productNameUa,
          basePrice,
          productId,
          quantity,
          color,
          size,
        }) => (
          <li className={styles.item} key={productId}>
            <div className={styles.card}>
              <Image src={selfLink} alt="photo" width={180} height={180} />
              <div className={styles.content}>
                <h2 className={styles.item_title}>{productNameUa}</h2>
                {variant !== 'small' && <p className={styles.item_price}>{basePrice} ₴</p>}

                <p className={styles.item_descr}>-Колір: {color}</p>
                <p className={styles.item_descr}>Розмір: {size}</p>
                {variant === 'small' && <p className={styles.item_price_small}>{basePrice} ₴</p>}
              </div>

              <div className={styles.count}>
                <Image src={trash} alt="delete" className={styles.delete} />

                <div
                  className={`${variant === 'small' ? styles.quantity_container_small : styles.quantity_container}`}
                >
                  {variant === 'small' ? (
                    <QuantitySelector
                      onChange={quantity => handleChangeQuantity(quantity, productId, basePrice)}
                      quantity={quantity}
                      variant="small"
                    />
                  ) : (
                    <QuantitySelector
                      onChange={quantity => handleChangeQuantity(quantity, productId, basePrice)}
                      quantity={quantity}
                    />
                  )}

                  <p className={styles.item_price}>{quantity * basePrice}₴</p>
                </div>
              </div>
            </div>
          </li>
        )
      )}
    </ul>
  );
};

export default BasketList;
