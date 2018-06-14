import React from 'react';
import { connect } from 'react-redux';

const Todos = ({ todos, onRemove, onUpdate }) => (
  <ul>
    {todos.map((t, index) =>
      <li
        key={index}
        onClick={() => onRemove(t)}
        style={{color: t.saved ? 'green' : 'red' }}>
        {t.id} {t.text}

        <a href="#"
          style={{coloe: 'blue'}}
          onClick={e => {e.preventDefault(); onUpdate(t)}}>
          U
        </a>
      </li>
    )}
  </ul>
);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      id: 0
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
  }

  componentDidMount() {
    this.props.loadAsync();
  }

  handleSubmit(e) {
    e.preventDefault();
    const { id, text } = this.state;
    if(id) {
      this.props.updateAsync({ id, text });
    } else {
      this.props.addAsync({ text: this.state.text });
    }

    this.setState({ text: '', id: null });
  }

  handleChange(e) {
    const text = e.target.value;
    const { id } = this.state;
    if(id) {
      this.props.update({ id, text });
    }

    this.setState({ text });
  }

  handleUpdateClick(t) {
    const { id, text } = this.props.todos[t.id];
    this.setState({ text, id });
  }

  render() {
    const todosArray = Object.values(this.props.todos);
    return (
      <div>
        {this.props.loading ?
          '...loading' : 
          <Todos
            todos={todosArray}
            onRemove={this.props.remove}
            onUpdate={this.handleUpdateClick}
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
  todos: state.todos.list,
  loading: state.todos.loading
});

const mapDispatch = ({ todos }) => todos;

export default connect(mapState, mapDispatch)(App);
