import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import PhotoItem from './PhotoItem';
import { fetchAuth } from '../services/fetch';

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

    this.subscriptions.push(
      PubSub.subscribe('photo-like', (topic, likeData) => {
        const photo = this.state.photos.find(ph => ph.id === likeData.id);
        if (!photo) {
          throw new Error('Like in undefined photo');
        }
        photo.likeada = !photo.likeada;
        if (!photo.likers.includes(l => l.login === likeData.liker.login)) {
          photo.likers.push(likeData.liker);
        } else {
          photo.likers = photo.likers.filter(l => l.login !== likeData.liker.login);
        }
        this.setState({photos: this.state.photos});
      })
    )
    this.subscriptions.push(
      PubSub.subscribe('photo-comment', (topic, commentData) => {
        const photo = this.state.photos.find(p => p.id === commentData.id);
        if (!photo) {
          throw new Error('Like in undefined photo');
        }
        photo.comentarios.push(commentData.comment);
        this.setState({photo: this.state.photo});
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
    fetchAuth(endpoint)
      .then(result => {
        return result.json();
      })
      .then(photos => {
        this.setState({ photos });
      });
  }

  likePhoto({id}) {
    return fetchAuth(`fotos/${id}/like`, { method: 'POST' })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Não foi possível realizar o like na foto');
        }
      });
  }

  commentPhoto({id, comment}) {
    return fetchAuth(`fotos/${id}/comment`, {
      method: 'POST',
      body: JSON.stringify({
        texto: comment
      }),
      headers: new Headers({
        'Content-type': 'application/json'
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Erro ao inserir comentário na foto');
        }
      });
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