import React from 'react';
import Router from 'react-router';
import TextField from 'material-ui/lib/text-field';
import Card from 'material-ui/lib/card/card';

class SearchUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  handleChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  handleSubmit() {
    const userId = this.state.text;
    this.state.text = '';
    this.props.history.pushState(null, "/" + userId + "/shifts");
  }

  render() {
    let that = this;
    return (
      <div>
        <TextField type="text" hintText="Input User Id" value={that.state.text} onChange={this.handleChange.bind(this)} onEnterKeyDown={this.handleSubmit.bind(this)}/>
      </div>
    )
  }
}

SearchUser.propTypes = {
  history: React.PropTypes.object.isRequired
}


export default SearchUser