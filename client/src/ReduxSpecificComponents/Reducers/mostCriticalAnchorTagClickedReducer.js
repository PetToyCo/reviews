const mostCriticalAnchorTagClickedReducer = function(state = false, action) {
  if (action.type === 'UPDATE_MOST_CRITICAL_ANCHOR_TAG_CLICKED') {
    return action.payload;
  } else {
    return state;
  }
};

export default mostCriticalAnchorTagClickedReducer;
