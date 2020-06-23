import DynamicReviewStars from '../General/dynamicReviewStars.jsx';
import {
  reviewHeaderItemLink,
  reviewHeaderItemLinkLinklike,
  reviewHeaderItemLinkLinkNatureHidden,
  reviewHeaderListItem
} from '../../CSSstyles.js';

const { connect } = ReactRedux;

const modifiedStyleForReviewHeaderItemLink = function(originalStyle) {
  const newStyles = {};
  Object.assign(newStyles, originalStyle);
  newStyles.borderLeft = '1px solid';
  newStyles.borderRight = '1px solid';
  newStyles.borderColor = '#ccc';

  return newStyles;
};

class ReviewHeader extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { reviewAverage, numberOfReviews } = this.props;
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        width: '1095px',
        backgroundColor: '#f7f7f7',
        flexShrink: '0',
        fontSize: 'medium',
        borderBottom: '1px solid',
        borderColor: '#ccc',
      }}>
        <div style={{ borderBottom: '1px solid', borderColor: '#ccc', width: 'auto', height: '30px', padding: '10px 20px'}}>
          <div style={{display: 'flex', marginTop: '5px'}}>
            <DynamicReviewStars />
            <div style={{paddingLeft: '10px', paddingRight: '10px', borderRight: '1px solid #ccc', height: '18px', color: '#666'}}>{reviewAverage}</div>
            <div style={{paddingLeft: '10px',}}>
              <div style={reviewHeaderItemLinkLinklike}>{`${numberOfReviews} Reviews`}</div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', height: '52px' }}>
          <div style={{width: '525px', display: 'flex', marginLeft: '10px'}}>
            <input style={{
              lineHeight: '16px',
              fontSize: '14px',
              width: '83.5%',
              height: '16px',
              borderColor: '#bbb',
              margin: '10px 0',
              borderWidth: '1px',
              padding: '7px 10px',
              fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
            }} placeholder='Search topics and reviews'></input>
            <button style={{backgroundImage: 'url("/searchMagnifyingGlass.png")', height: '32px', width: '88px', border: 'none', margin: '10px 0',}}></button>
          </div>
          <ul style={{display: 'inline', listStyleType: 'none', height: '52px', width: '480px', float: 'right', margin: '0 0 0 40px'}}>
            <li style={reviewHeaderListItem}>
              <a href='#review-link' style={reviewHeaderItemLink}>
                <span style={reviewHeaderItemLinkLinkNatureHidden}>{numberOfReviews}</span>
                <span style={reviewHeaderItemLinkLinklike}>Reviews</span>
              </a>
            </li>
            <li style={reviewHeaderListItem}>
              <a href='#place-holder-questions' style={modifiedStyleForReviewHeaderItemLink(reviewHeaderItemLink)}>
                <span style={reviewHeaderItemLinkLinkNatureHidden}>0</span>
                <span style={reviewHeaderItemLinkLinklike}>Questions</span>
              </a>
            </li>
            <li style={reviewHeaderListItem}>
              <a href='#place-holder-questions' style={reviewHeaderItemLink}>
                <span style={reviewHeaderItemLinkLinkNatureHidden}>0</span>
                <span style={reviewHeaderItemLinkLinklike}>Answers</span>
              </a>
            </li>
          </ul>
        </div>

      </div>
    );
  }
}

const mapState = function(state) {
  const { reviewAverage, numberOfReviews } = state;

  return {
    reviewAverage,
    numberOfReviews,
  };
};

const wrappedReviewHeader = connect(mapState)(ReviewHeader);

export default wrappedReviewHeader;
