import ProductWrapper from "@/components/product/ProductWrapper";
import { Locale } from "@/i18n-config";
import { getProductById } from "@/services/axios";

const ProductPage = async ({ params }: { params: { lang: Locale, productId:number } }) => {
  const product = await getProductById(params.productId);
  return <ProductWrapper product={product && product.data} locale={params.lang} />;
};

export default ProductPage;
