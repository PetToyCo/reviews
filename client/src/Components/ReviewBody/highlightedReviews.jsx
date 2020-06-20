import SolidReviewStars from '../General/solidReviewStars.jsx';

class HighlightedReviews extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>Most Helpful Favorable Review</div>
          <SolidReviewStars />
          <div style={{ display: 'flex' }}>
            <div> Username </div>
            <div> dot </div>
            <div> Moment</div>
          </div>
          <div>Review Title</div>
          <div>Review</div>
          <div>This number of people out of total found this helpful</div>
          <div>See more 4 and 5 star reviews</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>Most Helpful Critical Review</div>
          <SolidReviewStars />
          <div style={{ display: 'flex' }}>
            <div> Username </div>
            <div> dot </div>
            <div> Moment</div>
          </div>
          <div>Review Title</div>
          <div>Review</div>
          <div>This number of people out of total found this helpful</div>
          <div>See more 1, 2, and 3 star reviews</div>
        </div>
      </div>
    );
  }
}

export default HighlightedReviews;
