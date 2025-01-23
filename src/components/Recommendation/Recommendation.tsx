import React from 'react';
import Image from 'next/image';
import { getProducts } from '@/services/axios';
// import { IRecommendationProductProps } from '@/types';
// import star from '../../../public/icons/star.svg';
// import reviews from '../../../public/icons/reviews_recommendation.svg';
// import following from '../../../public/icons/Following.svg';
// import product from '../../../public/images/180x180.png';
import style from './Recommendation.module.css';
// import { getAllTranslations, getTranslation } from '@/dictionaries/dictionaries';
// import { Locale } from '@/i18n-config';
import ProductWrapper from '../product/ProductWrapper';

export const dynamic = 'force-dynamic';

export async function Recommendation() {
  // const translations = await getAllTranslations(params.lang);
  // const translation = getTranslation(translations);
  // const products = await getProducts();

  return (
    <>
      <h1 className={style.title}>Ми рекомендуємо</h1>
      {/* <ul className={style.list}>
        {recommendationProduct &&
          recommendationProduct?.map(
            ({
              productId,
              productNameUa,
              reviewCount,
              basePrice,
            }: {
              productId: string | number;
              productNameUa: string;
              reviewCount: number;
              basePrice: number;
            }) => (
              <li key={productId} className={style.item}>
                <Image
                  src={product}
                  alt="img blog"
                  width="280"
                  height="218"
                  className={style.item_img}
                />
                <Image
                  src={following}
                  alt="img blog"
                  width="24"
                  height="24"
                  className={style.item_following}
                />
                <div className={style.list_content}>
                  <h2 className={style.list_title}>{productNameUa}</h2>
                  <div className={style.list_footer}>
                    <div className={style.review_container}>
                      <div>
                        {[...Array(5)].map((el, idx) => (
                          <Image key={idx + 1} src={star} alt="star" width="20" height="20" />
                        ))}
                      </div>
                      <div className={style.review_count}>
                        <Image src={reviews} alt="img blog" width="14" height="14" />
                        {reviewCount}
                      </div>
                    </div>
                    <div>
                      <span className={style.list_price}>{basePrice} ₴</span>
                      <p className={style.list_buy}>В наявності</p>
                    </div>
                  </div>
                </div>
              </li>
            )
          )}
      </ul> */}
    </>
  );
}

export default Recommendation;
