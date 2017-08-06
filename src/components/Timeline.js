import React, { Component } from 'react';
import PhotoItem from './PhotoItem';

export default class Timeline extends Component {
  constructor() {
    super();
    this.state = {
      photos: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:8080/api/public/fotos/alots')
      .then(result => result.json())
      .then(photos => {
        this.setState({ photos });
      })
      ;
  }

  render() {
    return (
      <div className="fotos container">
        {
          this.state.photos.map(p => (
            <PhotoItem photo={p} />
          ))
        }
        <PhotoItem />
        <PhotoItem />
      </div>
    );
  }
}