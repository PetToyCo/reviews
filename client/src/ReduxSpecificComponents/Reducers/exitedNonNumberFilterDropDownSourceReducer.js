const exitedNonNumberFilterDropDownSourceReducer = function(state = false, action) {
  if (action.type === 'UPDATE_EXITED_NON_NUMBER_FILTER_DROP_DOWN_SOURCE') {
    return action.payload;
  } else {
    return state;
  }
};

export default exitedNonNumberFilterDropDownSourceReducer;
