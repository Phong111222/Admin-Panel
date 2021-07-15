import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
// import WrappedAuth from './components/app/WrappedAuth';
import WrappedLayout from './components/app/WrappedLayout';
import Login from './components/Auth/login/Login';
import useAuth from './Hook/useAuth';
import MakeRoute from './Routes';
import store from './store';
import { ONESIGNAL_APPID } from './utils/contanst';
import jwt_decode from 'jwt-decode';
const peristor = persistStore(store);

//@ts-ignore
window.OneSignal = window.OneSignal || [];
//@ts-ignore
const OneSignal = window.OneSignal;

const App: React.FC = () => {
  const token = useAuth();
  if (token) {
    const currentDate = Date.now();
    const jwt_decoded = jwt_decode<{ exp: number; iat: number }>(token);
    if (jwt_decoded.exp * 1000 < currentDate) {
      window.location.replace('/logout');
    }
  }
  useEffect(() => {
    OneSignal.push(function () {
      OneSignal.init({
        appId: ONESIGNAL_APPID,
      });
    });
  }, []);
  // useEffect(() => {

  //   // eslint-disable-next-line
  // }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={peristor} loading={null}>
        <Router>
          {/* <WrappedAuth> */}
          {token ? (
            <WrappedLayout>
              <MakeRoute />
            </WrappedLayout>
          ) : (
            <Login />
          )}
          {/* </WrappedAuth> */}
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
