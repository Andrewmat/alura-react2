import React, { Component } from 'react';

import PhotoItem from './PhotoItem';
import { requestServer } from '../utils/Auth';

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
      endpoint = `/public/fotos/${this.user}`;
    } else {
      endpoint = `/fotos`;
    }
    requestServer(endpoint)
      .then(result => {
        return result.json();
      })
      .then(photos => {
        this.setState({ photos });
      });
  }

  componentDidMount() {
    if (this.props.match && this.props.match.params && this.props.match.params.user) {
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