import IndividualReview from './individualReview.jsx';

const { connect } = ReactRedux;

class ReviewsContainer extends React.Component {
  // constructor(props) {
  //   super();
  // }

  render() {
    const { filteredReviews, reviewRange } = this.props;
    const reviews = [];

    for (let i = reviewRange[0]; i <= reviewRange[1]; i++) {
      reviews.push(<IndividualReview reviewObject={filteredReviews[i]} />);
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {reviews}
      </div>
    );
  }
}

const mapState = function(state) {
  const { filteredReviews, reviewRange } = state;

  return {
    filteredReviews,
    reviewRange,
  };
};

const wrappedReviewsContainer = connect(mapState)(ReviewsContainer);

export default wrappedReviewsContainer;
