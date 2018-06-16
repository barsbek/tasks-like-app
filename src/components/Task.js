import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import './Task.sass';

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
      <div className={classNames('Task', { 'Task_saved': saved })}>
        <div className='Task__done'>
          <input type="checkbox" id={`task-checkbox-${id}`} />
          <label htmlFor={`task-checkbox-${id}`}/>
        </div>
        {id}
        <input
          className='Task__text'
          type="text"
          value={text}
          onChange={this.handleChange}
        />
        <a
          className='Task__remove'
          href="#"
          onClick={() => removeAsync(task)}>
          x
        </a>
      </div>
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
