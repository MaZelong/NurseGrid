import React from 'react';
import { render } from 'react-dom'
import {Router, Route, Link, browserHistory} from 'react-router';
import routes from './config/routes';
render(
  <Router history={browserHistory}>{routes}</Router>,
  document.getElementById('root')
);
