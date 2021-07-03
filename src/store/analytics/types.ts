export const AnalyticTypes = {
  GET_TOTAL: 'analytic/GET_TOTAL',
  GET_RANK_STAFF: 'analytic/GET_RANK_STAFF',
  GET_RANK_PRODUCT: 'analytic/GET_RANK_PRODUCT',
  GET_REVENUE: 'analytic/GET_REVENUE',
  GET_ERROR: 'analytic/GET_ERROR',
  RESET_REVENUE: 'analytic/RESET_REVENUE',
};

export interface AnalyticState {
  total: {
    [key: string]: {
      active: number;
      inActive: number;
    };
  } | null;
  monthRevenue: {
    [key: string]: number;
  };
  listRankedStaff: {
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
    createdAt: any;
    updatedAt: any;

    revenueMake: number;
  }[];
  listRankedProduct: {
    name: string;
    value: number;
  }[];
  error: any;
}

export interface AnalyticPayload {
  total?: AnalyticState['total'];
  listRankedStaff?: AnalyticState['listRankedStaff'];
  listRankedProduct?: AnalyticState['listRankedProduct'];
  monthRevenue?: AnalyticState['monthRevenue'];
  error?: any;
}

export interface AnalyticActions {
  type:
    | typeof AnalyticTypes.GET_TOTAL
    | typeof AnalyticTypes.GET_RANK_PRODUCT
    | typeof AnalyticTypes.GET_RANK_STAFF
    | typeof AnalyticTypes.GET_REVENUE
    | typeof AnalyticTypes.RESET_REVENUE
    | typeof AnalyticTypes.GET_ERROR;
  payload?: AnalyticPayload;
}
