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
    case ProductTypes.UPDATE_PRODUCT:
      return { ...state, loading: true };
    case ProductTypes.UPDATE_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload?.error };
    case ProductTypes.UPDATE_PRODUCT_SUCCESS: {
      const updatedproduct = action.payload?.newProduct;
      console.log(updatedproduct);
      const newList = state.list.map((product) =>
        product._id === action.payload?.productID
          ? { ...product, ...updatedproduct }
          : product
      );
      return { ...state, loading: false, list: newList };
    }
    case ProductTypes.TOGGLE_PRODUCT: {
      return { ...state, loading: true };
    }
    case ProductTypes.TOGGLE_PRODUCT_SUCCESS: {
      const newList = state.list.map((item) =>
        item._id === action.payload?.productID
          ? { ...item, isActive: !item.isActive }
          : item
      );
      return { ...state, list: [...newList], loading: false };
    }
    case ProductTypes.TOGGLE_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload?.error };
    default:
      return state;
  }
};

export default productReducer;
