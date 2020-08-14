import { Switch } from 'react-router-dom';
import React from 'react';
import Route from './route';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import ForgotPassword from '../pages/ForgotPassword';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" exact component={SignUp} />
    <Route path="/dashboard" exact isPrivate component={Dashboard} />
    <Route path="/forgot-password" exact component={ForgotPassword} />
  </Switch>
);

export default Routes;
