import SolidReviewStars from '../General/solidReviewStars.jsx';
import updateFilters from '../../ReduxSpecificComponents/Actions/updateFilter.js';
import updateModalSavedScrollPosition from '../../ReduxSpecificComponents/Actions/updateModalSavedScrollPosition.js';
import updateMostFavorableAnchorTagClicked from '../../ReduxSpecificComponents/Actions/updateMostFavorableAnchorTagClicked.js';
import updateMostCriticalAnchorTagClicked from '../../ReduxSpecificComponents/Actions/updateMostCriticalAnchorTagClicked.js';
import FullReviewModal from './fullReviewModal.jsx';
import store from '../../ReduxSpecificComponents/store.js';

const { connect, Provider } = ReactRedux;

class HighlightedReviews extends React.Component {
  // constructor(props) {
  //   super();
  // }

  handleShowFullReviewClick(index, filteredReviews, id, e) {
    e.preventDefault();
    const {
      dispatchUpdateModalSavedScrollPosition,
      dispatchUpdateMostFavorableAnchorTagClicked,
      dispatchUpdateMostCriticalAnchorTagClicked,
    } = this.props;

    if (id === 'anchor-tag-most-favorable') {
      dispatchUpdateMostFavorableAnchorTagClicked();
    } else {
      dispatchUpdateMostCriticalAnchorTagClicked();
    }

    const modalAttachPoint = document.getElementById('MODAL_ATTACH_POINT');
    const currentScrollX = window.scrollX;
    const currentScrollY = window.scrollY;

    dispatchUpdateModalSavedScrollPosition([currentScrollX, currentScrollY]);

    modalAttachPoint.style.visibility = 'visible';
    modalAttachPoint.style.color = 'rgba(0, 0, 0, 0.4)';

    document.body.scrollIntoView({ behavior: 'smooth' });
    ReactDOM.render(<Provider id='modal-with-store' store={store}><FullReviewModal reviewObject={filteredReviews[index]} indexInCurrentFilteredReviews={index} /></Provider>, modalAttachPoint);
  }

  handleLinkMouseOver(id) {
    const target = document.getElementById(id);

    target.style.color = 'rgb(0, 156, 217)';
  }

  handleLinkMouseOut(id) {
    const target = document.getElementById(id);

    target.style.color = 'rgb(0, 88, 145)';
  }

  render() {
    const {
      filteredReviews,
      filter,
      dispatchUpdateFilters,
      mostFavorableAnchorTagClicked,
      mostCriticalAnchorTagClicked,
    } = this.props;

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

    const promotionStyle = {
      maxHeight: '25px',
      maxWidth: '100%',
    };

    const verifiedStyle = {
      maxHeight: '25px',
      maxWidth: '100%',
      margin: '0 0 0 10px',
    };

    const favorableStamps = [];

    if (favorableReview) {
      if (favorableReview.promotion) {
        favorableStamps.push(<img style={promotionStyle} src='https://display.ugc.bazaarvoice.com/static/PETCO/main_site/533/3554/en_US/images/badgeImages/sweepstakesoptinyes.jpeg' />);
      }

      if (favorableReview.verified) {
        favorableStamps.push(<img style={verifiedStyle} src='https://display.ugc.bazaarvoice.com/static/PETCO/main_site/533/3554/en_US/images/badgeImages/verifiedpurchaser_1yes.jpeg' />);
      }
    }

    const criticalStamps = [];

    if (criticalReview) {
      if (criticalReview.promotion) {
        criticalStamps.push(<img style={promotionStyle} src='https://display.ugc.bazaarvoice.com/static/PETCO/main_site/533/3554/en_US/images/badgeImages/sweepstakesoptinyes.jpeg' />);
      }

      if (criticalReview.verified) {
        criticalStamps.push(<img style={verifiedStyle} src='https://display.ugc.bazaarvoice.com/static/PETCO/main_site/533/3554/en_US/images/badgeImages/verifiedpurchaser_1yes.jpeg' />);
      }
    }

    const reviewTypeStyle = {
      fontSize: '14px',
      fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
      color: 'rgb(51, 51, 51)',
      margin: '0 0 17px 0',
    };

    const usernameStyle = {
      fontSize: '13px',
      fontWeight: '700',
      fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
      color: 'rgb(51, 51, 51)',
      margin: '7px 6px 0 0',
    };

    const dotStyle = {
      fontSize: '13px',
      fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
      color: 'rgb(102, 102, 102)',
      margin: '7px 4px 0 0',
    };

    const dateStyle = {
      fontSize: '13px',
      fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
      color: 'rgb(102, 102, 102)',
      margin: '7px auto 0 0',
    };

    const titleStyle = {
      fontSize: '20px',
      fontWeight: '700',
      fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
      color: 'rgb(51, 51, 51)',
      margin: '8px 0 15px 0',
      overflow: 'hidden',
      maxHeight: '22px',
    };

    const truncatedReviewStyle = {
      fontSize: '14px',
      fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
      color: 'rgb(102, 102, 102)',
      width: '464px',
      lineHeight: '20px',
    };

    const peopleFoundHelpfulStyle = {
      fontSize: '14px',
      fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
      color: 'rgb(102, 102, 102)',
      margin: '16px 0 17px 0',
    };

    const multiFilterLinkStyle = {
      fontSize: '14px',
      fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
      color: 'rgb(0, 88, 145)',
      textDecoration: 'underline',
      cursor: 'pointer',
      margin: '0 0 23px 0',
    };

    const modalAnchorTagStyle = {
      color: 'rgb(0, 88, 145)',
    };

    const modalAnchorTagStyleClicked = {
      color: 'rgb(0, 156, 217)',
    };

    const mostFavorableAnchorTag = [];

    if (mostFavorableAnchorTagClicked) {
      mostFavorableAnchorTag.push(<a id='anchor-tag-most-favorable' style={modalAnchorTagStyleClicked} href='' onClick={this.handleShowFullReviewClick.bind(this, mostHelpfulFavorableReviewIndex, filteredReviews, 'anchor-tag-most-favorable')}> Show Full Review</a>);
    } else {
      mostFavorableAnchorTag.push(
        <a
          id='anchor-tag-most-favorable'
          style={modalAnchorTagStyle}
          href=''
          onClick={this.handleShowFullReviewClick.bind(this, mostHelpfulFavorableReviewIndex, filteredReviews, 'anchor-tag-most-favorable')}
          onMouseOver={this.handleLinkMouseOver.bind(this, 'anchor-tag-most-favorable')}
          onMouseOut={this.handleLinkMouseOut.bind(this, 'anchor-tag-most-favorable')}
        > Show Full Review</a>,
      );
    }

    const mostCriticalAnchorTag = [];

    if (mostCriticalAnchorTagClicked) {
      mostCriticalAnchorTag.push(<a id='anchor-tag-most-critical' style={modalAnchorTagStyleClicked} href='' onClick={this.handleShowFullReviewClick.bind(this, mostHelpfulCriticalReviewIndex, filteredReviews, 'anchor-tag-most-critical')}> Show Full Review</a>);
    } else {
      mostCriticalAnchorTag.push(
        <a
          id='anchor-tag-most-critical'
          style={modalAnchorTagStyle}
          href=''
          onClick={this.handleShowFullReviewClick.bind(this, mostHelpfulCriticalReviewIndex, filteredReviews, 'anchor-tag-most-critical')}
          onMouseOver={this.handleLinkMouseOver.bind(this, 'anchor-tag-most-critical')}
          onMouseOut={this.handleLinkMouseOut.bind(this, 'anchor-tag-most-critical')}
        > Show Full Review</a>,
      );
    }

    const reviews = [];

    if (favorableReview) {
      reviews.push(
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '0 20px',
            visibility: mostHelpfulFavorableReviewIndex === undefined ? 'hidden' : 'visible',
            minWidth: '498px',
            maxWidth: '498px',
          }}
        >
          <div style={reviewTypeStyle}>Most Helpful Favorable Review</div>
          <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', flexDirection: 'column', margin: '0 auto 0 -1px' }}>
              <SolidReviewStars score={favorableReview.score} />
              <div style={{ display: 'flex', margin: '2px 0 0 3px' }}>
                <div style={usernameStyle}>{favorableReview.username}</div>
                <div style={dotStyle}>&#183;</div>
                <div style={dateStyle}>{moment(favorableReview.date).fromNow()}</div>
              </div>
            </div>
            <div style={{ display: 'flex', float: 'right', margin: '6px 0 0 0' }}>{favorableStamps}</div>
          </div>
          <div style={titleStyle}>{favorableReview.title}</div>
          <div style={truncatedReviewStyle}>
            {`${favorableReview.review.substring(0, 100)}...`}
            {mostFavorableAnchorTag}
          </div>
          <div style={peopleFoundHelpfulStyle}>{`${favorableReview.yeses} of ${favorableReview.yeses + favorableReview.noes} people found this helpful`}</div>
          <div
            id='multi-filter-4-5'
            style={multiFilterLinkStyle}
            onClick={dispatchUpdateFilters.bind(this, '4-5')}
            onMouseOver={this.handleLinkMouseOver.bind(this, 'multi-filter-4-5')}
            onMouseOut={this.handleLinkMouseOut.bind(this, 'multi-filter-4-5')}
          >See more 4 and 5 star reviews</div>
        </div>,
      );
    }

    if (criticalReview) {
      reviews.push(
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            visibility: mostHelpfulCriticalReviewIndex === undefined ? 'hidden' : 'visible',
            margin: '0 19px 0 20px',
            minWidth: '498px',
            maxWidth: '498px',
          }}
        >
          <div style={reviewTypeStyle}>Most Helpful Critical Review</div>
          <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', flexDirection: 'column', margin: '0 auto 0 -1px' }}>
              <SolidReviewStars score={criticalReview.score} />
              <div style={{ display: 'flex', margin: '2px 0 0 3px' }}>
                <div style={usernameStyle}>{criticalReview.username}</div>
                <div style={dotStyle}>&#183;</div>
                <div style={dateStyle}>{moment(criticalReview.date).fromNow()}</div>
              </div>
            </div>
            <div style={{ display: 'flex', float: 'right', margin: '6px 0 0 0' }}>{criticalStamps}</div>
          </div>
          <div style={titleStyle}>{criticalReview.title}</div>
          <div style={truncatedReviewStyle}>
            {`${criticalReview.review.substring(0, 100)}...`}
            {mostCriticalAnchorTag}
          </div>
          <div style={peopleFoundHelpfulStyle}>{`${criticalReview.yeses} of ${criticalReview.yeses + criticalReview.noes} people found this helpful`}</div>
          <div
            id='multi-filter-1-2-3'
            style={multiFilterLinkStyle}
            onClick={dispatchUpdateFilters.bind(this, '1-2-3')}
            onMouseOver={this.handleLinkMouseOver.bind(this, 'multi-filter-1-2-3')}
            onMouseOut={this.handleLinkMouseOut.bind(this, 'multi-filter-1-2-3')}
          >See more 1, 2, and 3 star reviews</div>
        </div>,
      );
    }

    return (
      <div id='highlighted-reviews' style={{ display: 'flex' }}>
        {reviews}
      </div>
    );
  }
}

const mapState = function(state) {
  const {
    filteredReviews,
    filter,
    mostFavorableAnchorTagClicked,
    mostCriticalAnchorTagClicked,
  } = state;

  return {
    filteredReviews,
    filter,
    mostFavorableAnchorTagClicked,
    mostCriticalAnchorTagClicked,
  };
};

const mapDispatch = function(dispatch) {
  return {
    dispatchUpdateFilters: (value) => { dispatch(updateFilters(value)); },
    dispatchUpdateModalSavedScrollPosition: (position) => { dispatch(updateModalSavedScrollPosition(position)); },
    dispatchUpdateMostFavorableAnchorTagClicked: () => { dispatch(updateMostFavorableAnchorTagClicked()); },
    dispatchUpdateMostCriticalAnchorTagClicked: () => { dispatch(updateMostCriticalAnchorTagClicked()); },
  };
};

const wrappedHighlightedReviews = connect(mapState, mapDispatch)(HighlightedReviews);

export default wrappedHighlightedReviews;
