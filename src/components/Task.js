import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.text
    }

    this.handleChange = this.handleChange.bind(this);
    this.timer = null;
  }

  handleChange(e) {
    const text = e.target.value;
    this.setState({ text });

    const { id, updateAsync } = this.props;

    clearTimeout(this.timer);
    this.timer = setTimeout(
      () => updateAsync({ id, text }),
    300);
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

const mapDispatch = ({ list: { updateAsync }}) => ({
  updateAsync
})

Task.propTypes = {
  id: PropTypes.number,
  text: PropTypes.string,
  saved: PropTypes.bool,

  updateAsync: PropTypes.func
}

export default connect(null, mapDispatch)(Task);
