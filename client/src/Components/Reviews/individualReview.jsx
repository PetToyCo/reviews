import SolidReviewStars from '../General/solidReviewStars.jsx';
import Helpful from './helpful.jsx';

class IndividualReview extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div style={{ display: 'flex' }}>
        <div>User photo</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex' }}>
            <SolidReviewStars />
            <div> Username </div>
            <div> dot </div>
            <div> Moment</div>
          </div>
          <div>Review Title</div>
          <div>Review</div>
          <div> Yes or no if this reviewer recommends the product</div>
          <Helpful />
        </div>
        <div style={{ display: 'flex' }}>
          <div>Sweepstakes</div>
          <div>Verified</div>
        </div>
      </div>
    );
  }
}

export default IndividualReview;
