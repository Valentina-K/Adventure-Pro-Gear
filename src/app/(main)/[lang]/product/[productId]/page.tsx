import ProductWrapper from "@/components/product/ProductWrapper";
import { getAllTranslations, getTranslation } from "@/dictionaries/dictionaries";
import { Locale } from "@/i18n-config";
import { getProductById, getProducts, getAllReviews } from "@/services/axios";

const ProductPage = async ({ params }: { params: { lang: Locale; productId: number } }) => {
  const product = await getProductById(params.productId);
  const reviews = await getAllReviews(params.productId);
  /* if (product) {
    console.log(product);
    const category = product.data.category.categoryNameEn;
    const categoryProducts = await getProducts({ category });
  } */
  const translations = await getAllTranslations(params.lang);
  const translation = getTranslation(translations);
  const products = await getProducts();

  return (
    <ProductWrapper
      product={product && product.data}
      locale={params.lang}
      products={products && products.data}
      translation={translation('product')}
      reviews={reviews && reviews.data}
    />
  );
};

export default ProductPage;
