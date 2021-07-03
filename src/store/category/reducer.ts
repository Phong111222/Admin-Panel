import { Reducer } from "redux";
import {
  CategoryAction,
  CategoryState,
  CategoryType,
  CategoryTypes,
} from "./types";

const inititalState: CategoryState = {
  loading: false,
  list: [],
  error: null,
};

const categoryReducer: Reducer<CategoryState, CategoryAction> = (
  state = inititalState,
  action
) => {
  switch (action.type) {
    case CategoryTypes.GET_LIST_CATEGORIES:
      return { ...state, loading: true };
    case CategoryTypes.GET_LIST_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        list: [...(action.payload?.list as CategoryType[])],
      };
    case CategoryTypes.GET_LIST_CATEGORIES_FAIL:
      return { ...state, loading: false, error: { ...action.payload?.error } };
    case CategoryTypes.TOGGLE: {
      const newList = state.list.map((item) =>
        item._id === action.payload?.categoryID
          ? { ...item, isActive: !item.isActive }
          : item
      );
      return { ...state, list: [...newList] };
    }
    case CategoryTypes.CREATE_CATEOGRY:
      return { ...state, loading: true };
    case CategoryTypes.CREATE_CATEGORY_SUCCESS: {
      const newList = [...state.list];
      newList.push(action.payload?.newCategory as CategoryType);
      return { ...state, loading: false, list: newList };
    }
    case CategoryTypes.CREATE_CATEGORY_FAIL:
      return { ...state, loading: false, error: action.payload?.error };
    default:
      return state;
  }
};

export default categoryReducer;
