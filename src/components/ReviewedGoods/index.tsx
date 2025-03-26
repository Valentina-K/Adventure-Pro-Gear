import { useAppSelector } from '../../redux/store';
import Card from '../Card';
import styles from './ReviewedGoods.module.css';

interface ReviewedGoodsProps {
  title: string;
  onBuyClick: (id: number) => void;
  onFavoriteClick: (productId: number, isFavorite: boolean) => void;
}

function ReviewedGoods({ title, onBuyClick, onFavoriteClick }: ReviewedGoodsProps) {
  const products = useAppSelector(state => state.products.reviewedProducts);
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cards}>
        {products.map(product => (
          <Card
            key={product.productId}
            product={product}
            variant='small'
            onFavoriteClick={onFavoriteClick}
          />
        ))}
      </div>
    </section>
  );
}

export default ReviewedGoods;
