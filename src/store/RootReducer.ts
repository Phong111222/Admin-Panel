import { combineReducers } from 'redux';
import AuthReducer from './Auth/reducer';

const RootReducer = combineReducers({
  Auth: AuthReducer,
});

export type RootState = ReturnType<typeof RootReducer>;

export default RootReducer;
