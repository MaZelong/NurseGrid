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
           worksites: data.result.worksites
         });

         for (var i=0;i<data.result.shifts.length-1; i++) {
           let curr = moment(data.result.shifts[i].start);
           let next = moment(data.result.shifts[i+1].start);
           if (next.dayOfYear() - curr.dayOfYear() > 1) {
             let newDate = {
               "shiftId": -1 - curr.format('X'),
               "shiftTypeId": -1,
               "userId": 124261,
               "worksiteId": -1,
               "hospitalId": -1,
               "hospitalName": null,
               "departmentId": -1,
               "start": curr.add(1, 'days').format('YYYY MM DD'),
               "end": '',
               "timeZone": null,
               "swapStatusId": null,
               "isCharge": null,
               "isFlexOff": null,
               "isOvertime": null,
               "acceptedUnownedSwapGroupId": null,
               "pendingUnownedSwapGroupId": null,
               "notes": null,
               "granted": null
             }
             data.result.shifts.splice(i+1, 0, newDate);
           }
         }
         this.setState({
           shifts: data.result.shifts
         });
       });
  }

  render() {
    return (
      <Card>
        <CardTitle title={"Welcome"} />
        <List>
          {this.state.shifts.map(function(shift, i) {
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
            let boundClick = this.handleClick.bind(this, i, shift, workSite);
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

  handleClick(index, item, site) {
    this.props.history.pushState({shift: item, workSite: site}, "/" + this.state.userId + "/shifts/" + this.state.shifts[index].shiftId);
  }


}
