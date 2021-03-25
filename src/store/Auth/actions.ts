import { Dispatch } from 'react';
import { postHttp } from '../../utils/api';
import { Auth, BasicAuth } from '../../utils/contanst';
import { AuthActions, AuthActionTypes } from './types';
import { encode } from 'js-base64';
const login = (data: { email: string; password: string }) => async (
  dispatch: Dispatch<AuthActions>
) => {
  try {
    dispatch({
      type: AuthActionTypes.SENDING_LOGIN,
    });
    const response = await postHttp(Auth.LOGIN, data, {
      headers: {
        Authorization: `Basic ${encode(
          `${BasicAuth.basicauth_user}:${BasicAuth.basicauth_password}`
        )}`,
      },
    });
    console.log(response);
  } catch (error) {}
};
