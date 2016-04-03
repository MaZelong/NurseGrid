import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import styles from 'material-ui/lib/styles';
import InlineSVG from 'svg-inline-react';
import moment from 'moment';

const colors = styles.Colors;

export default class UserProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      departmentName: props.workSite.departmentName,
      hospitalName: props.workSite.hospitalName,
      startTime: props.shift.start,
      endTime: props.shift.end,
      timeZone: props.shift.timeZone,
      shiftTypeId: props.shift.shiftTypeId
    }
  }

  componentDidMount() {
    this.handleTime();
    this.handleShiftType();
    this.handleShiftIcon();
  }

  handleTime() {
    const startDate = moment(this.state.startTime);
    const endDate = moment(this.state.endTime);
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
      shiftType: shiftTypes[this.state.shiftTypeId]
    });
  }

  handleShiftIcon() {
    let src = ''
    if (moment(this.state.startTime).hour() >= 6 && moment(this.state.startTime).hour() < 12) {
      src = require('../icons/DayShift.svg');
    }
    if (moment(this.state.startTime).hour() >= 12 && moment(this.state.startTime).hour() < 17) {
      src = require('../icons/SwingShift.svg');
    }
    if (moment(this.state.startTime).hour() >= 17) {
      src = require('../icons/NightShift.svg');
    }
    this.setState({
      iconSrc: src
    });
  }

	render() {
		return (
			<ListItem
        leftAvatar={
          <Avatar
          icon = {<InlineSVG 
            src={this.state.iconSrc}
          />}
          backgroundColor={colors.transparent}
          />
        }
        onClick={this.props.onClick}
        primaryText={
          <p>
            <span style={{color: colors.blue500}}>{this.state.startDate}</span><br/>
            <span>{this.state.start} To {this.state.end}</span>
          </p>
        }
        secondaryText={
          <p>
            <span style={{color: colors.grey500}}>{this.state.shiftType}</span><br/>
            {this.props.workSite.hospitalName}
            {this.props.workSite.departmentName}
          </p>
        }
      > 
      </ListItem>
		)
	}

}
