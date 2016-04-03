import React from 'react';
import Router from 'react-router';
import Shift from './SingleShift';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';


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
      <Card>
        <CardTitle title="NurseGrid XXXX" />
        <List>
          {this.state.shifts.map(function(shift, i) {
            let boundClick = this.handleClick.bind(this, i);
            let shiftWorkSiteId = shift.worksiteId;
            let workSite = this.state.worksites.filter((worksite, index) => {
              return worksite.worksiteId === shift.worksiteId && worksite.hospitalId === shift.hospitalId;
            })[0];
            return (
              <CardText>
              <Shift 
                onClick={boundClick} 
                key={i}
                shift={shift}
                workSite={workSite} />
                </CardText>
            );
          }, this)}
        </List>
      </Card>
    )
  }

  handleClick(index, item) {
    console.log("kdalijfdowijeowiqo");
    console.log(this.context);
    //this.props.history.pushState(null, "/" + this.state.userId + "/shifts/" + this.state.shifts[index].shiftId);
  }


}
