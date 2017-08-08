import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PubSub from 'pubsub-js';

import { requestServer } from '../utils/Auth';

class PhotoUpdates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: this.props.photo.likeada
    };
  }

  likePhoto(e) {
    e.preventDefault();
    requestServer(`/fotos/${this.props.photo.id}/like`, { method: 'POST' })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Não foi possível realizar o like na foto');
        }
      })
      .then(liker => {
        this.setState({
          liked: !this.state.liked
        });
        PubSub.publish('photo-like', { id: this.props.photo.id, liker })
      })
      .catch(error => {
        alert(e.message);
      })
  }

  render() {
    return (
      <section className="fotoAtualizacoes">
        <button onClick={this.likePhoto.bind(this)} className={this.state.liked ? 'fotoAtualizacoes-like-ativo' : 'fotoAtualizacoes-like'}>Likar</button>
        <form className="fotoAtualizacoes-form">
          <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" />
          <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit" />
        </form>
      </section>
    );
  }
}

class PhotoInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likers: this.props.photo.likers
    };
    this.subscriptions = [];
  }

  componentWillMount() {
    this.subscriptions.push(
      PubSub.subscribe('photo-like', (topic, likeData) => {
        if (this.props.photo.id === likeData.id) {
          let likers;
          let liker = this.state.likers.find(l => l.login === likeData.liker.login);
          if (!liker) {
            likers = this.state.likers.concat(likeData.liker);
          } else {
            likers = this.state.likers.filter(l => l.login !== likeData.liker.login);

          }
          this.setState({ likers });

        }
      })
    )
  }

  componentWillUnmount() {
    this.subscriptions.forEach(sub => PubSub.unsubscribe(sub));
    this.subscriptions = [];
  }

  render() {
    return (
      <div className="foto-info">
        <div className="foto-info-likes">
          {
            this.state.likers.map(liker => (
              <span key={liker.login}>
                <Link to={`/timeline/${liker.login}`}>{liker.login}</Link>,
              </span>
            ))
          }
          curtiram
        </div>
        <p className="foto-info-legenda">
          <Link to={`/timeline/${this.props.photo.loginUsuario}`} className="foto-info-autor">{this.props.photo.loginUsuario}</Link>
          <span> {this.props.photo.comentario}</span>
        </p>

        <ul className="foto-info-comentarios">
          {
            this.props.photo.comentarios.map(comment => (
              <li className="comentario" key={comment.id}>
                <Link to={`/timeline/comment.login`} className="foto-info-autor">{comment.login}</Link>
                {comment.texto}
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

class PhotoHeader extends Component {
  render() {
    return (
      <header className="foto-header">
        <figure className="foto-usuario">
          <img src={this.props.photo.urlPerfil} alt={this.props.photo.loginUsuario} />
          <figcaption className="foto-usuario">
            <Link to={`/timeline/${this.props.photo.loginUsuario}`}>{this.props.photo.loginUsuario}</Link>
          </figcaption>
        </figure>
        <time className="foto-data">{this.props.photo.horario}</time>
      </header>
    );
  }
}

export default class PhotoItem extends Component {
  render() {
    return (
      <div className="foto">
        <PhotoHeader {...this.props} />
        <img alt="foto" className="foto-src" src={this.props.photo.urlFoto} />
        <PhotoInfo {...this.props} />
        <PhotoUpdates {...this.props} />
      </div>
    );
  }
}