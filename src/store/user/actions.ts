import { Dispatch } from 'react';
import { getHttpRequest } from '../../utils/api';
import { User } from '../../utils/contanst';
import { UserAction, UserType, UserTypes } from './types';

export const GetInfoUser = () => async (dispatch: Dispatch<UserAction>) => {
  try {
    dispatch({
      type: UserTypes.GET_USER,
    });
    const token =
      typeof window !== 'undefined'
        ? window.localStorage.getItem('token')
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
