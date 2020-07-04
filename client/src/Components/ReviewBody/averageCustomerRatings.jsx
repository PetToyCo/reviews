import DynamicReviewStars from '../General/dynamicReviewStars.jsx';

const { connect } = ReactRedux;

class AverageCustomerRatings extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const { reviewAverage } = this.props;

    return (
      <div id='average-review-stars' style={{ display: 'flex', flexDirection: 'column' }}>
        <div>Average Customer Ratings</div>
        <div style={{ display: 'flex' }}>
          <div>Overall</div>
          <DynamicReviewStars />
          <div>{reviewAverage}</div>
        </div>
      </div>
    );
  }
}

const mapState = function(state) {
  const { reviewAverage } = state;
  return {
    reviewAverage,
  };
};

const wrappedAverageCustomerRatings = connect(mapState)(AverageCustomerRatings);

export default wrappedAverageCustomerRatings;
