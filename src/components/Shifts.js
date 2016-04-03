import React from 'react';
import Router from 'react-router';
import Shift from './SingleShift';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';


import $ from 'jquery';

export default class Shifts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      shifts: []
    }
  }
  componentDidMount() {
    this.init(this.props.params.userId);
  }

  componentWillReceiveProps(nextProps) {

    this.init(nextProps.params.userId);
  }

  init(userId) {
    console.log(userId);
    let that = this;
    $.ajax({
      url: `https://app-stage.nursegrid.com/users/${userId}?clientToken=2d3a4b997a757ce8ac488ef74a2711`,
      method: 'PUT',
      crossDomain: true,
      dataType: 'jsonp'
    })
    .done((data) => {
      that.setState({
        userName: data.result.displayName,
        userId: data.result.userId,
        shifts: data.result.shifts,
        worksites: data.result.worksites
      });
    });
  }
  
  componentWillUnMount() {

  }

  render() {
    return (
      <List>
        {this.state.shifts.map(function(shift, i) {
          var boundClick = this.handleClick.bind(this, i);
          return (
            <Shift onClick={boundClick} key={i} data={shift.hospitalName} />
          );
        }, this)}
      </List>
    )
  }

  renderItem(item, index) {
    //let that = this;
    let boundClick = this.handleClick.bind(this, index, item);
    return (
      <Shift
        onClick={boundClick}
        key = {index}
        data={item.hospitalName} />
    )
  }

  handleClick(index, item) {
    console.log("kdalijfdowijeowiqo");
    console.log(this.context);
    this.props.history.pushState(null, "/" + this.state.userId + "/shifts/" + this.state.shifts[index].shiftId);
  }


}
