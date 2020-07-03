const updateFilter = function(data, option = null) {
  return {
    type: 'UPDATE_FILTER',
    payload: data,
    option,
  };
};

export default updateFilter;
