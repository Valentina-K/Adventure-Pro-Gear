import Container from '@/components/Container';
import React from 'react';
import Navigation from '@/components/Navigation/Navigation';

interface FilteredProductsPageProps {
  searchParams: { search: string };
}

function FilteredProduct({ searchParams }: FilteredProductsPageProps) {
  const { search } = searchParams;
  // const filteredProducts = useSelector(selectFilteredProducts);
  return (
    <section>
      <Container>
        <div>
          <Navigation title="Пошук"/>
        </div>
        <h1>Результати пошуку фрази “{search}”</h1>        
      </Container>
    </section>
  );
}

export default FilteredProduct;
