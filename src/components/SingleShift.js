import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import styles from 'material-ui/lib/styles';
import InlineSVG from 'svg-inline-react';

const colors = styles.Colors;

export default class UserProfile extends React.Component {

	render() {
		return (
			<ListItem
        leftAvatar={
          <Avatar
          icon = {<InlineSVG 
            src={require('../icons/DayShift.svg')}
          />}
          backgroundColor={colors.transparent}
          />
        }
        onClick={this.props.onClick}
      >
        {this.props.data}
      </ListItem>
		)
	}

  // handleClick() {
  //   console.log("kdalijfdowijeowiqo");
  //   console.log(this.props);
  // }
}
