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
    //When working on service, uncomment this axios call and comment-out the axios
    //call just below. Make sure to switch back just before pushing up to repo.
    //Just make sure to run webpack again so bundle is correct (In repo's cd, run >npm run build)
    // axios.get('http://127.0.0.1:3001/reviews/100')
    //   .then((results) => {
    //     const { reviewAverage, numberOfReviews, allReviews } = results.data;

    //     store.dispatch(updateReviewAverage(reviewAverage));
    //     store.dispatch(updateNumberOfReviews(numberOfReviews));
    //     store.dispatch(updateAllReviews(allReviews));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    const { search } = window.location;
    const searchSplit = search.split('&');
    let splitItemID;

    for (let i = 0; i < searchSplit.length; i++) {
      if (searchSplit[i].includes('itemID')) {
        splitItemID = searchSplit[i].split('=');
        break;
      }
    }

    axios.get(`http://127.0.0.1:3001/reviews/${splitItemID[1]}`)
      .then((results) => {
        const { reviewAverage, numberOfReviews, allReviews } = results.data;

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
        <div id="place-holder-questions" />
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
