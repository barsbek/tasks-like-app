import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.text
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  render() {
    const { text } = this.state;
    const { id, saved } = this.props;

    return (
      <li style={{color: saved ? 'green' : 'red' }}>
        {id}
        <input
          type="text"
          value={text}
          onChange={this.handleChange}
        />
      </li>
    )
  }
}

Task.propTypes = {
  id: PropTypes.number,
  text: PropTypes.string,
  saved: PropTypes.bool
}

export default Task;
