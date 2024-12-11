export interface Attributes {
  id: number;
  productId: number | null;
  size: string;
  color: string;
  additional: string;
  priceDeviation: number;
  quantity: number;
  label: string;
  pictureUrl: string;
  selfLink: string | null;
}

interface Contents {
  productId: number | null;
  source: string;
  selfLink: string | null;
}

interface SubSubCategories {
  id: number;
  subSubCategoryNameUa: string;
  subSubCategoryNameEn: string;
  subCategoryId: number;
  parentCategoryId: number | null;
  selfLink: string | null;
}

interface Subcategories {
  id: number;
  subcategoryNameUa: string;
  subcategoryNameEn: string;
  parentCategoryId: number;
  subSubCategories: SubSubCategories[];
  selfLink: string | null;
}

export interface Product {
  productId: number;
  productNameUa: string;
  productNameEn: string;
  descriptionUa: string;
  descriptionEn: string;
  basePrice: number;
  gender: 'MALE' | 'FEMALE' | 'UNISEX';
  category: {
    id: number;
    categoryNameUa: string;
    categoryNameEn: string;
    sectionId: number;
    parentCategoryId: number | null;
    subcategories: Subcategories[];
    selfLink: string;
  };
  attributes: Attributes[];
  contents: Contents[];
  selfLink: string;
}
