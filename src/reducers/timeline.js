
export default function timeline(state, action) {
  if (action.type === 'LIST') {
    return action.payload.photos;
  }

  if (action.type === 'LIKE') {
    return likeAction(state, action);
  }

  if (action.type === 'COMMENT') {
    return commentAction(state, action);
  }
  return state;
};

const likeAction = (state, action) => {
  let { id, liker } = action.payload;
  const photo = state.find(ph => ph.id === id);
  if (!photo) {
    throw new Error('Like in undefined photo');
  }
  photo.likeada = !photo.likeada;
  if (!photo.likers.find(l => l.login === liker.login)) {
    photo.likers.push(liker);
  } else {
    photo.likers = photo.likers.filter(l => l.login !== liker.login);
  }
  return state;
}

const commentAction = (state, action) => {
  let { id, comment } = action.payload;
  const photo = state.find(p => p.id === id);
  if (!photo) {
    throw new Error('Like in undefined photo');
  }
  photo.comentarios.push(comment);
  return state;
}