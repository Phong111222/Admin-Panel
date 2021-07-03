import { ProductType } from '../product/types';

export const InvoiceTypes = {
  GET_LIST_INVOICES: 'invoice/GET_LIST_INVOICES',
  GET_LIST_INVOICES_SUCCESS: 'invoice/GET_LIST_INVOICES_SUCCESS',
  GET_LIST_INVOICES_FAIL: 'invoice/GET_LIST_INVOICES_FAIL',
  CONFIRM_INVOICE: 'invoice/CONFIRM_INVOICE',
  CONFIRM_INVOICE_SUCCESS: 'invoice/CONFIRM_INVOICE_SUCCESS',
  CONFIRM_INVOICE_FAIL: 'invoice/CONFIRM_INVOICE_FAIL',
  GET_INVOICE_BY_ID: 'invoice/GET_INVOICE_BY_ID',
};
export interface InvoiceType {
  paymentDate: any;
  tax: number;
  shippingFee: number;
  isConfirm: boolean;
  confirmDate: any;
  _id: string;
  fromStaff: {
    invoices: string[];
    isActive: boolean;
    _id: string;
    firstname: string;
    lastname: string;
    gender: string;
    contactEmail: string;
    address: string;
    company: string;
    phone: string;
    avatar: any;
  };
  clientInfo: {
    isActive: boolean;
    _id: string;
    fullname: string;
    gender: string;
    email: string;
  };
  productList: ProductType[];
  total: number;
  createdAt: any;
  updatedAt: any;
}

export interface InvoiceState {
  loading: boolean;
  list: InvoiceType[];
  error: any;
}

export interface InvoicePayload {
  list?: InvoiceType[];
  error?: any;
  invoiceID?: string;
}

export interface InvoiceAction {
  type:
    | typeof InvoiceTypes.CONFIRM_INVOICE
    | typeof InvoiceTypes.CONFIRM_INVOICE_FAIL
    | typeof InvoiceTypes.CONFIRM_INVOICE_SUCCESS
    | typeof InvoiceTypes.GET_INVOICE_BY_ID
    | typeof InvoiceTypes.GET_LIST_INVOICES
    | typeof InvoiceTypes.GET_LIST_INVOICES_FAIL
    | typeof InvoiceTypes.GET_LIST_INVOICES_SUCCESS;
  payload?: InvoicePayload;
}
