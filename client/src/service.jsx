import store from './ReduxSpecificComponents/store.js';
import ReviewHeader from './Components/ReviewHeader/index.jsx';
import ReviewBody from './Components/ReviewBody/index.jsx';
import Reviews from './Components/Reviews/index.jsx';
import updateReviewAverage from './ReduxSpecificComponents/Actions/updateReviewAverage.js';
import updateNumberOfReviews from './ReduxSpecificComponents/Actions/updateNumberOfReviews.js';
import updateAllReviews from './ReduxSpecificComponents/Actions/updateAllReviews.js';

const { Provider } = ReactRedux;

class ReviewsModule extends React.Component {
  constructor(props) {
    super();

  }

  componentDidMount() {
    axios.get('/reviews/100')
      .then((results) => {
        const { reviewAverage, numberOfReviews, allReviews } = results;

        store.dispatch(updateReviewAverage(reviewAverage));
        store.dispatch(updateNumberOfReviews(numberOfReviews));
        store.dispatch(updateAllReviews(allReviews));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    // console.log('Review freshly mounted')
    return (
      <div id="reviews-module" style={{ display: 'flex', flexDirection: 'column', flexShrink: '0' }}>
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
