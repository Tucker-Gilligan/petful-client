import React from 'react';

import Routes from '../Routes/Routes';
import Nav from '../Nav/Nav';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App__main">
        <Nav />
        <Routes />
      </div>
    );
  }
}

export default App;
