import { Reducer } from 'redux';
import {
  InvoiceAction,
  InvoiceState,
  InvoiceType,
  InvoiceTypes,
} from './types';

const initialState: InvoiceState = {
  list: [],
  loading: false,
  error: null,
};
const invoiceReducer: Reducer<InvoiceState, InvoiceAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case InvoiceTypes.GET_LIST_INVOICES:
      return { ...state, loading: false };

    case InvoiceTypes.GET_LIST_INVOICES_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload?.list as InvoiceType[],
      };
    case InvoiceTypes.GET_LIST_INVOICES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload?.error,
      };
    case InvoiceTypes.CONFIRM_INVOICE:
      return { ...state, loading: true };
    case InvoiceTypes.CONFIRM_INVOICE_SUCCESS: {
      const newList = state.list.map((invoice) =>
        invoice._id === action.payload?.invoiceID
          ? { ...invoice, isConfirm: true }
          : invoice
      );
      return {
        ...state,
        loading: false,
        list: [...newList],
      };
    }
    case InvoiceTypes.CONFIRM_INVOICE_FAIL:
      return { ...state, loading: false, error: action.payload?.error };
    default:
      return state;
  }
};

export default invoiceReducer;
