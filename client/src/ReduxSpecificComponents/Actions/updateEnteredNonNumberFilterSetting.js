const updateEnteredNonNumberFilterSetting = function(data) {
  return {
    type: 'UPDATE_ENTERED_NON_NUMBER_FILTER_SETTING',
    payload: data,
  };
};

export default updateEnteredNonNumberFilterSetting;
