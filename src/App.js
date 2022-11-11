import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import logo from './trivia.png';
import Login from './pages/Login';
import Game from './pages/Game';
// import './App.css';
import './style/Login.css';
import Settings from './pages/Settings';
import Ranking from './pages/Ranking';
import Feedback from './pages/Feedback';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={ logo } className="App-logo" alt="logo" /> */}
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/game" component={ Game } />
            <Route exact path="/settings" component={ Settings } />
            <Route exact path="/ranking" component={ Ranking } />
            <Route exact path="/feedback" component={ Feedback } />
          </Switch>
        </header>
      </div>
    );
  }
}

export default App;
