const mostFavorableAnchorTagClickedReducer = function(state = false, action) {
  if (action.type === 'UPDATE_MOST_FAVORABLE_ANCHOR_TAG_CLICKED') {
    return action.payload;
  } else {
    return state;
  }
};

export default mostFavorableAnchorTagClickedReducer;
