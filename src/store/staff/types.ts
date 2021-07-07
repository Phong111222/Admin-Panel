import { ProductType } from '../product/types';

export const StaffTypes = {
  GET_STAFF_LIST: 'staff/GET_STAFF_LIST',
  GET_STAFF_LIST_FAIL: 'staff/GET_STAFF_LIST_FAIL',
  GET_STAFF_LIST_SUCCESS: 'staff/GET_STAFF_LIST_SUCCESS',
  CREATE_STAFF: 'staff/CREATE_STAFF',
  CREATE_STAFF_FAIL: 'staff/CREATE_STAFF_FAIL',
  CREATE_STAFF_SUCCESS: 'staff/CREATE_STAFF_SUCCESS',
  TOGGLE_STAFF: 'staff/TOGGLE_STAFF',
  UPDATE_STAFF: 'staff/UPDATE_STAFF',

  UPDATE_STAFF_SUCCESS: 'staff/UPDATE_STAFF_SUCCESS',
  UPDATE_STAFF_FAIL: 'staff/UPDATE_STAFF_FAIL',
};

export interface StaffType {
  invoices: {
    paymentDate: any;
    tax: number;
    shippingFee: number;
    isConfirm: boolean;
    confirmDate: any;
    _id: string;
    fromStaff: string;
    clientInfo: string;
    productList: ProductType[];
    total: number;
    createdAt: any;
    updatedAt: any;
  }[];
  isActive: boolean;
  _id: string;
  firstname: string;
  lastname: string;
  gender: string;
  contactEmail: string;
  address: string;
  company: string;
  phone: string;
  avatar: null;
  createdAt: any;
  updatedAt: any;
}

export interface StaffState {
  list: StaffType[];
  loading: boolean;
  error: any;
}

export interface StaffPayload {
  list?: StaffType[];
  error?: any;
  staffID?: string;
  newStaff?: StaffType;
}

export interface StaffActions {
  type:
    | typeof StaffTypes.CREATE_STAFF
    | typeof StaffTypes.CREATE_STAFF_FAIL
    | typeof StaffTypes.CREATE_STAFF_SUCCESS
    | typeof StaffTypes.GET_STAFF_LIST
    | typeof StaffTypes.GET_STAFF_LIST_FAIL
    | typeof StaffTypes.TOGGLE_STAFF
    | typeof StaffTypes.GET_STAFF_LIST_SUCCESS
    | typeof StaffTypes.UPDATE_STAFF
    | typeof StaffTypes.UPDATE_STAFF_FAIL
    | typeof StaffTypes.UPDATE_STAFF_SUCCESS;

  payload?: StaffPayload;
}
