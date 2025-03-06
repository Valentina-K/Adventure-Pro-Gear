import ProductWrapper from '@/components/product/ProductWrapper';
import { getAllReviews } from '@/services/axios';

const ProductPage = async ({ params }: { params: { productId: number } }) => {
  const reviews = await getAllReviews(params.productId);
  return (
    <ProductWrapper
      reviews={reviews && reviews.data}
      productId={params.productId}
    />
  );
};

export default ProductPage;
