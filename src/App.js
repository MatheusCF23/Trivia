import React from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from './trivia.png';
import Login from './pages/Login';
import Game from './pages/Game';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/game" component={ Game } />
          </Switch>
        </header>
      </div>
    );
  }
}

export default App;
