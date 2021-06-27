export const RoleTypes = {
  GET_ROLE_LIST: 'role/GET_ROLE_LIST',
  GET_ROLE_LIST_SUCCESS: 'role/GET_ROLE_LIST_SUCCESS',
  GET_ROLE_LIST_FAIL: 'role/GET_ROLE_LIST_FAIL',
  CREATE_ROLE: 'role/CREATE_ROLE',
  CREATE_ROLE_FAIL: 'role/CREATE_ROLE_FAIL',
  CREATE_ROLE_SUCCESS: 'role/CREATE_ROLE_SUCCESS',
  TOGGLE_ROLE: 'role/TOGGLE_ROLE',
};

export interface RoleType {
  name: string;
  _id: string;
  permissions: string[];
  methods: string[];
  user: string[];
  isActive: boolean;
}

export interface RoleState {
  list: RoleType[];
  error: any;
  loading: boolean;
}

export interface RolePayload {
  list?: RoleType[];
  newRole?: RoleType;
  error?: any;
  roleID?: string;
}

export interface RoleAction {
  type:
    | typeof RoleTypes.CREATE_ROLE
    | typeof RoleTypes.CREATE_ROLE_FAIL
    | typeof RoleTypes.CREATE_ROLE_SUCCESS
    | typeof RoleTypes.GET_ROLE_LIST
    | typeof RoleTypes.GET_ROLE_LIST_FAIL
    | typeof RoleTypes.GET_ROLE_LIST_SUCCESS
    | typeof RoleTypes.TOGGLE_ROLE;
  payload?: RolePayload;
}
