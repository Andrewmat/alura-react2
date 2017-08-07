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
    fetch(`http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`)
      .then(result => {
        return result.json();
      })
      .then(photos => {
        this.setState({ photos });
      });
  }

  render() {
    return (
      <div className="fotos container">
        {
          this.state.photos.map(p => (
            <PhotoItem key={p.id} photo={p} />
          ))
        }
      </div>
    );
  }
}