const updateCurrentNonNumberFilterSetting = function(data) {
  return {
    type: 'UPDATE_CURRENT_NON_NUMBER_FILTER_SETTING',
    payload: data,
  };
};

export default updateCurrentNonNumberFilterSetting;
