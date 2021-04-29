import React from 'react';
import MakeRoute from './Routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import WrappedLayout from './components/app/WrappedLayout';
import useAuth from './Hook/useAuth';
import Login from './components/Auth/login/Login';
import WrappedAuth from './components/app/WrappedAuth';

const peristor = persistStore(store);

const App: React.FC = () => {
  const token = useAuth();
  return (
    <Provider store={store}>
      <PersistGate persistor={peristor} loading={null}>
        <Router>
          <WrappedAuth>
            {token ? (
              <WrappedLayout>
                <MakeRoute />
              </WrappedLayout>
            ) : (
              <Login />
            )}
          </WrappedAuth>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
