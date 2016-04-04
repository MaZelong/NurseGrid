import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Shifts from './Shifts';
import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import moment from 'moment';
import $ from 'jquery';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
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
    let that = this;
    return (
      <div className="row-fluid">
        <div className="col-xs-12 col-sm-6 col-lg-8">           
          <Shifts 
            userId={that.state.userId}
            userName={that.state.userName}
            shifts={that.state.shifts}
            worksites={that.state.worksites} />
        </div>                
        <div className="col-xs-6 col-lg-4">
          <Card>
            <CardTitle title="Hello World"></CardTitle>
            <CardText>
              <div>
                <h2>??????????</h2>
              </div>
            </CardText>
          </Card>
        </div>
      </div>
    );
  }
}
