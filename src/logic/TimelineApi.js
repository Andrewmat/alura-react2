
import { fetchAuth, fetchPublic } from '../services/fetch';
import { listAction, likeAction, commentAction, alertAction } from '../actions/actionCreator';

export default {
  listPhotos(user) {
    return user
      ? this.fetchPhotos(`/public/fotos/${user}`)
      : this.fetchPhotos(`/fotos`);
  },

  fetchPhotos(endpoint) {
    return dispatch =>
      fetchAuth(endpoint)
        .then(validateResponse)
        .then(photos => dispatch(listAction(photos)))
        .catch(e => {
          console.error(e);
          throw new Error('Não foi possível listar as fotos');
        })
  },

  likePhoto({id}) {
    return dispatch => {
      return fetchAuth(`fotos/${id}/like`, { method: 'POST' })
        .then(validateResponse)
        .then(liker => dispatch(likeAction(id, liker)))
        .catch(e => {
          console.error(e);
          throw new Error('Não foi possível realizar o like na foto');
        })
    }
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
        .then(validateResponse)
        .then(comment => dispatch(commentAction(id, comment)))
        .catch(e => {
          console.error(e);
          throw new Error('Erro ao inserir comentário na foto');
        })
  },

  searchPhotos({query}) {
    return dispatch =>
      fetchPublic(`fotos/${query}`)
        .then(validateResponse)
        .then(results => {
          if (results.length === 0) {
            dispatch(alertAction('A busca não trouxe resultados'));
          } else {
            dispatch(listAction(results));
          }
        })
        .catch(e => {
          throw new Error('Não foi possível completar a busca');
        })
  }
}

function validateResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`Not ok response: [${response.status}] ${response.statusText}`);
  }
}