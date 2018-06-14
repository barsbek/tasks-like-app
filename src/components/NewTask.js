import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewTask extends Component {
  constructor(props) {
    super(props);

    this.state = { text: '' }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      <form onSubmit={this.handleSubmit}>
        <input
          value={this.state.text}
          onChange={this.handleChange}
        />
        <input type="submit" value="add" />
      </form>
    )
  }
}

const mapDispatch = ({ list: {
  addAsync
}}) => ({ addAsync });

export default connect(null, mapDispatch)(NewTask);

