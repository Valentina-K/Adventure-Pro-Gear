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

export interface Contents {
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

export interface Characteristics {
  id: number;
  name: string;
  value: string;
  productId: number;
  categoryCharacteristicId: number;
}

export interface Product {
  source: any;
  length: number;
  productId: number;
  productNameUa: string;
  productNameEn: string;
  descriptionUa: string;
  descriptionEn: string;
  basePrice: number;
  averageRating: number;
  reviewCount: number;
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
  characteristics: Characteristics[];
  contents: Contents[];
  selfLink: string;
}

export interface Review {
  id: number;
  productId: number;
  username: string;
  rating: number;
  likes: number;
  dislikes: number;
  comment: string;
}
