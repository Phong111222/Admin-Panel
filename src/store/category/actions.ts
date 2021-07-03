import { Dispatch } from "redux";
import { getHttpRequest } from "../../utils/api";
import { Category } from "../../utils/contanst";
import { CategoryAction, CategoryType, CategoryTypes } from "./types";

export const GetListCategories = () => async (
  dispatch: Dispatch<CategoryAction>
) => {
  try {
    dispatch({
      type: CategoryTypes.GET_LIST_CATEGORIES,
    });
    const token =
      typeof window !== "undefined"
        ? window.localStorage.getItem("token")
        : null;
    const {
      data: {
        data: { categories: list },
      },
    } = await getHttpRequest(Category.LIST_CATEGORIES_AND_CREATE, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: CategoryTypes.GET_LIST_CATEGORIES_SUCCESS,
      payload: {
        list,
      },
    });
  } catch (error) {
    const { data } = error.response;
    dispatch({
      type: CategoryTypes.GET_LIST_CATEGORIES_FAIL,
      payload: {
        error: data,
      },
    });
  }
};

export const ToggleCategory = (_id: string): CategoryAction => {
  return {
    type: CategoryTypes.TOGGLE,
    payload: {
      categoryID: _id,
    },
  };
};

export const CreateCategory = (): CategoryAction => ({
  type: CategoryTypes.CREATE_CATEOGRY,
});

export const CreateCategorySuccess = (
  newCategory: CategoryType
): CategoryAction => ({
  type: CategoryTypes.CREATE_CATEGORY_SUCCESS,
  payload: {
    newCategory,
  },
});

export const CreateCategoryFail = (error: any): CategoryAction => ({
  type: CategoryTypes.CREATE_CATEGORY_FAIL,
  payload: {
    error,
  },
});
