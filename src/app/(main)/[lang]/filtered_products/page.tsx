import React from 'react';
import { Locale } from '@/i18n-config';
import Container from '@/components/Container';
import Navigation from '@/components/Navigation/Navigation';
// import Card from '@/components/Card';
import { getAllTranslations, getTranslation } from '@/dictionaries/dictionaries';
// import { useProduct } from '@/contexts/ProductContext';

interface FilteredProductsPageProps {
  params: { lang: Locale };
  searchParams: { search: string };
}
async function FilteredProductsPage({ params, searchParams }:FilteredProductsPageProps) {
  const { lang } = params;
  const { search } = searchParams;
  const translations = await getAllTranslations(params.lang);
  // const translation = getTranslation(translations);
  // const { filteredProducts } = useProduct();
  return (
    <Container>
      <div>
        <Navigation navigationPage="Пошук" />
      </div>
      <h1>
        Результати пошуку фрази “
        {search}
        ”
      </h1>
      {/* {filteredProducts.length > 0 && (
        <ul>
          {filteredProducts.map(product => (
            <li key={product.productId}>
              <Card
                product={product}
                locale={locale}
                onBuyClick={() => {
                  alert('Added to cart');
                }}
                onFavoriteClick={() => {
                  alert('Added to favourite');
                }}
                translation={translation('product')}
              />
            </li>
          ))}
        </ul>
      )} */}
    </Container>
  );
}

export default FilteredProductsPage;
