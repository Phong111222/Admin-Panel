import { Reducer } from "redux";
import { StaffActions, StaffState, StaffType, StaffTypes } from "./types";

const initialState: StaffState = {
  loading: false,
  list: [],
  error: null,
};

const staffReducer: Reducer<StaffState, StaffActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case StaffTypes.GET_STAFF_LIST:
      return { ...state, loading: true };
    case StaffTypes.GET_STAFF_LIST_FAIL:
      return { ...state, loading: false, error: action.payload?.error };
    case StaffTypes.GET_STAFF_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload?.list as StaffType[],
      };
    case StaffTypes.TOGGLE_STAFF: {
      const newList = state.list.map((staff) =>
        staff._id === action.payload?.staffID
          ? { ...staff, isActive: !staff.isActive }
          : staff
      );
      return {
        ...state,
        list: [...newList],
      };
    }
    case StaffTypes.CREATE_STAFF:
      return { ...state, loading: false };
    case StaffTypes.CREATE_STAFF_SUCCESS: {
      const newList = [...state.list];
      newList.push(action.payload?.newStaff as StaffType);
      return { ...state, loading: false, list: newList };
    }
    case StaffTypes.CREATE_STAFF_FAIL:
      return { ...state, loading: false, error: action.payload?.error };
    case StaffTypes.UPDATE_STAFF:
      return { ...state, loading: true };
    case StaffTypes.UPDATE_STAFF_SUCCESS: {
      const updatedStaff = action.payload?.newStaff;
      const newList = state.list.map((staff) =>
        staff._id === action.payload?.staffID
          ? { ...staff, ...updatedStaff }
          : staff
      );
      return { ...state, loading: false, list: newList };
    }
    case StaffTypes.UPDATE_STAFF_FAIL:
      return { ...state, error: action.payload?.error };
    default:
      return state;
  }
};

export default staffReducer;
