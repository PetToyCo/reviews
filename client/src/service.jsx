import store from './ReduxSpecificComponents/store.js';
import ReviewHeader from './Components/ReviewHeader/index.jsx';
import ReviewBody from './Components/ReviewBody/index.jsx';
import Reviews from './Components/Reviews/index.jsx';

const { Provider } = ReactRedux;

class ReviewsModule extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <ReviewHeader />
        <ReviewBody />
        <Reviews />
      </div>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <ReviewsModule />
  </Provider>,
  document.getElementById('REVIEWS_ATTACH_POINT'),
);

export default ReviewsModule;
