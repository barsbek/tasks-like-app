import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Task from './Task';

const List = ({ tasks }) => (
  <ul>
    {tasks.map((t, index) =>
      <Task key={index} {...t}/>
    )}
  </ul>
);

const mapState = ({ list: { tasks }}) => ({
  tasks: Object.values(tasks)
});

List.propTypes = {
  tasks: PropTypes.array
}

export default connect(mapState)(List);
