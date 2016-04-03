import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {AppBar, IconButton, FlatButton, RaisedButton, Paper} from 'material-ui';
require('../main.scss');
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import MyRawTheme from '../css/materialThemeCustomizations';
import Search from './SearchUser';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <AppBar
          title={<span> NurseGrid </span>}
        />
        <div class="col-md-6">           
          <Search history={this.props.history}/>
        </div>
        <hr />
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
