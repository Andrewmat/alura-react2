import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import PhotoItem from './PhotoItem';
import api from '../logic/TimelineApi';

export default class Timeline extends Component {
  constructor() {
    super();
    this.state = {
      photos: []
    };
    this.user = '';
    this.subscriptions = [];
  }

  componentWillMount() {
    this.props.store.subscribe(() => {
      this.setState({ photos: this.props.store.getState() });
    })
    this.subscriptions.push(
      PubSub.subscribe('photo-search', (topic, photos) => {
        this.setState({ photos });
      })
    );
    this.subscriptions.push(
      PubSub.subscribe('photo-search-exit', (topic) => {
        this.user = '';
        this.fetchTimelineData();
      })
    );
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

  componentWillUnmount() {
    this.subscriptions.forEach(sub => PubSub.unsubscribe(sub));
    this.subscriptions = [];
  }

  fetchTimelineData() {
    let endpoint;
    if (this.user) {
      endpoint = `/public/fotos/${this.user}`;
    } else {
      endpoint = `/fotos`;
    }
    this.props.store.dispatch(api.fetchPhotos(endpoint));
  }

  likePhoto({id}) {
    return this.props.store.dispatch(api.likePhoto({id}));
  }

  commentPhoto({id, comment}) {
    return this.props.store.dispatch(api.commentPhoto({id, comment}));
  }

  render() {
    return (
      <div className="fotos container">
        <ReactCSSTransitionGroup
            transitionName="timeline"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            {
              this.state.photos.map(p => (
                <PhotoItem
                    key={p.id}
                    photo={p}
                    onLike={this.likePhoto.bind(this)}
                    onComment={this.commentPhoto.bind(this)}/>
              ))
            }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}