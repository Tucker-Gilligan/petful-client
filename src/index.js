import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App/App';
// import { BrowserRouter } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { PetProvider } from './PetContext';
ReactDOM.render(
  <Router>
    <PetProvider>
      <App />
    </PetProvider>
  </Router>,

  document.getElementById('root')
);
