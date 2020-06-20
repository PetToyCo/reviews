import StarChart from './starChart.jsx';
import AverageCustomerRatings from './averageCustomerRatings.jsx';
import HighlightedReviews from './highlightedReviews.jsx';

class ReviewBody extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex' }}>
            <StarChart />
            <AverageCustomerRatings />
          </div>
          <HighlightedReviews />
        </div>
      </div>
    );
  }
}

export default ReviewBody;
