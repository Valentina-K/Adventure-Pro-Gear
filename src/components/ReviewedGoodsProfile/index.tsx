'use client';

import { useState } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useAppSelector } from '../../redux/store';
import Card from '../Card';
import ArrowRight from '../../../public/icons/arrowsRight.svg';
import ArrowLeft from '../../../public/icons/arrowsLeft.svg';
import Image from 'next/image';
import styles from './ReviewedGoods.module.css';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import { useTranslations } from 'next-intl';

interface ReviewedGoodsProps {
  title: string;
  emptyBanner: string;
}

const ITEMS_PER_PAGE = 4;

function ReviewedGoodsProfile({ title, emptyBanner }: ReviewedGoodsProps) {
  const t = useTranslations('profile');
  const width = useWindowWidth();
  const products = useAppSelector(state => state.products.reviewedProducts);
  const favStorage = useLocalStorage('favorites');

  const [page, setPage] = useState(0);

  const startIndex = page * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  // const currentItems = products.slice(startIndex, endIndex);
  let currentItems = undefined;
  
 width < 744
   ? (currentItems = products.slice(startIndex, endIndex - 2)) :
     width < 1179
    ? (currentItems = products.slice(startIndex, endIndex - 1))
      : (currentItems = products.slice(startIndex, endIndex));
  

  const hasNext = endIndex < products.length;
  const hasPrev = page > 0;

  const handleNext = () => {
    if (hasNext) setPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (hasPrev) setPage(prev => prev - 1);
  };

  if (!products.length) {
    return (
      <section className={styles.wrapper}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.emptyBanner}>
          <p className={styles.emptyBannerText}>{emptyBanner}</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.wrapper}>
      {width < 1180 && <p className={styles.title_info}>{t('profile_info')}</p>}
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.paginationControls}>
        {hasPrev && (
          <button onClick={handlePrev} className={styles.arrowLeft}>
            <Image src={ArrowRight} alt="ArrowRight" width={30} height={30} />
          </button>
        )}
      </div>

      {currentItems && (
        <div className={styles.cards}>
          {currentItems?.map(product => (
            <Card
              key={product.productId}
              product={product}
              variant="small"
              favoriteStore={favStorage}
            />
          ))}
        </div>
      )}

      <div className={styles.paginationControls}>
        {hasNext && (
          <button onClick={handleNext} className={styles.arrowRight}>
            <Image src={ArrowLeft} alt="ArrowLeft" width={30} height={30} />
          </button>
        )}
      </div>
    </section>
  );
}

export default ReviewedGoodsProfile;
