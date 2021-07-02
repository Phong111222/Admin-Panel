import { Dispatch } from "redux";
import { getHttpRequest } from "../../utils/api";
import { Staff } from "../../utils/contanst";
import { StaffActions, StaffType, StaffTypes } from "./types";

export const GetStaffList = () => async (dispatch: Dispatch<StaffActions>) => {
  try {
    dispatch({
      type: StaffTypes.GET_STAFF_LIST,
    });
    const token = window.localStorage.getItem("token") || null;
    const {
      data: {
        data: { staffs: list },
      },
    } = await getHttpRequest(Staff.create_staff_and_staff_list, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: StaffTypes.GET_STAFF_LIST_SUCCESS,
      payload: {
        list,
      },
    });
  } catch (error) {
    dispatch({
      type: StaffTypes.GET_STAFF_LIST_FAIL,
      payload: {
        error: error.reponse,
      },
    });
  }
};

export const ToggleStaff = (staffID: string): StaffActions => ({
  type: StaffTypes.TOGGLE_STAFF,
  payload: {
    staffID,
  },
});

export const CreateStaff = (): StaffActions => ({
  type: StaffTypes.CREATE_STAFF,
});

export const CreateStaffSucces = (newStaff: StaffType): StaffActions => ({
  type: StaffTypes.CREATE_STAFF_SUCCESS,
  payload: {
    newStaff,
  },
});

export const CreateStaffFail = (error: any): StaffActions => ({
  type: StaffTypes.CREATE_STAFF_FAIL,
  payload: {
    error,
  },
});
