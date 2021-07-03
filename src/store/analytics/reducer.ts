import { Reducer } from 'redux';
import { AnalyticActions, AnalyticState, AnalyticTypes } from './types';

const initialState: AnalyticState = {
  total: null,
  monthRevenue: {},
  listRankedStaff: [],
  listRankedProduct: [],
  error: null,
};

const analyticReducer: Reducer<AnalyticState, AnalyticActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case AnalyticTypes.GET_TOTAL:
      return {
        ...state,
        total: action.payload?.total as AnalyticState['total'],
      };
    case AnalyticTypes.GET_RANK_STAFF:
      return {
        ...state,
        listRankedStaff: action.payload
          ?.listRankedStaff as AnalyticState['listRankedStaff'],
      };
    case AnalyticTypes.GET_RANK_PRODUCT:
      return {
        ...state,
        listRankedProduct: action.payload
          ?.listRankedProduct as AnalyticState['listRankedProduct'],
      };
    case AnalyticTypes.GET_REVENUE:
      return {
        ...state,
        monthRevenue: action.payload
          ?.monthRevenue as AnalyticState['monthRevenue'],
      };
    case AnalyticTypes.RESET_REVENUE:
      return { ...state, monthRevenue: initialState.monthRevenue };
    default:
      return state;
  }
};

export default analyticReducer;
