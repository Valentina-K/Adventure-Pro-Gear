import QuantitySelector from '@/components/QuantitySelector/QuantitySelector';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/redux/store';
import { deleteShoppingProduct, setQuantityCart } from '@/redux/products/slice';
import { selectOpenShoppingCart } from '@/redux/products/selectors';
import trash from '../../../../public/icons/trash.svg';
import styles from './BasketList.module.css';

interface IBasketListProps {
  formData: {
    // name: string;
    // surname: string;
    // tel?: string;
    postAddress: string;
    city: string;
    // pochtIndex: string;
    // basket: any[];
    // company?: string;
    // mpe?: string;
    comment: string;
    ordersLists: {}[];
  };
  setFormData: (form: any) => void;
  setSumOrder: any;
  variant?: 'default' | 'small';
}

const BasketList: React.FC<IBasketListProps> = ({
  formData,
  setFormData,
  setSumOrder,
  variant = 'default',
}) => {
  const params = useParams();
  let shoppingCart = useSelector(selectOpenShoppingCart);
  const dispatch = useAppDispatch();
  const t = useTranslations('basket.basketList');
  useEffect(() => {
    const total = shoppingCart.reduce((acc, item) => acc + item.basePrice * item.quantity, 0);
    setSumOrder(total);
  }, [setSumOrder, shoppingCart]);

  const handleChangeQuantity = (quantity: number, productId: number) => {
    dispatch(
      setQuantityCart({
        productId,
        quantity,
      })
    );

    setFormData((prev: any) => {
      const existing: { productId: number; quantity: number }[] = prev.ordersLists || [];

      const updatedOrders = existing.some(item => item.productId === productId)
        ? existing.map(item => (item.productId === productId ? { ...item, quantity } : item))
        : [...existing, { productId, quantity }];

      return {
        ...prev,
        ordersLists: updatedOrders,
      };
    });
  };

  const handleDeleteProduct = (productId: number) => {
    dispatch(deleteShoppingProduct(productId));

    setFormData((prev: any) => ({
      ...prev,
      ordersLists: (prev.ordersLists || []).filter(
        (item: { productId: number; quantity: number }) => item.productId !== productId
      ),
    }));
  };

  return (
    <ul className={styles.list}>
      {shoppingCart?.map(
        ({
          image,
          selfLink,
          productNameEn,
          productNameUa,
          basePrice,
          productId,
          quantity,
          totalQuantity,
          color,
          size,
        }) => (
          <li className={styles.item} key={productId}>
            <div className={styles.card}>
              <Image src={image} alt="photo" width={180} height={180} />
              <div className={styles.content}>
                <Link href={selfLink}>
                  <h2 className={styles.item_title}>
                    {params?.lang === 'uk' ? productNameUa : productNameEn}
                  </h2>
                </Link>
                {variant !== 'small' && <p className={styles.item_price}>{basePrice}₴</p>}

                <p className={styles.item_descr}>
                  -{t('color')}:{color}
                </p>
                <p className={styles.item_descr}>
                  -{t('size')}: {size}
                </p>
                {variant === 'small' && <p className={styles.item_price_small}>{basePrice} ₴</p>}
              </div>

              <div className={styles.count}>
                <Image
                  src={trash}
                  alt="delete"
                  className={styles.delete}
                  onClick={() => handleDeleteProduct(productId)}
                />

                <div
                  className={`${variant === 'small' ? styles.quantity_container_small : styles.quantity_container}`}
                >
                  {variant === 'small' ? (
                    <QuantitySelector
                      onChange={quant => handleChangeQuantity(quant, productId)}
                      quantity={quantity}
                      totalQuantity={totalQuantity}
                      variant="small"
                    />
                  ) : (
                    <QuantitySelector
                      onChange={quant => handleChangeQuantity(quant, productId)}
                      quantity={quantity}
                      totalQuantity={totalQuantity}
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
