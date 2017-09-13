import { List } from 'immutable';

export default function timeline(state = {photos: new List(), message: ''}, action) {
  if (action.type === 'LIST') {
    return list(state, action);
  }

  if (action.type === 'LIKE') {
    return like(state, action);
  }

  if (action.type === 'COMMENT') {
    return comment(state, action);
  }

  return state;
};

const list = (state, action) => {
  return {
    photos: new List(action.payload.photos)
  };
}

const like = (state, action) => {
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

const comment = (state, action) => {
  let { id, comment } = action.payload;
  return changePhoto(state.photos, id, photo => ({
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
  return {
    photos: list.set(photoIndex, updPhoto)
  };
}