import React from 'react';
import Router from 'react-router';
import Shift from './SingleShift';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import moment from 'moment';


import $ from 'jquery';

export default class Shifts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: props.userName,
      userId: props.userId,
      worksites: props.worksites,
      shifts: props.shifts
    }
  }
  componentDidMount() {
    this.init(this.props);
  }

  componentWillReceiveProps(nextProps) {

    this.init(nextProps);
  }

  init(props) { 
    this.setState({
      userName: props.userName,
      userId: props.userId,
      worksites: props.worksites,
      shifts: props.shifts
    });
  }

  render() {
    return (
      <Card>
        <CardTitle title={"Welcome"} />
        <List>
          {this.state.shifts.map(function(shift, i) {
            let boundClick = this.handleClick.bind(this, i);
            let shiftWorkSiteId = shift.worksiteId;
            let workSite;
            if (shift.worksiteId === -1) {
              workSite = {
                "worksiteId": -1,
                "userId": 124261,
                "hospitalId": -1,
                "hospitalName": null,
                "departmentId": -1,
                "departmentName": "NONE",
                "originalDepartmentName": null,
                "managedDepartmentId": null,
                "ownerId": null,
                "permissionIds": [],
                "employmentTypeId": null,
                "hired": null,
                "isCharge": null,
                "managerName": null,
                "managerFirstName": null,
                "managerLastName": null,
                "managerEmail": null,
                "colorHex": "FF5722"
              }
            } else {
              workSite = this.state.worksites.filter((worksite, index) => {
                return worksite.worksiteId === shift.worksiteId && worksite.hospitalId === shift.hospitalId;
              })[0];
            }
            return (
              <Card key={i}>
                <CardTitle subtitleStyle={{color:'#'+workSite.colorHex}} title={moment(shift.start).format("MMM-Do")} subtitle={workSite.hospitalName} />
                <Shift 
                  onClick={boundClick} 
                  key={i}
                  shift={shift}
                  workSite={workSite} />
              </Card>
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
