import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import Login from './components/Login/Login';
import CashRegister from './components/CashRegister/CashRegister';

export default class App extends Component {

  render () {
    return (
      <Switch>
        <Route exact path='/' render={ () => <Login />} />
        <Route exact path='/cashregister' render={ () => <CashRegister />} />
      </Switch>
    );
  }
}
