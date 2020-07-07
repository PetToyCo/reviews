import DynamicReviewStars from '../General/dynamicReviewStars.jsx';

const { connect } = ReactRedux;

class AverageCustomerRatings extends React.Component {
  // constructor(props) {
  //   super();
  // }

  render() {
    const { reviewAverage } = this.props;

    return (
      <div id='average-review-stars' style={{ display: 'flex', flexDirection: 'column', margin: '0 0 0 -10px' }}>
        <div
          style={{
            fontSize: '14px',
            color: 'rgb(51, 51, 51)',
            fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
            margin: '0 0 35px 0',
          }}
        >Average Customer Ratings</div>
        <div id='average-customer-ratings-stats' style={{ display: 'flex' }}>
          <div
            style={{
              fontSize: '14px',
              color: 'rgb(102, 102, 102)',
              fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
              margin: '-1px 21px 0 0',
            }}
          >Overall</div>
          <DynamicReviewStars biggerFont={true} />
          <div
            id='average-customer-ratings-review-average'
            style={{
              fontSize: '14px',
              color: 'rgb(102, 102, 102)',
              fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
              margin: '-1px 0 0 110px',
            }}
          >{reviewAverage}</div>
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
