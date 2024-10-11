import React from 'react';
import Navbar from './Navbar'; 
import { BrowserRouter as Router} from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
      </div>
    </Router>
  );
};

export default App;

