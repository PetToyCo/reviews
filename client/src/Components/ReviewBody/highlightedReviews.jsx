import SolidReviewStars from '../General/solidReviewStars.jsx';
import updateFilters from '../../ReduxSpecificComponents/Actions/updateFilter.js';
import updateModalSavedScrollPosition from '../../ReduxSpecificComponents/Actions/updateModalSavedScrollPosition.js';
import FullReviewModal from './fullReviewModal.jsx';
import store from '../../ReduxSpecificComponents/store.js';

const { connect, Provider } = ReactRedux;

class HighlightedReviews extends React.Component {
  // constructor(props) {
  //   super();
  // }

  handleShowFullReviewClick(index, filteredReviews, e) {
    e.preventDefault();
    const { dispatchUpdateModalSavedScrollPosition } = this.props;
    const modalAttachPoint = document.getElementById('MODAL_ATTACH_POINT');
    const currentScrollX = window.scrollX;
    const currentScrollY = window.scrollY;

    dispatchUpdateModalSavedScrollPosition([currentScrollX, currentScrollY]);

    modalAttachPoint.style.visibility = 'visible';

    document.body.scrollIntoView({ behavior: 'smooth' });
    ReactDOM.render(<Provider id='modal-with-store' store={store}><FullReviewModal reviewObject={filteredReviews[index]} indexInCurrentFilteredReviews={index} /></Provider>, modalAttachPoint);
  }

  render() {
    const { filteredReviews, filter, dispatchUpdateFilters } = this.props;

    for (let i = 1; i <= 5; i++) {
      if (filter[i]) {
        return null;
      }
    }

    if (filteredReviews.length <= 8) {
      return null;
    }

    let mostHelpfulFavorableReviewIndex;
    let mostHelpfulFavorableReviewIndexYeses = 0;
    let mostHelpfulCriticalReviewIndex;
    let mostHelpfulCriticalReviewIndexYeses = 0;

    for (let j = 0; j < filteredReviews.length; j++) {
      const { score, yeses, noes } = filteredReviews[j];
      const difference = yeses - noes;

      if (score >= 4) {
        if (difference > mostHelpfulFavorableReviewIndexYeses) {
          mostHelpfulFavorableReviewIndexYeses = difference;
          mostHelpfulFavorableReviewIndex = j;
        }
      } else {
        if (difference > mostHelpfulCriticalReviewIndexYeses) {
          mostHelpfulCriticalReviewIndexYeses = difference;
          mostHelpfulCriticalReviewIndex = j;
        }
      }
    }

    const favorableReview = filteredReviews[mostHelpfulFavorableReviewIndex];
    const criticalReview = filteredReviews[mostHelpfulCriticalReviewIndex];

    const favorableStamps = [];
    if (favorableReview.promotion) {
      favorableStamps.push(<img style={{ maxHeight: '25px', maxWidth: '100%' }} src='https://display.ugc.bazaarvoice.com/static/PETCO/main_site/533/3554/en_US/images/badgeImages/sweepstakesoptinyes.jpeg' />);
    }

    if (favorableReview.verified) {
      favorableStamps.push(<img style={{ maxHeight: '25px', maxWidth: '100%', margin: '0 0 0 10px' }} src='https://display.ugc.bazaarvoice.com/static/PETCO/main_site/533/3554/en_US/images/badgeImages/verifiedpurchaser_1yes.jpeg' />);
    }

    const criticalStamps = [];
    if (criticalReview.promotion) {
      criticalStamps.push(<img style={{ maxHeight: '25px', maxWidth: '100%' }} src='https://display.ugc.bazaarvoice.com/static/PETCO/main_site/533/3554/en_US/images/badgeImages/sweepstakesoptinyes.jpeg' />);
    }

    if (criticalReview.verified) {
      criticalStamps.push(<img style={{ maxHeight: '25px', maxWidth: '100%', margin: '0 0 0 10px' }} src='https://display.ugc.bazaarvoice.com/static/PETCO/main_site/533/3554/en_US/images/badgeImages/verifiedpurchaser_1yes.jpeg' />);
    }

    return (
      <div id='highlighted-reviews' style={{ display: 'flex' }} >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '0 50px 0 0',
            visibility: mostHelpfulFavorableReviewIndex === undefined ? 'hidden' : 'visible',
          }}
        >
          <div>Most Helpful Favorable Review</div>
          <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <SolidReviewStars score={favorableReview.score} />
              <div style={{ display: 'flex' }}>
                <div>{favorableReview.username}</div>
                <div>&#183;</div>
                <div>{moment(favorableReview.date).fromNow()}</div>
              </div>
            </div>
            <div style={{ display: 'flex' }}>{favorableStamps}</div>
          </div>
          <div>{favorableReview.title}</div>
          <div>
            {`${favorableReview.review.substring(0, 100)}...`}
            <a href='' onClick={this.handleShowFullReviewClick.bind(this, mostHelpfulFavorableReviewIndex, filteredReviews)}>Show Full Review</a>
          </div>
          <div>{`${favorableReview.yeses} of ${favorableReview.yeses + favorableReview.noes} people found this helpful`}</div>
          <div onClick={dispatchUpdateFilters.bind(this, '4-5')}>See more 4 and 5 star reviews</div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            visibility: mostHelpfulCriticalReviewIndex === undefined ? 'hidden' : 'visible',
          }}
        >
          <div>Most Helpful Critical Review</div>
          <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <SolidReviewStars score={criticalReview.score} />
              <div style={{ display: 'flex' }}>
                <div>{criticalReview.username}</div>
                <div>&#183;</div>
                <div>{moment(criticalReview.date).fromNow()}</div>
              </div>
            </div>
            <div style={{ display: 'flex' }}>{criticalStamps}</div>
          </div>
          <div>{criticalReview.title}</div>
          <div>
            {`${criticalReview.review.substring(0, 100)}...`}
            <a href='' onClick={this.handleShowFullReviewClick.bind(this, mostHelpfulCriticalReviewIndex, filteredReviews)}>Show Full Review</a>
          </div>
          <div>{`${criticalReview.yeses} of ${criticalReview.yeses + criticalReview.noes} people found this helpful`}</div>
          <div onClick={dispatchUpdateFilters.bind(this, '1-2-3')}>See more 1, 2, and 3 star reviews</div>
        </div>
      </div>
    );
  }
}

const mapState = function(state) {
  const { filteredReviews, filter } = state;

  return {
    filteredReviews,
    filter,
  };
};

const mapDispatch = function(dispatch) {
  return {
    dispatchUpdateFilters: (value) => { dispatch(updateFilters(value)); },
    dispatchUpdateModalSavedScrollPosition: (position) => { dispatch(updateModalSavedScrollPosition(position)); },
  };
};

const wrappedHighlightedReviews = connect(mapState, mapDispatch)(HighlightedReviews);

export default wrappedHighlightedReviews;
