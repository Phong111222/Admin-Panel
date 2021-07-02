import { notification } from "antd";
import { encode } from "js-base64";
import { Dispatch } from "react";
import { ThunkAction } from "redux-thunk";
import { postHttp } from "../../utils/api";
import { Auth, BasicAuth } from "../../utils/contanst";
import { RootState } from "../RootReducer";
import { GetInfoUser } from "../user/actions";
import { UserAction } from "../user/types";
import { AuthActions, AuthActionTypes } from "./types";

export const login = (
  data: { email: string; password: string },
  history: any
) => async (
  dispatch: Dispatch<
    AuthActions | ThunkAction<void, RootState, any, UserAction>
  >
) => {
  try {
    dispatch({
      type: AuthActionTypes.SENDING_LOGIN,
    });
    const {
      data: {
        data: { token },
      },
    } = await postHttp(
      Auth.LOGIN,
      { ...data, role: "dev" },
      {
        headers: {
          Authorization: `Basic ${encode(
            `${BasicAuth.basicauth_user}:${BasicAuth.basicauth_password}`
          )}`,
        },
      }
    );
    typeof window !== "undefined" &&
      window.localStorage.setItem("token", token);
    dispatch({ type: AuthActionTypes.LOGIN_SUCCESS });
    dispatch(GetInfoUser());
    notification.success({
      message: "LOGIN SUCCESS",
      duration: 3,
      onClose: () => {
        notification.destroy();
        window.location.replace("/home");
      },
    });
  } catch (errors) {
    const {
      response: {
        data: { message },
      },
    } = errors;
    dispatch({ type: AuthActionTypes.LOGIN_FAIL });
    notification.error({
      message: message,
      duration: 3,
      onClose: () => notification.destroy(),
    });
  }
};
//Register
export const register = (
  data: {
    email: string;
    password: string;
    fullname: string;
  },
  history: any
) => async (dispatch: Dispatch<AuthActions>) => {
  try {
    dispatch({
      type: AuthActionTypes.SENDING_REGISTER,
    });
    await postHttp(Auth.REGISTER, data, {
      headers: {
        Authorization: `Basic ${encode(
          `${BasicAuth.basicauth_user}:${BasicAuth.basicauth_password}`
        )}`,
      },
    });

    dispatch({ type: AuthActionTypes.REGISTER_SUCCESS });
    notification.success({
      message: "REGISTER SUCCESS",
      duration: 3,
      onClose: () => {
        notification.destroy();
        history.push("/login");
      },
    });
  } catch (errors) {
    const {
      response: {
        data: {
          message: { email: message },
        },
      },
    } = errors;
    dispatch({
      type: AuthActionTypes.REGISTER_FAIL,
    });
    notification.error({
      message: message,
      duration: 3,
      onClose: () => notification.destroy(),
    });
  }
};

export const logout = () => {
  return {
    type: AuthActionTypes.RESET_AUTH,
  };
};
