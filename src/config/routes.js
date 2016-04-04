import React from 'react';
import App from '../components/App';
import Home from '../components/Home';
import Shifts from '../components/Shifts';
import Shift from '../components/SingleShift';
import Container from '../components/Container';
import {Route, IndexRoute} from 'react-router';

export default (
  <Route path="/" component={App}>
    <Route path=":userId/shifts" component={Shifts} />
    <Route path=":userId/shifts/:shiftId" component={Container} />
    <IndexRoute component={Home} />
  </Route>
);
