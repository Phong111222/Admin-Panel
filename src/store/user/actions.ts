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
    const response = getHttpRequest(User.user_info, {
      headers: `Bearer ${token}`,
    });
    console.log(response);
  } catch (error) {}
};
