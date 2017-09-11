import React, { Component } from 'react';

export default class Message extends Component {
  render() {
    return (
      <span className="alert">{this.props.value}</span>
    );
  }
}