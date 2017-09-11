import { List } from 'immutable';

export default function timeline(state = {photos: new List(), message: ''}, action) {
  if (action.type === 'LIST') {
    return { photos: new List(action.payload.photos) };
  }

  if (action.type === 'LIKE') {
    return { photos: likeAction(state, action) };
  }

  if (action.type === 'COMMENT') {
    return { photos: commentAction(state, action) };
  }

  if (action.type === 'ALERT') {
    return { message: action.payload.message };
  }

  return state;
};

const likeAction = (state, action) => {
  let { id, liker } = action.payload;

  return changePhoto(state.photos, id, photo => {
    let likeada = !photo.likeada;
    let likers;
    if (!photo.likers.find(l => l.login === liker.login)) {
      likers = photo.likers.concat(liker);
    } else {
      likers = photo.likers.filter(l => l.login !== liker.login);
    }
    return {
      likeada,
      likers
    };
  });
}

const commentAction = (state, action) => {
  let { id, comment } = action.payload;
  return changePhoto(state, id, photo => ({
    comentarios: photo.comentarios.concat(comment)
  }));
}

function changePhoto(list, id, propCallback) {
  const photoIndex = list.findIndex(p => p.id === id);
  const photo = list.get(photoIndex);
  if (!photo) {
    throw new Error('Undefined photo');
  }
  let updPhoto = Object.assign({}, photo, propCallback(photo));
  return list.set(photoIndex, updPhoto);
}