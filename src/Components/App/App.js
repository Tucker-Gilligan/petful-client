import React from 'react';

import Routes from '../Routes/Routes';
import Nav from '../Nav/Nav';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <section className="App__main">
          <Routes />
        </section>
      </div>
    );
  }
}

export default App;
