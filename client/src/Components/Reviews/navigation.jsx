import updateReviewRange from '../../ReduxSpecificComponents/Actions/updateReviewRange.js';

const { connect } = ReactRedux;

class Navigation extends React.Component {
  // constructor(props) {
  //   super();
  // }

  handleBackButtonClick(numberOfReviews) {
    const { dispatchUpdateReviewRange } = this.props;

    dispatchUpdateReviewRange('BACK', null, numberOfReviews);
  }

  handleForwardButtonClick(numberOfReviews) {
    const { dispatchUpdateReviewRange } = this.props;

    dispatchUpdateReviewRange('FORWARD', null, numberOfReviews);
  }

  render() {
    const { reviewRange, filteredReviews } = this.props;

    if (filteredReviews.length <= 8) {
      return null;
    }

    const backButton = [];

    if (reviewRange[0]) {
      backButton.push(
        <button onClick={this.handleBackButtonClick.bind(this, filteredReviews.length)}>&#9666;</button>,
      );
    } else {
      backButton.push(
        <div>&#9666;</div>,
      );
    }

    const forwardButton = [];

    if (reviewRange[1] < filteredReviews.length - 1) {
      backButton.push(
        <button onClick={this.handleForwardButtonClick.bind(this, filteredReviews.length)}>&#9658;</button>,
      );
    } else {
      backButton.push(
        <div>&#9658;</div>,
      );
    }

    return (
      <div style={{ display: 'flex' }}>
        <div>{`${reviewRange[0] + 1}-${reviewRange[1] + 1} of ${filteredReviews.length} Reviews`}</div>
        {backButton}
        {forwardButton}
      </div>
    );
  }
}

const mapState = function(state) {
  const { reviewRange, filteredReviews } = state;

  return {
    reviewRange,
    filteredReviews,
  };
};

const mapDispatch = function(dispatch) {
  return {
    dispatchUpdateReviewRange: (option, value, numberOfReviews) => { dispatch(updateReviewRange(option, value, numberOfReviews)); },
  };
};

const wrappedNavigation = connect(mapState, mapDispatch)(Navigation);

export default wrappedNavigation;
