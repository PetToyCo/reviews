const showNonNumberFilterSettingReducer = function(state = false, action) {
  if (action.type === 'UPDATE_SHOW_NON_NUMBER_FILTER_SETTING') {
    return action.payload;
  } else {
    return state;
  }
};

export default showNonNumberFilterSettingReducer;
