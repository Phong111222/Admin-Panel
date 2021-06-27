import { Dispatch } from 'redux';
import { getHttpRequest } from '../../utils/api';
import { Role } from '../../utils/contanst';
import { RoleAction, RoleType, RoleTypes } from './types';

export const GetRoleList = () => async (dispatch: Dispatch<RoleAction>) => {
  try {
    dispatch({
      type: RoleTypes.GET_ROLE_LIST,
    });

    const token =
      (typeof window !== 'undefined' && window.localStorage.getItem('token')) ||
      null;
    const {
      data: { data },
    } = await getHttpRequest(Role.LIST_AND_CREATE_ROLE, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: RoleTypes.GET_ROLE_LIST_SUCCESS,
      payload: {
        list: data.roles,
      },
    });
  } catch (error) {
    const { data } = error.response;
    console.log(data);
  }
};

export const ToggleRole = (roleID: string): RoleAction => {
  return {
    type: RoleTypes.TOGGLE_ROLE,
    payload: {
      roleID,
    },
  };
};

export const CreateRole = (): RoleAction => ({ type: RoleTypes.CREATE_ROLE });

export const CreateRoleSuccess = (newRole: RoleType): RoleAction => ({
  type: RoleTypes.CREATE_ROLE_SUCCESS,
  payload: {
    newRole,
  },
});

export const CreateRoleFail = (error: any): RoleAction => ({
  type: RoleTypes.CREATE_ROLE_FAIL,
  payload: {
    error,
  },
});
