import React, { Component } from 'react';

class PhotoUpdates extends Component {
  render() {
    return (
      <section className="fotoAtualizacoes">
        <a href="#" className="fotoAtualizacoes-like">Likar</a>
        <form className="fotoAtualizacoes-form">
          <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" />
          <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit" />
        </form>
      </section>
    );
  }
}

class PhotoInfo extends Component {
  render() {
    return (
      <div className="foto-in fo">
        <div className="foto-info-likes">
          <a href="#">alots_ssa</a>, <a href="#">rafael_rollo</a> curtiram
        </div>
        <p className="foto-info-legenda">
          <a className="foto-info-autor">autor </a>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, illo?
        </p>

        <ul className="foto-info-comentarios">
          {
            this.props.photo.comentarios.map(comm => (
              <li className="comentario">
                <a className="foto-info-autor">seguidor</a>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem ad, molestiae.
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
          <img src={this.props.photo.urlPerfil} alt="foto do usuario" />
          <figcaption className="foto-usuario">
            <a href="#">{this.props.photo.loginUsuario}</a>
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
        <img alt="foto" className="foto-src" src={this.props.foto.urlFoto}/>
        <PhotoInfo {...this.props}/>
        <PhotoUpdates/>
      </div>
    );
  }
}