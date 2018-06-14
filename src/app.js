import React from 'react';
import { connect } from 'react-redux';

import List from './components/List';
import NewTask from './components/NewTask';

class App extends React.Component {

  componentDidMount() {
    this.props.loadAsync();
  }

  render() {
    return (
      <div>
        { this.props.loading ? '...loading' :  <List /> }
        <NewTask />
      </div>
    )
  }
}

const mapState = ({ list: { loading }}) => ({ loading });

const mapDispatch = ({ list: {
  loadAsync
}}) => ({ loadAsync });

export default connect(mapState, mapDispatch)(App);
