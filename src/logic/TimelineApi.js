
import { fetchAuth, fetchPublic } from '../services/fetch';
import { listAction, likeAction, commentAction, alertAction } from '../actions/actionCreator';

export default {
  fetchPhotos(endpoint) {
    return dispatch =>
      fetchAuth(endpoint)
        .then(result => result.json())
        .then(photos => dispatch(listAction(photos)));
  },

  likePhoto({id}) {
    return dispatch =>
      fetchAuth(`fotos/${id}/like`, { method: 'POST' })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Não foi possível realizar o like na foto');
          }
        })
        .then(liker => dispatch(likeAction(id, liker)));
  },

  commentPhoto({id, comment}) {
    return dispatch =>
      fetchAuth(`fotos/${id}/comment`, {
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
        .then(comment => dispatch(commentAction(id, comment)));
  },

  searchPhotos({query}) {
    return dispatch =>
      fetchPublic(`fotos/${query}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Não foi possível completar a busca');
          }
        })
        .then(results => {
          if (results.length === 0) {
            dispatch(alertAction('A busca não trouxe resultados'));
          } else {
            dispatch(listAction(results));
          }
        });
  }
}