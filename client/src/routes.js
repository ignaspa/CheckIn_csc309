import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import SignUp from './components/SignUp'
import Home from './components/Home';


export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='signup' component={SignUp} />
    <Route path='*' component={Home} />
  </Route>
);