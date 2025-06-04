import { useAppSelector } from '../../redux/store';
import Card from '../Card';
import styles from './ReviewedGoods.module.css';

interface ReviewedGoodsProps {
  title: string;
}

function ReviewedGoods({ title }: ReviewedGoodsProps) {
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
          />
        ))}
      </div>
    </section>
  );
}

export default ReviewedGoods;
