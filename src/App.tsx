import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";
import WrappedAuth from "./components/app/WrappedAuth";
import WrappedLayout from "./components/app/WrappedLayout";
import Login from "./components/Auth/login/Login";
import useAuth from "./Hook/useAuth";
import MakeRoute from "./Routes";
import store from "./store";

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
