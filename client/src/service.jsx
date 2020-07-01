import store from './ReduxSpecificComponents/store.js';
import ReviewHeader from './Components/ReviewHeader/index.jsx';
import ReviewBody from './Components/ReviewBody/index.jsx';
import Reviews from './Components/Reviews/index.jsx';
import updateReviewAverage from './ReduxSpecificComponents/Actions/updateReviewAverage.js';
import updateNumberOfReviews from './ReduxSpecificComponents/Actions/updateNumberOfReviews.js';
import updateAllReviews from './ReduxSpecificComponents/Actions/updateAllReviews.js';

const { connect } = ReactRedux;

class ReviewsModule extends React.Component {
  // constructor(props) {
  //   super();
  // }

  componentDidMount() {
    //When working on service, uncomment this axios call and comment-out the axios
    //call just below. Make sure to switch back just before pushing up to repo.
    //Just make sure to run webpack again so bundle is correct (In repo's cd, run >npm run build)
    //start of service as standalone
    axios.get('http://127.0.0.1:3001/reviews/100')
      .then((results) => {
        const { reviewAverage, numberOfReviews, allReviews } = results.data;

        store.dispatch(updateReviewAverage(reviewAverage));
        store.dispatch(updateNumberOfReviews(numberOfReviews));
        store.dispatch(updateAllReviews(allReviews));
      })
      .catch((err) => {
        console.log(err);
      });
    //end of service as standaline

    //start of service as proxy service
    // const { search } = window.location;
    // const searchSplit = search.split('&');
    // let splitItemID;

    // for (let i = 0; i < searchSplit.length; i++) {
    //   if (searchSplit[i].includes('itemID')) {
    //     splitItemID = searchSplit[i].split('=');
    //     break;
    //   }
    // }

    // axios.get(`http://127.0.0.1:3001/reviews/${splitItemID[1]}`)
    //   .then((results) => {
    //     const { reviewAverage, numberOfReviews, allReviews } = results.data;

    //     store.dispatch(updateReviewAverage(reviewAverage));
    //     store.dispatch(updateNumberOfReviews(numberOfReviews));
    //     store.dispatch(updateAllReviews(allReviews));
    //     store.dispatch(updateFilteredReviews(allReviews));

    //     if (numberOfReviews === 0) {
    //       store.dispatch(updateReviewRange('RESET', [0, -1]));
    //     } else if (numberOfReviews < 8) {
    //       store.dispatch(updateReviewRange('RESET', [0, numberOfReviews - 1]));
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    //end of service as proxy service
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

const mapDispatch = function(dispatch) {
  return {
    dispatchUpdateReviewAverage: (reviewAverage) => { dispatch(updateReviewAverage(reviewAverage)); },
    dispatchUpdateNumberOfReviews: (numberOfReviews) => { dispatch(updateNumberOfReviews(numberOfReviews)); },
    dispatchupdateAllReviews: (allReviews) => { dispatch(updateAllReviews(allReviews)); },
  };
};

const wrappedReviewsModule = connect(null, mapDispatch)(ReviewsModule);

export default wrappedReviewsModule;
