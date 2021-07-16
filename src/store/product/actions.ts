import { FormInstance } from 'antd';
import { Dispatch } from 'redux';
import { getHttpRequest, postHttp } from '../../utils/api';
import { Product } from '../../utils/contanst';
import { ProductActions, ProductTypes } from './types';
import { notification } from 'antd';
import AxiosConfig from '../../config/axiosConfig';
import { RootState } from '../RootReducer';
import { CategoryType } from '../category/types';

const fieldNames = [
  'name',
  'featuredImg',
  'categories',
  'price',
  'instock',
  'description',
];

export const GetListProducts =
  () => async (dispatch: Dispatch<ProductActions>) => {
    try {
      dispatch({
        type: ProductTypes.GET_LIST_PRODUCTS,
      });
      const token =
        typeof window !== 'undefined'
          ? window.localStorage.getItem('token') || null
          : null;
      const {
        data: {
          data: { products: list },
        },
      } = await getHttpRequest(Product.LIST_PRODUCTS_CREATE_PRODUCT, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({
        type: ProductTypes.GET_LIST_PRODUCTS_SUCCESS,
        payload: {
          list,
        },
      });
    } catch (error) {
      dispatch({
        type: ProductTypes.GET_LIST_PRODUCTS_FAIL,
        payload: {
          error: error.response,
        },
      });
    }
  };

export const createProduct =
  (formData: FormData, form: FormInstance, cb: Function) =>
  async (dispatch: Dispatch<ProductActions>, getState: () => RootState) => {
    try {
      dispatch({
        type: ProductTypes.CREATE_PRODUCT,
      });
      const token =
        (typeof window !== 'undefined' &&
          window.localStorage.getItem('token')) ||
        null;
      const {
        data: {
          data: { newProduct },
        },
      } = await postHttp(Product.LIST_PRODUCTS_CREATE_PRODUCT, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const {
        category: { list: listCategories },
      } = getState();

      const newArrCate: CategoryType[] = [];
      newProduct.categories.forEach((ele: string) => {
        const existedCate = listCategories.find((item) => item._id === ele);

        if (existedCate) {
          newArrCate.push(existedCate);
        }
      });
      newProduct.categories = newArrCate;

      form.resetFields(fieldNames);
      cb();
      notification.success({
        message: 'SUCCESS',
        duration: 3,
        description: 'Create product success',
        onClose: () => notification.destroy(),
      });
      dispatch({
        type: ProductTypes.CREATE_PRODUCT_SUCCESS,
        payload: {
          newProduct,
        },
      });
    } catch (error) {
      const { message } = error.response.data;
      const index = fieldNames.findIndex(
        (ele) => ele === Object.keys(message)[0]
      );
      form.scrollToField(fieldNames[index]);
      form.setFields([
        {
          name: fieldNames[index],
          errors: [message[fieldNames[index]]],
        },
      ]);
      notification.error({
        message: 'ERROR',
        duration: 3,
        description: message[fieldNames[index]] || 'ERROR',
        onClose: () => notification.destroy(),
      });
      dispatch({
        type: ProductTypes.CREATE_PRODUCT_FAIL,
        payload: {
          error: message[fieldNames[index]] || 'ERROR',
        },
      });
    }
  };

export const UpdateProduct =
  (formData: FormData, id: string, cb: Function) =>
  async (dispatch: Dispatch<ProductActions>, getState: () => RootState) => {
    try {
      dispatch({
        type: ProductTypes.UPDATE_PRODUCT,
      });
      const token =
        (typeof window !== 'undefined' &&
          window.localStorage.getItem('token')) ||
        null;
      const {
        data: {
          data: { updatedProduct },
        },
      } = await AxiosConfig.patch(Product.UPDATE(id), formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const {
        category: { list: listCategories },
      } = getState();

      const newArrCate: CategoryType[] = [];
      updatedProduct.categories.forEach((ele: string) => {
        const existedCate = listCategories.find((item) => item._id === ele);
        if (existedCate) {
          newArrCate.push(existedCate);
        }
      });
      updatedProduct.categories = newArrCate;

      notification.success({
        message: 'SUCCESS',
        duration: 3,
        description: 'Update product success',
        onClose: () => notification.destroy(),
      });
      cb();
      dispatch({
        type: ProductTypes.UPDATE_PRODUCT_SUCCESS,
        payload: {
          newProduct: updatedProduct,
          productID: id,
        },
      });
    } catch (error) {
      notification.error({
        message: 'ERROR',
        duration: 3,
        description: 'Update product fail',
        onClose: () => notification.destroy(),
      });
      dispatch({
        type: ProductTypes.CREATE_PRODUCT_FAIL,
        payload: {
          error: error.response,
        },
      });
    }
  };
export const ToggleProductSuccess = (_id: string): ProductActions => {
  return {
    type: ProductTypes.TOGGLE_PRODUCT_SUCCESS,
    payload: {
      productID: _id,
    },
  };
};
export const ToggleProduct = (): ProductActions => {
  return {
    type: ProductTypes.TOGGLE_PRODUCT,
  };
};
export const ToggleProductFail = (error: any): ProductActions => {
  return {
    type: ProductTypes.TOGGLE_PRODUCT_FAIL,
    payload: {
      error,
    },
  };
};
