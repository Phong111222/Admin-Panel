import { RootState } from './../RootReducer';
import { getHttpRequest } from './../../utils/api';
import { Dispatch } from 'redux';
import { InvoiceAction, InvoiceTypes } from './types';
import { Invoice } from '../../utils/contanst';
import AxiosConfig from '../../config/axiosConfig';
import { GetListProducts } from '../product/actions';
import { ThunkAction } from 'redux-thunk';
import { notification } from 'antd';

export const getListInvoice =
  () => async (dispatch: Dispatch<InvoiceAction>) => {
    try {
      dispatch({
        type: InvoiceTypes.GET_LIST_INVOICES,
      });
      const token = window.localStorage.getItem('token') || null;
      const {
        data: {
          data: { invoices: list },
        },
      } = await getHttpRequest(Invoice.LIST_INVOICE, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: InvoiceTypes.GET_LIST_INVOICES_SUCCESS,
        payload: {
          list,
        },
      });
    } catch (error) {
      dispatch({
        type: InvoiceTypes.GET_LIST_INVOICES_FAIL,
        payload: {
          error: error.response,
        },
      });
    }
  };

export const confirmInvoice =
  (id: string): ThunkAction<void, RootState, unknown, InvoiceAction> =>
  async (dispatch) => {
    try {
      dispatch({
        type: InvoiceTypes.CONFIRM_INVOICE,
      });
      const token = window.localStorage.getItem('token') || null;
      await AxiosConfig.patch(Invoice.CONFIRM(id), undefined, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: InvoiceTypes.CONFIRM_INVOICE_SUCCESS,
        payload: {
          invoiceID: id,
        },
      });
      dispatch(GetListProducts());
      notification.success({
        message: 'Comfirm invoice successfully',
        duration: 2,
        onClose: () => notification.destroy(),
      });
    } catch (error) {
      dispatch({
        type: InvoiceTypes.CONFIRM_INVOICE_FAIL,
        payload: {
          error: error.reponse,
        },
      });
    }
  };
