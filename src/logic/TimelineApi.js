
import { fetchAuth } from '../services/fetch';

export default {
  fetchPhotos(endpoint) {
    return dispatch =>
      fetchAuth(endpoint)
        .then(result => result.json())
        .then(photos => dispatch({
          type: 'LIST',
          payload: {
            photos
          }
        }));
  },

  likePhoto({id}) {
    return dispatch => {
      return fetchAuth(`fotos/${id}/like`, { method: 'POST' })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Não foi possível realizar o like na foto');
          }
        })
        .then(liker => dispatch({
          type: 'LIKE',
          payload: {
            id,
            liker
          }
        }));
    }
  },

  commentPhoto({id, comment}) {
    return dispatch => {
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
        .then(comment => dispatch({
          type: 'COMMENT',
          payload: {
            id,
            comment
          }
        }));
    }
  }
}