import { Reducer } from 'redux';
import {
  ProductActions,
  ProductState,
  ProductType,
  ProductTypes,
} from './types';

const initialState: ProductState = {
  loading: false,
  list: [],
  error: null,
};

const productReducer: Reducer<ProductState, ProductActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ProductTypes.GET_LIST_PRODUCTS:
      return { ...state, loading: true };
    case ProductTypes.GET_LIST_PRODUCTS_FAIL:
      return { ...state, loading: false, error: action.payload?.error };
    case ProductTypes.GET_LIST_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload?.list as ProductType[],
      };
    case ProductTypes.CREATE_PRODUCT:
      return { ...state, loading: true };
    case ProductTypes.CREATE_PRODUCT_SUCCESS: {
      const newList = [...state.list];
      newList.push(action.payload?.newProduct as ProductType);
      return { ...state, loading: false, list: newList };
    }
    case ProductTypes.CREATE_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload?.error };
    default:
      return state;
  }
};

export default productReducer;
