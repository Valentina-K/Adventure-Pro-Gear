import useLocalStorage from '@/hooks/useLocalStorage';
import { useAppSelector } from '../../redux/store';
import Card from '../Card';
import styles from './ReviewedGoods.module.css';

interface ReviewedGoodsProps {
  title: string;
}

function ReviewedGoods({ title }: ReviewedGoodsProps) {
  const products = useAppSelector(state => state.products.reviewedProducts);
  const favStorage = useLocalStorage('favorites');
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cards}>
        {products.map(product => (
          <Card
            key={product.productId}
            product={product}
            variant='small'
            favoriteStore={favStorage}
          />
        ))}
      </div>
    </section>
  );
}

export default ReviewedGoods;
