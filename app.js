import React from 'react';
import { connect } from 'react-redux';

const Todos = ({ todos, onRemove }) => (
  <ul>
    {todos.map((t, index) =>
      <li key={index} onClick={() => onRemove(t)}>
        {t.text}
      </li>
    )}
  </ul>
);

let id = 0;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.loadAsync();
  }

  handleSubmit(e) {
    e.preventDefault();
    id++;
    const index = id;
    this.props.add({ index, text: this.state.text });
    this.setState({ text: '' });
    e.target.reset();
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  render() {
    return (
      <div>
        {this.props.loading ?
          '...loading' : 
          <Todos
            todos={this.props.todos}
            onRemove={this.props.remove}
          />
        }
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.text}
            onChange={this.handleChange}
          />
          <input type="submit" value="add" />
        </form>
      </div>
    )
  }
}

const mapState = state => ({ 
  todos: Object.values(state.todos.list),
  loading: state.todos.loading
});

const mapDispatch = ({ todos }) => todos;

export default connect(mapState, mapDispatch)(App);
