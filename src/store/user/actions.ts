import { Dispatch } from 'react';
import { getHttpRequest } from '../../utils/api';
import { User } from '../../utils/contanst';
import { UserAction, UserTypes } from './types';

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

export const ResetUser = () => {
  return {
    type: UserTypes.RESET_USER,
  };
};
