import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import Login from './components/Login/Login';
import CashRegister from './components/CashRegister/CashRegister';

export default class App extends Component {

  render () {
    return (
      <Switch>
        <Route path='/' component={Login} />
        <Route path='/cashregister' component={CashRegister} />
        <Redirect path='/' />
      </Switch>
    );
  }
}
