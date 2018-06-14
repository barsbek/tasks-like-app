import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class NewTask extends Component {
  constructor(props) {
    super(props);

    this.state = { text: '' }
  }

  handleSubmit(e) {
    e.preventDefault();

    const { text } = this.state;

    this.props.addAsync({ text });
    this.setState({ text: '' });
  }

  handleChange(e) {
    const text = e.target.value;
    this.setState({ text });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input
          value={this.state.text}
          onChange={this.handleChange.bind(this)}
        />
        <input type="submit" value="add" />
      </form>
    )
  }
}

const mapDispatch = ({ list: {
  addAsync
}}) => ({ addAsync });

NewTask.propTypes = {
  addAsync: PropTypes.func
}

export default connect(null, mapDispatch)(NewTask);

