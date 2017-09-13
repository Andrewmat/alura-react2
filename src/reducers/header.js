
export default function header(state = { message: '' }, action) {
  if (action.type === 'ALERT') {
    return alert(state, action);
  }

  return state;
}

const alert = (state, action) => {
  return {
    message: action.payload.message
  };
}