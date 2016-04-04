import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {AppBar, IconButton, FlatButton, RaisedButton, Paper} from 'material-ui';
require('../main.scss');
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import MyRawTheme from '../css/materialThemeCustomizations';
import Search from './SearchUser';
import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container-fluid">
        <AppBar
          title={<span> NurseGrid </span>}
        />
        <div className="row-fluid">
          <div>           
            <Search history={this.props.history} />
          </div>                
        </div>
        <div className="row-fluid">
          {this.props.children}
        </div>
      </div>
    );
  }
}
