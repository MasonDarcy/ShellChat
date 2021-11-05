export const getMessageCallback = (store, keys) => {
  return (e) => {
    let msg = JSON.parse(e.data);
    store.dispatch({
      type: keys.newMessage,
      payload: { message: msg },
    });
  };
};
