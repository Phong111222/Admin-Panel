import React from 'react';
import MakeRoute from './Routes';
import { BrowserRouter as Router } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <MakeRoute />
    </Router>
  );
};

export default App;
