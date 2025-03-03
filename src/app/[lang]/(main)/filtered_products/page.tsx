import Container from '@/components/Container';
import React from 'react';
import Navigation from '@/components/Navigation/Navigation';
import { useSelector } from 'react-redux';
import { selectFilteredProducts } from '@/redux/products/selectors';
import { filter } from 'lodash';

interface FilteredProductsPageProps {
  searchParams: { search: string };
}

function FilteredProduct({ searchParams }: FilteredProductsPageProps) {
  const { search } = searchParams;
  const filteredProducts = useSelector(selectFilteredProducts);
  return (
    <section>
      <Container>
        <div>
          <Navigation navigationPage="Пошук" />
        </div>
        <h1>Результати пошуку фрази “{search}”</h1>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.productId}>
              <h2>{product.productNameUa}</h2>
              <p>{product.descriptionUa}</p>
            </div>
          ))
        ) : <p>Нічого не знайдено</p>}
      </Container>
    </section>
  );
}

export default FilteredProduct;
