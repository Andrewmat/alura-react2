
import { fetchAuth } from '../services/fetch';

export default class TimelineStore {
  constructor() {
    this.photos = null;
    this.subscriptions = [];
  }

  fetchPhotos(endpoint) {
    return fetchAuth(endpoint)
      .then(result => {
        return result.json();
      })
      .then(photos => {
        this.photos = photos;
        this._publish();
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
      })
      .then(liker => {
        const photo = this.photos.find(ph => ph.id === id);
        if (!photo) {
          throw new Error('Like in undefined photo');
        }
        photo.likeada = !photo.likeada;
        if (!photo.likers.find(l => l.login === liker.login)) {
          photo.likers.push(liker);
        } else {
          photo.likers = photo.likers.filter(l => l.login !== liker.login);
        }
        this._publish();
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
      })
      .then(comment => {
        const photo = this.photos.find(p => p.id === id);
        if (!photo) {
          throw new Error('Like in undefined photo');
        }
        photo.comentarios.push(comment);
        this._publish();
      });
  }

  subscribe(callback) {
    this.subscriptions.push(callback);
  }

  _publish() {
    this.subscriptions.forEach(callback => {
      callback(this.photos);
    });
  }
}