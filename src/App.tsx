import React from 'react';
import MakeRoute from './Routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import WrappedLayout from './components/app/WrappedLayout';

const peristor = persistStore(store);

const App: React.FC = () => {
  return (
    // <Provider store={store}>
    //   <PersistGate persistor={peristor} loading={<>loading</>}>
    //     <Router>
    //       <MakeRoute />
    //     </Router>
    //   </PersistGate>
    // </Provider>
    <WrappedLayout>
      <div>Phong</div>
    </WrappedLayout>
  );
};

export default App;
