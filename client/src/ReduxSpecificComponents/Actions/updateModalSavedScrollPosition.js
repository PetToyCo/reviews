const updateModalSavedScrollPosition = function(data) {
  return {
    type: 'UPDATE_MODAL_SAVED_SCROLL_POSITION',
    payload: data,
  };
};

export default updateModalSavedScrollPosition;
