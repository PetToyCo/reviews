import rootReducer from './rootReducer.js';

const { createStore } = Redux;

const store = createStore(rootReducer, {

});

export default store;
