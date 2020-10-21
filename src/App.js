import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Enemy from './components/enemy';
import { UserProvider } from './context/battleContext';
import Home from './pages/home';
import './App.css';
import Button from 'react-bootstrap/Button';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Battle from './pages/battle';
import {BattleProvider} from './context/battleContext'


export default function App() {

  return (
    <Router>
      <BattleProvider>
      <div>
        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/battle">
          <Battle />
          </Route>
          <Route path="/users">
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
      </BattleProvider>
    </Router>
  );
}