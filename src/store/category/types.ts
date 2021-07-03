export const CategoryTypes = {
  GET_LIST_CATEGORIES: "category/GET_LIST_CATEGORIES",
  GET_LIST_CATEGORIES_SUCCESS: "category/GET_LIST_CATEGORIES_SUCCESS",
  GET_LIST_CATEGORIES_FAIL: "category/GET_LIST_CATEGORIES_FAIL",
  TOGGLE: "category/TOGGLE",
  CREATE_CATEOGRY: "category/CREATE_CATEGORY",
  CREATE_CATEGORY_FAIL: "category/CREATE_CATEGORY_FAIL",
  CREATE_CATEGORY_SUCCESS: "category/CREATE_CATEGORY_SUCCESS",
};

export interface CategoryType {
  isActive: boolean;
  name: string;
  products?: string[];
  _id?: string;
  description?: string;
}

export interface CategoryState {
  loading: boolean;
  list: CategoryType[];
  error: any;
}

export interface CategoryPayload {
  list?: CategoryType[];
  categoryID?: string;
  error?: any;
  newCategory?: CategoryType;
}

export interface CategoryAction {
  type:
    | typeof CategoryTypes.GET_LIST_CATEGORIES
    | typeof CategoryTypes.GET_LIST_CATEGORIES_FAIL
    | typeof CategoryTypes.GET_LIST_CATEGORIES_SUCCESS
    | typeof CategoryTypes.CREATE_CATEGORY_FAIL
    | typeof CategoryTypes.CREATE_CATEGORY_SUCCESS
    | typeof CategoryTypes.CREATE_CATEOGRY;
  payload?: CategoryPayload;
}
