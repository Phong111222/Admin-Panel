import React, { useEffect } from 'react';
import MakeRoute from './Routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import jwt_decode from 'jwt-decode';
const peristor = persistStore(store);

const App: React.FC = () => {
  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      const currentDate = new Date();
      const jwt_decoded = jwt_decode<{ exp: number }>(token);
    }
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={peristor} loading={<>loading</>}>
        <Router>
          <MakeRoute />
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
