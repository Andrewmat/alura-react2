import React, { Component } from 'react';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div id="root">
        <div className="main">
          <Header />
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;