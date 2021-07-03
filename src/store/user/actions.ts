import { Dispatch } from "react";
import { getHttpRequest } from "../../utils/api";
import { User } from "../../utils/contanst";
import { UserAction, UserType, UserTypes } from "./types";

export const GetInfoUser = () => async (dispatch: Dispatch<UserAction>) => {
  try {
    dispatch({
      type: UserTypes.GET_USER,
    });
    const token =
      typeof window !== "undefined"
        ? window.localStorage.getItem("token")
        : null;
    const {
      data: {
        data: { userInfo, methods, routes, role },
      },
    } = await getHttpRequest(User.user_info, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: UserTypes.GET_USER_COMPLETE,
      payload: {
        user: userInfo,
        methods,
        role,
        routes,
      },
    });
  } catch (error) {}
};

export const GetUserList = () => async (dispatch: Dispatch<UserAction>) => {
  try {
    dispatch({
      type: UserTypes.GET_USER_LIST,
    });
    const token =
      typeof window !== "undefined"
        ? window.localStorage.getItem("token")
        : null;
    const {
      data: {
        data: { users: list },
      },
    } = await getHttpRequest(User.all_user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: UserTypes.GET_USER_LIST_SUCCESS,
      payload: {
        list,
      },
    });
  } catch (error) {
    const { data } = error.reponse;
    dispatch({
      type: UserTypes.GET_USER_LIST_FAIL,
      payload: {
        error: data,
      },
    });
  }
};

export const CreateUser = (): UserAction => ({
  type: UserTypes.CREATE_USER,
});

export const CreateUserSuccess = (newUser: UserType): UserAction => ({
  type: UserTypes.CREATE_USER_SUCCESS,
  payload: {
    newUser,
  },
});

export const CreateUserFail = (error: any): UserAction => ({
  type: UserTypes.CREATE_USER_FAIL,
  payload: {
    error,
  },
});

export const ResetUser = () => {
  return {
    type: UserTypes.RESET_USER,
  };
};

export const ToggleUser = (userID: string): UserAction => ({
  type: UserTypes.TOGGLE_USER,
  payload: {
    userID,
  },
});
