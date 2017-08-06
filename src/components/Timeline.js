import React, { Component } from 'react';
import FotoItem from './FotoItem';

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
            <FotoItem fotoUrl={p} />
          ))
        }
        <FotoItem />
        <FotoItem />
      </div>
    );
  }
}