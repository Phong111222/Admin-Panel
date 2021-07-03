import { Dispatch } from 'redux';
import { getHttpRequest } from '../../utils/api';
import { Analytic } from '../../utils/contanst';
import { AnalyticActions, AnalyticTypes } from './types';

export const getDataAnalytic =
  () => async (dispatch: Dispatch<AnalyticActions>) => {
    try {
      const token = window.localStorage.getItem('token') || null;
      const {
        data: { data: total },
      } = await getHttpRequest(Analytic.GET_TOTAL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const {
        data: {
          data: { rankedList: listRankedStaff },
        },
      } = await getHttpRequest(Analytic.GET_RANK_STAFF, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const {
        data: {
          data: { resRankedProduct: listRankedProduct },
        },
      } = await getHttpRequest(Analytic.GET_RANK_PRODUCT, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({
        type: AnalyticTypes.GET_TOTAL,
        payload: {
          total,
        },
      });
      dispatch({
        type: AnalyticTypes.GET_RANK_STAFF,
        payload: {
          listRankedStaff,
        },
      });
      dispatch({
        type: AnalyticTypes.GET_RANK_PRODUCT,
        payload: {
          listRankedProduct,
        },
      });
    } catch (error) {
      dispatch({
        type: AnalyticTypes.GET_ERROR,
        payload: {
          error: error.response,
        },
      });
    }
  };

export const getRevenueByYear =
  (year: number) => async (dispatch: Dispatch<AnalyticActions>) => {
    try {
      const token = window.localStorage.getItem('token') || null;
      const {
        data: {
          data: { monthRevenue },
        },
      } = await getHttpRequest(Analytic.GET_MONTHLY_REVENUE_BY_YEAR(year), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: AnalyticTypes.GET_REVENUE,
        payload: {
          monthRevenue,
        },
      });
    } catch (error) {
      dispatch({
        type: AnalyticTypes.GET_ERROR,
        payload: error.response,
      });
    }
  };

export const resetRevenue = (): AnalyticActions => ({
  type: AnalyticTypes.RESET_REVENUE,
});
