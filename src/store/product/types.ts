import { CategoryType } from '../category/types';

export const ProductTypes = {
  GET_LIST_PRODUCTS: 'product/GET_LIST_PRODUCTS',
  GET_LIST_PRODUCTS_SUCCESS: 'product/GET_LIST_PRODUCTS_SUCCESS',
  GET_LIST_PRODUCTS_FAIL: 'product/GET_LIST_PRODUCTS_FAIL',
  CREATE_PRODUCT: 'product/CREATE_PRODUCT',
  CREATE_PRODUCT_SUCCESS: 'product/CREATE_PRODUCT_SUCCESS',
  CREATE_PRODUCT_FAIL: 'product/CREATE_PRODUCT_FAIL',
};

export interface ProductType {
  categories: CategoryType[];
  name: string;
  _id: string;
  images: string[];
  instock: number;
  isActive: boolean;
  price: number;
  featuredImg: string;
}

export interface ProductState {
  list: ProductType[];
  loading: boolean;
  error: any;
}

export interface ProductPayload {
  list?: ProductType[];
  error?: any;
  newProduct?: ProductType;
}

export interface ProductActions {
  type:
    | typeof ProductTypes.CREATE_PRODUCT
    | typeof ProductTypes.CREATE_PRODUCT_FAIL
    | typeof ProductTypes.CREATE_PRODUCT_SUCCESS
    | typeof ProductTypes.GET_LIST_PRODUCTS
    | typeof ProductTypes.GET_LIST_PRODUCTS_FAIL
    | typeof ProductTypes.GET_LIST_PRODUCTS_SUCCESS;
  payload?: ProductPayload;
}
