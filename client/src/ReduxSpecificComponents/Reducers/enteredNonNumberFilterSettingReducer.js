const enteredNonNumberFilterSettingReducer = function(state = false, action) {
  if (action.type === 'UPDATE_ENTERED_NON_NUMBER_FILTER_SETTING') {
    return action.payload;
  } else {
    return state;
  }
};

export default enteredNonNumberFilterSettingReducer;
