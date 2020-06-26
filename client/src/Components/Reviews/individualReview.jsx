import SolidReviewStars from '../General/solidReviewStars.jsx';
import Helpful from './helpful.jsx';
import { isAbsolute } from 'path';

class IndividualReview extends React.Component {
  // constructor(props) {
  //   super();
  // }

  render() {
    const {
      username,
      title,
      review,
      score,
      recommended,
      yeses,
      noes,
      date,
      verified,
      promotion,
      disabled,
    } = this.props.reviewObject;

    const { indexInCurrentFilteredReviews } =  this.props;

    const dateSplit = date.split('T');
    dateSplit[1] = dateSplit[1].substring(0, 12);
    const newDate = dateSplit.join(' ');

    const specialStamps = [];

    if (promotion) {
      specialStamps.push(<img style={{ maxHeight: '25px', maxWidth: '100%' }} src='https://display.ugc.bazaarvoice.com/static/PETCO/main_site/533/3554/en_US/images/badgeImages/sweepstakesoptinyes.jpeg'></img>);
    }

    if (verified) {
      specialStamps.push(<img style={{ maxHeight: '25px', maxWidth: '100%' }} src='https://display.ugc.bazaarvoice.com/static/PETCO/main_site/533/3554/en_US/images/badgeImages/verifiedpurchaser_1yes.jpeg'></img>);
    }

    const recommendedOrNot = [];

    if (recommended) {
      recommendedOrNot.push(
        <div style={{ display: 'flex' }}>
          <div style={{ position: 'relative' }} >
            <div style={{ position: 'absolute', top: '-10px', bottom: '0', fontSize: '30px' }} >&#9679;</div>
            <div style={{ position: 'absolute', top: '0', bottom: '0', color: 'white' }} >&#10004;</div>
          </div>
          <div>Yes</div>
          <div>, I recommend this product.</div>
        </div>
      );
    } else {
      recommendedOrNot.push(
        <div style={{ display: 'flex' }}>
          <div style={{ position: 'relative' }} >
            <div style={{ position: 'absolute', top: '-10px', bottom: '0', fontSize: '30px' }} >&#9679;</div>
            <div style={{ position: 'absolute', top: '0', bottom: '0', color: 'white' }} >x</div>
          </div>
          <div>No</div>
          <div>, I do not recommend this product.</div>
        </div>
      );
    }

    return (
      <div style={{ display: 'flex' }}>
        <div>User photo</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex' }}>
            <SolidReviewStars score={score} />
            <div>{username}</div>
            <div>&#183;</div>
            <div>{moment(newDate).fromNow()}</div>
          </div>
          <div>{title}</div>
          <div>{review}</div>
          {recommendedOrNot}
          {/* <div> Yes or no if this reviewer recommends the product circle: &#9679; check: &#10004; x: x</div> */}
          <Helpful disabled={disabled} yeses={yeses} noes={noes} indexInCurrentFilteredReviews={indexInCurrentFilteredReviews} />
        </div>
        <div style={{ display: 'flex' }}>
          {specialStamps}
        </div>
      </div>
    );
  }
}

export default IndividualReview;
