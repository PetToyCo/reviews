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
          top: '68px',
          left: `${(document.body.scrollWidth / 2) - 340 + 28}px`,
          backgroundColor: 'white',
          display: 'flex',
          maxWidth: '680px',
          minWidth: '680px',
          boxShadow: 'rgba(0, 0, 0, 0.5) 0px 10px 25px 0px',
        }}
      >
        <IndividualReview reviewObject={reviewObject} indexInCurrentFilteredReviews={indexInCurrentFilteredReviews} modal='modal' />
        <div
          id='highlighted-review-modal-close-button'
          style={{
            position: 'relative',
            cursor: 'pointer',
          }}
          onClick={this.handleCloseButtonClick.bind(this)}
        >
          <div
            style={{
              position: 'absolute',
              top: '-1.5px',
              left: '-6px',
              borderStyle: 'dotted',
              borderWidth: '1px',
              borderColor: 'hsl(203, 62%, 32%)',
              width: '22px',
              height: '27px',
            }}
          />
          <div
            style={{
              color: 'black',
              fontSize: '50px',
              position: 'absolute',
              top: '-19.5px',
              left: '-8.4px',
            }}
          >&#9679;</div>
          <div
            id='highlighted-review-modal-close-button-x'
            style={{
              fontSize: '24px',
              position: 'absolute',
              color: 'white',
              fontFamily: '"Nunito", "sans-serif"',
              fontWeight: 400,
              top: '-4.6px',
              left: '-0.2px',
            }}
          >x</div>
        </div>
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
