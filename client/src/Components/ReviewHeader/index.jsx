import DynamicReviewStars from '../General/dynamicReviewStars.jsx';

const { connect } = ReactRedux;

class ReviewHeader extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        width: '100%',
        backgroundColor: 'hsl(0, 0%, 96.9%)',
        flexShrink: '0',
      }}>
        <div style={{ display: 'flex' }}>
          <DynamicReviewStars />
          <div>{this.props.reviewAverage}</div>
          <div> | </div>
          <div>{this.props.numberOfReviews}</div>
        </div>
        <div style={{ display: 'flex' }}>
          <div>Search bar</div>
          <div>{this.props.numberOfReviews}</div>
          <div> Number of Questions </div>
          <div> Number of Answers</div>
        </div>

      </div>
    );
  }
}

const mapState = function(state) {
  return {
    reviewAverage: state.reviewAverage,
    numberOfReviews: state.numberOfReviews,
  };
};

const wrappedReviewHeader = connect(mapState)(ReviewHeader);

export default wrappedReviewHeader;
