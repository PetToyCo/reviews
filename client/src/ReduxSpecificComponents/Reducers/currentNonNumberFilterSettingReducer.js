const currentNonNumberFilterSettingReducer = function(state = 'Most Recent', action) {
  if (action.type === 'UPDATE_CURRENT_NON_NUMBER_FILTER_SETTING') {
    return action.payload;
  } else {
    return state;
  }
};

export default currentNonNumberFilterSettingReducer;
