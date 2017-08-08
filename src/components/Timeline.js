import React, { Component } from 'react';
import PhotoItem from './PhotoItem';

export default class Timeline extends Component {
  constructor() {
    super();
    this.state = {
      photos: []
    };
    this.user = '';
  }

  fetchTimelineData() {
    let endpoint;
    if (this.user) {
      endpoint = `http://localhost:8080/api/public/fotos/${this.user}`;
    } else {
      endpoint = `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
    }
    fetch(endpoint)
      .then(result => {
        return result.json();
      })
      .then(photos => {
        this.setState({ photos });
      });
  }

  componentDidMount() {
    if (this.props.match && this.props.match.params && this.props.match.params.user) {
      console.log(2);
      this.user = this.props.match.params.user;
    }
    this.fetchTimelineData();
  }

  componentWillReceiveProps(nextProps) {
    let nextUser = nextProps.match && nextProps.match.params && nextProps.match.params.user
    if (nextUser == null || nextUser !== this.user) {
      this.user = nextUser || '';
      this.fetchTimelineData();
    }
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