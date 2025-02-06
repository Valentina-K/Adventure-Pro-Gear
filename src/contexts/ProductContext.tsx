'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode
} from 'react';
import { Product } from '@/interfaces/product';

interface ProductContextProps {
  products: Product[];
  filteredProducts: Product[];
  product: Product;
  setProduct: (product: Product) => void;
  setProducts: (products: Product[]) => void;
  setFilteredProducts: (products: Product[]) => void;
}

const initialProduct = {
  productId: 0,
  productNameUa: '',
  productNameEn: '',
  descriptionUa: '',
  descriptionEn: '',
  basePrice: 0,
  averageRating: 0,
  reviewCount: 0,
  gender: 'MALE' as 'MALE' | 'FEMALE' | 'UNISEX',
  category: {
    id: 0,
    categoryNameUa: '',
    categoryNameEn: '',
    sectionId: 0,
    parentCategoryId: 0,
    subcategories: [],
    selfLink: '',
  },
  attributes: [],
  characteristics: [],
  contents: [],
  selfLink: '',
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const ProductProvider = ({
  children,
  initialProducts,
}: {
  children: ReactNode;
  initialProducts: Product[];
}) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [product, setProduct] = useState<Product>(initialProduct);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const value = React.useMemo(
    () => ({
      products,
      filteredProducts,
      product,
      setProduct,
      setProducts,
      setFilteredProducts,
    }),
    [products, filteredProducts, product]
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};
