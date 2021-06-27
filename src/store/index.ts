import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import RootReducer from './RootReducer';
import thunk from 'redux-thunk';
const composeEnhacers = composeWithDevTools({ trace: true });

const persistConfig = {
  key: 'root',
  storage: storage,

  stateReconciler: autoMergeLevel2, // Xem thêm tại mục "Quá trình merge".
  whitelist: ['Auth', 'user', 'category', 'product', 'role'],
};

const pReducer = persistReducer(persistConfig, RootReducer as any);
const store = createStore(pReducer, composeEnhacers(applyMiddleware(thunk)));

export default store;
