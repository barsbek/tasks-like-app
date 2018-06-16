import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.task.text
    }

    this.timer = null;

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const text = e.target.value;
    this.setState({ text });

    const { task, updateAsync } = this.props;

    clearTimeout(this.timer);
    this.timer = setTimeout(
      () => updateAsync({ ...task, id: task.id, text }),
    300);
  }

  render() {
    const { text } = this.state;
    const { task, removeAsync } = this.props;
    const { id, saved } = task;

    return (
      <li style={{color: saved ? 'green' : 'red' }}>
        {id}
        <input
          type="text"
          value={text}
          onChange={this.handleChange}
        />
        <a
          href="#"
          onClick={() => removeAsync(task)}
          style={{ color: 'red' }}>
          x
        </a>
      </li>
    )
  }
}

const mapDispatch = ({ list: { updateAsync, removeAsync }}) => ({
  updateAsync,
  removeAsync
})

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
    saved: PropTypes.bool
  }),

  updateAsync: PropTypes.func
}

export default connect(null, mapDispatch)(Task);
