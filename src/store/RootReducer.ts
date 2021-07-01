import { combineReducers } from 'redux';
import AuthReducer from './Auth/reducer';
import UserReducer from './user/reducer';
import categoryReducer from './category/reducer';
import productReducer from './product/reducer';
import roleReducer from './role/reducer';
import staffReducer from './staff/reducer';
const RootReducer = combineReducers({
  Auth: AuthReducer,
  user: UserReducer,
  category: categoryReducer,
  product: productReducer,
  role: roleReducer,
  staff: staffReducer,
});

export type RootState = ReturnType<typeof RootReducer>;

export default RootReducer;
