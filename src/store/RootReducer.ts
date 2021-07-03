import { combineReducers } from 'redux';
import AuthReducer from './Auth/reducer';
import UserReducer from './user/reducer';
import categoryReducer from './category/reducer';
import productReducer from './product/reducer';
import roleReducer from './role/reducer';
import staffReducer from './staff/reducer';
import analyticReducer from './analytics/reducer';

import invoiceReducer from './invoice/reducer';

const RootReducer = combineReducers({
  Auth: AuthReducer,
  user: UserReducer,
  category: categoryReducer,
  product: productReducer,
  role: roleReducer,
  staff: staffReducer,
  analytic: analyticReducer,
  invoice: invoiceReducer,
});

export type RootState = ReturnType<typeof RootReducer>;

export default RootReducer;
