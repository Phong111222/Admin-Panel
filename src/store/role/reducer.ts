import { Reducer } from "redux";
import { RoleAction, RoleState, RoleType, RoleTypes } from "./types";

const initialState: RoleState = {
  loading: false,
  list: [],
  error: null,
};
const roleReducer: Reducer<RoleState, RoleAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case RoleTypes.GET_ROLE_LIST:
      return { ...state, loading: true };
    case RoleTypes.GET_ROLE_LIST_FAIL:
      return { ...state, loading: false, error: action.payload?.error };

    case RoleTypes.GET_ROLE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload?.list as RoleType[],
      };
    case RoleTypes.TOGGLE_ROLE:
      return {
        ...state,
        list: state.list.map((role) =>
          role._id === action.payload?.roleID
            ? { ...role, isActive: !role.isActive }
            : role
        ),
      };
    case RoleTypes.CREATE_ROLE: {
      return { ...state, loading: true };
    }
    case RoleTypes.CREATE_ROLE_FAIL: {
      return { ...state, loading: false, error: action.payload?.error };
    }
    case RoleTypes.CREATE_ROLE_SUCCESS: {
      const newList = [...state.list];
      newList.push(action.payload?.newRole as RoleType);
      return { ...state, loading: false, list: newList };
    }
    default:
      return state;
  }
};

export default roleReducer;
