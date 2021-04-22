import { combineReducers } from 'redux';
import AuthReducer from './Auth/reducer';
import UserReducer from './user/reducer';
const RootReducer = combineReducers({
  Auth: AuthReducer,
  user: UserReducer,
});

export type RootState = ReturnType<typeof RootReducer>;

export default RootReducer;
