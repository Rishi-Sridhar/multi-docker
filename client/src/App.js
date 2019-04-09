import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link  } from "react-router-dom";
import otherPage from './otherPage';
import fib from './fib';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Welcome to React for Fibonacci Series</h1>
            <Link to="/">Home</Link>
            <Link to="/otherPage">Other Page</Link>
          </header>
          <div>
            <Route exact path="/" component={fib} />
            <Route exact path="/otherPage" component={otherPage} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
