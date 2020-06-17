import DynamicReviewStars from '../General/dynamicReviewStars.jsx';

class AverageCustomerRatings extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>Average Customer Ratings</div>
        <div style={{ display: 'flex' }}>
          <div>Overall</div>
          <DynamicReviewStars />
          <div>Average Ratings Score</div>
        </div>
      </div>
    );
  }
}

export default AverageCustomerRatings;
