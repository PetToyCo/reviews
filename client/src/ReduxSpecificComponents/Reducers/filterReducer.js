const initialState = {
  '5': false,
  '4': false,
  '3': false,
  '2': false,
  '1': false,
  'MostRecent': true,
  'MostHelpful': false,
  'HighToLow': false,
  'LowToHigh': false,
},

const filterReducer = function(state = initialState, action) {
  if (action.type === 'UPDATE_FILTER') {
    const newState = {};
    Object.assign(newState, state);

    if (action.payload === 'MostRecent' || action.payload === 'MostHelpful' || action.payload === 'HighToLow' || action.payload === 'LowToHigh') {
      newState['MostRecent'] = false;
      newState['MostHelpful'] = false;
      newState['HighToLow'] = false;
      newState['LowToHigh'] = false;

      newState[action.payload] = true;
    } else if (action.payload === 'CANCEL_NUMERICAL_FILTERS') {
      newState['5'] = false;
      newState['4'] = false;
      newState['3'] = false;
      newState['2'] = false;
      newState['1'] = false;
    } else {
      if (action.option === 'ADD') {
        newState[action.payload] = true;
      }

      if (action.option === 'CANCEL') {
        newState[action.payload] = false;
      }
    }

    return newState;
  } else {
    return state;
  }
};

export default filterReducer;
