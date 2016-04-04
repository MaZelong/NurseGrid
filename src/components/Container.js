import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import Avatar from 'material-ui/lib/avatar';
import styles from 'material-ui/lib/styles';
import InlineSVG from 'svg-inline-react';
import Face from 'material-ui/lib/svg-icons/image/tag-faces';
import moment from 'moment';


const colors = styles.Colors;
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      shift: props.location.state.shift,
      workSite: props.location.state.workSite,
      color: '#' + props.location.state.workSite.colorHex
    }
  }

  componentDidMount() {
    if (this.state.shift.shiftId >= 0) {
      this.handleTime();
      this.handleShiftType();
      this.handleShiftIcon();
    }
  }

  handleTime() {
    const startDate = moment(this.state.shift.start);
    const endDate = moment(this.state.shift.end);
    this.setState({
      startDate: startDate.format("MMM-Do"),
      start: startDate.format("HH:mm"),
      end: endDate.format("HH:mm")
    });
  }

  handleShiftType() {
    const shiftTypes = {
      0: 'Regular Shift',
      1: 'On Call',
      2: 'Vacation',
      3: 'Education',
      4: 'Meeting',
      5: 'Payday',
      64: 'Available To Work'
    };
    this.setState({
      shiftType: shiftTypes[this.state.shift.shiftTypeId]
    });
  }

  handleShiftIcon() {
    let src = ''
    if (moment(this.state.shift.start).hour() >= 6 && moment(this.state.shift.start).hour() < 12) {
      src = require('../icons/DayShift.svg');
    }
    if (moment(this.state.shift.start).hour() >= 12 && moment(this.state.shift.start).hour() < 17) {
      src = require('../icons/SwingShift.svg');
    }
    if (moment(this.state.shift.start).hour() >= 17 || moment(this.state.shift.start).hour() < 6) {
      src = require('../icons/NightShift.svg');
    }
    this.setState({
      iconSrc: src
    });
  }


  render() {
      if (this.state.shift.shiftId >= 0) {
        return (
          <Card>
            <CardHeader
              style={{'text-align': 'center'}}
              avatar={
                <Avatar
                  icon = {<InlineSVG 
                    src={this.state.iconSrc}
                  />}
                  backgroundColor={colors.transparent}
                />} />
            <CardTitle style={{'text-align': 'center'}} title={moment(this.state.shift.start).format("MMM-Do")} />
            <CardText style={{'text-align': 'center'}}>
              <p>
                <span style={{color: colors.cyan500}}>{this.state.start} To {this.state.end}</span><br/>
                <span style={{color: colors.cyan500}}>{this.state.shiftType}</span>
              </p>
              <p style={{color:this.state.color}}>
                <span>{this.state.workSite.departmentName}</span><br/>
                <span>{this.state.workSite.hospitalName}</span><br/>
              </p>
            </CardText>
          </Card>
        )
      } else {
        return (
          <Card>
            <CardHeader
              style={{'text-align': 'center'}}
              avatar={
                <Avatar
                  icon = {<Face />}
                  color={colors.deepOrange500}
                  backgroundColor={colors.transparent}
                />} />
            <CardTitle style={{'text-align': 'center'}} title={moment(this.state.shift.start).format("MMM-Do")} />
            <CardText style={{'text-align': 'center'}}>
              <p>
                <span style={{color: colors.deepOrange500}}>You have a dayoff</span><br/>
              </p>
              <p style={{color:this.state.color}}>
                <span>Enjoy Your Day</span><br/>
              </p>
            </CardText>
          </Card>
        )
      }
  }

}
