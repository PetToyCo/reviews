import store from './ReduxSpecificComponents/store.js';
import ReviewsModule from './service.jsx';

const { Provider } = ReactRedux;

ReactDOM.render(
  <Provider store={store}>
    <ReviewsModule />
  </Provider>,
  document.getElementById('REVIEWS_ATTACH_POINT'),
);
