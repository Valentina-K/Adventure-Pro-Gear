import ProductWrapper from '@/components/product/ProductWrapper';
import { getAllTranslations, getTranslation } from '@/dictionaries/dictionaries';
import { Locale } from '@/i18n-config';
import { getAllReviews } from '@/services/axios';

const ProductPage = async ({ params }: { params: { lang: Locale; productId: number } }) => {
  const reviews = await getAllReviews(params.productId);
  const translations = await getAllTranslations(params.lang);
  const translation = getTranslation(translations);
  return (
    <ProductWrapper
      translation={translation('product')}
      reviews={reviews && reviews.data}
    />
  );
};

export default ProductPage;
