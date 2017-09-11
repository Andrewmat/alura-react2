
const listAction = (photos) => ({
  type: 'LIST',
  payload: {
    photos
  }
});

const likeAction = (id, liker) => ({
  type: 'LIKE',
  payload: {
    id,
    liker
  }
});

const commentAction = (id, comment) => ({
  type: 'COMMENT',
  payload: {
    id,
    comment
  }
});

const alertAction = (message) => ({
  type: 'ALERT',
  payload: {
    message
  }
});

export {
  listAction,
  likeAction,
  commentAction,
  alertAction
};