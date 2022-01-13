import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Products from './components/Products';

export default function Routes() {
  return (
    <Switch>
      <Route exact path='/login'>
        <Login />
      </Route>
      <Route exact path='/home'>
        <Home />
      </Route>
      <Route exact path='/products'>
        <Products />
      </Route>

      <Redirect to={'/home'} />
    </Switch>
  );
}
