import IndividualReview from '../Reviews/individualReview.jsx';

const { connect } = ReactRedux;

class FullReviewModal extends React.Component {
  // constructor(props) {
  //   super();
  // }
  handleCloseButtonClick() {
    const { modalSavedScrollPosition } = this.props;
    const modalAttachPoint = document.getElementById('MODAL_ATTACH_POINT');

    window.scrollTo({ top: modalSavedScrollPosition[1], left: modalSavedScrollPosition[0], behavior: 'smooth' });

    modalAttachPoint.style.visibility = 'hidden';
    ReactDOM.unmountComponentAtNode(modalAttachPoint);
  }

  render() {
    const { reviewObject, indexInCurrentFilteredReviews } = this.props;

    return (
      <div
        id='full-review-modal'
        style={{
          position: 'absolute',
          top: '30px',
          left: '30px',
          backgroundColor: 'white',
          display: 'flex',
        }}
      >
        <IndividualReview reviewObject={reviewObject} indexInCurrentFilteredReviews={indexInCurrentFilteredReviews} modal='modal' />
        <div onClick={this.handleCloseButtonClick.bind(this)}>Close</div>
      </div>
    );
  }
}

const mapState = function(state) {
  const { modalSavedScrollPosition } = state;

  return {
    modalSavedScrollPosition,
  };
};

const wrappedFullReviewModal = connect(mapState)(FullReviewModal);

export default wrappedFullReviewModal;
