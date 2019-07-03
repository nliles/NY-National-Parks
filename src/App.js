import React, { Component } from 'react';
import './App.css';
import ParkList from './components/ParkList';

class App extends Component {
  render() {
    return (
      <div className="container">
        <ParkList/>
      </div>
    );
  }
}

export default App;
