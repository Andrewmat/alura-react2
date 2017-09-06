import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PhotoUpdates extends Component {

  likeEvent(e) {
    e.preventDefault();
    this.props.onLike({
      id: this.props.photo.id
    })
  }

  commentEvent(e) {
    e.preventDefault();
    this.props.onComment({
      id: this.props.photo.id,
      comment: this.comment.value
    })
      .then(() => this.comment.value = '');
  }

  render() {
    return (
      <section className="fotoAtualizacoes">
        <button onClick={this.likeEvent.bind(this)} className={this.props.photo.likeada ? 'fotoAtualizacoes-like-ativo' : 'fotoAtualizacoes-like'}>Likar</button>
        <form className="fotoAtualizacoes-form" onSubmit={this.commentEvent.bind(this)}>
          <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" ref={input => this.comment = input} />
          <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit" />
        </form>
      </section>
    );
  }
}

class PhotoInfo extends Component {
  render() {
    return (
      <div className="foto-info">
        <div className="foto-info-likes">
          {
            this.props.photo.likers.map(liker => (
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
                <Link to={`/timeline/${comment.login}`} className="foto-info-autor">{comment.login}</Link>
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