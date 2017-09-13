import React, { Component } from 'react';
import { connect } from 'react-redux';
import PubSub from 'pubsub-js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import PhotoItem from './PhotoItem';
import Message from './Message';
import api from '../logic/TimelineApi';

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: []
    };
    this.user = props.user || '';
    this.subscriptions = [];
  }

  componentDidMount() {
    this.fetchTimelineData();
  }

  componentWillReceiveProps(nextProps) {
    let nextUser = nextProps.match && nextProps.match.params && nextProps.match.params.user;
    if (nextUser !== this.user) {
      this.user = nextUser;
      this.fetchTimelineData();
    }
  }

  componentWillUnmount() {
    this.subscriptions.forEach(sub => PubSub.unsubscribe(sub));
    this.subscriptions = [];
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  fetchTimelineData() {
    let endpoint;
    this.props.list(this.user);
  }

  render() {
    return (
      <div className="fotos container">
        <ReactCSSTransitionGroup
            transitionName="timeline"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            {
              this.props.message
                ? <Message value={this.props.message}/>
                : this.props.photos.map(p => (
                  <PhotoItem
                    key={p.id}
                    photo={p}
                    onLike={this.props.likePhoto}
                    onComment={this.props.commentPhoto}/>
              ))
            }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    photos: state.timeline.photos,
    message: state.header.message
  };
}

const mapDispatchToProps = dispatch => {
  return {
    list: (user) => dispatch(api.listPhotos(user)),
    likePhoto: ({id}) => dispatch(api.likePhoto({id})),
    commentPhoto: ({id, comment}) => dispatch(api.commentPhoto({id, comment}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);