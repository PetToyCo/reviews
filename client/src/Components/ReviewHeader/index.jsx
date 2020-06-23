import DynamicReviewStars from '../General/dynamicReviewStars.jsx';
import {
  reviewHeaderItemLink,
  reviewHeaderItemLinkLinklike,
  reviewHeaderItemLinkLinkNatureHidden,
  reviewHeaderListItem,
  reviewHeaderWrapper,
  reviewHeaderTopHalf,
  reviewHeaderReviewAverage,
  reviewHeaderSearchBar,
  reviewHeaderSearchBarButton,
  reviewHeaderList,
} from '../../CSSstyles.js';

const { connect } = ReactRedux;

class ReviewHeader extends React.Component {
  // constructor() {
  //   super();
  // }

  //makes a slighlty modified copy of reviewHeaderItemLink since the middle link need left/right borders
  modifiedStyleForReviewHeaderItemLink(originalStyle) {
    const newStyles = {};
    Object.assign(newStyles, originalStyle);
    newStyles.borderLeft = '1px solid';
    newStyles.borderRight = '1px solid';
    newStyles.borderColor = '#ccc';

    return newStyles;
  }

  changeColorOnMouseEnter(e) {
    const { id } = e.target;
    document.getElementById(id).style.color = '#009cd9';
  }

  changeColorOnMouseLeave(e) {
    const { id } = e.target;
    document.getElementById(id).style.color = '#005891';
  }

  changeImageOnMouseEnter(e) {
    const { id } = e.target;
    document.getElementById(id).style.backgroundImage = 'url("/searchMagnifyingGlassHover.png")';
  }

  changeImageOnMouseLeave(e) {
    const { id } = e.target;
    document.getElementById(id).style.backgroundImage = 'url("/searchMagnifyingGlass.png")';
  }

  render() {
    const { reviewAverage, numberOfReviews } = this.props;
    return (
      <div style={reviewHeaderWrapper}>
        <div style={reviewHeaderTopHalf}>
          <div style={{ display: 'flex', marginTop: '5px' }}>
            <a title={`Read ${numberOfReviews} Reviews`} href='#review-link' style={{ position: 'relative', height: 'inherit', width: 'inherit' }}>
              <DynamicReviewStars />
            </a>
            <div style={reviewHeaderReviewAverage}>{reviewAverage}</div>
            <div style={{ paddingLeft: '10px' }}>
              <a id='header-upper-reviews' onMouseLeave={this.changeColorOnMouseLeave} onMouseEnter={this.changeColorOnMouseEnter} href='#review-link' style={reviewHeaderItemLinkLinklike}>{`${numberOfReviews} Reviews`}</a>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', height: '52px' }}>
          <div style={{ width: '529px', display: 'flex', marginLeft: '10px' }}>
            <input style={reviewHeaderSearchBar} placeholder='Search topics and reviews' />
            <button type='button' id='magnifying-glass' onMouseLeave={this.changeImageOnMouseLeave} onMouseEnter={this.changeImageOnMouseEnter} style={reviewHeaderSearchBarButton} />
          </div>
          <ul style={reviewHeaderList}>
            <li style={reviewHeaderListItem}>
              <a href='#review-link' style={reviewHeaderItemLink}>
                <span style={reviewHeaderItemLinkLinkNatureHidden}>{numberOfReviews}</span>
                <span id='item-link-reviews' onMouseLeave={this.changeColorOnMouseLeave} onMouseEnter={this.changeColorOnMouseEnter} style={reviewHeaderItemLinkLinklike}>Reviews</span>
              </a>
            </li>
            <li style={reviewHeaderListItem}>
              <a href='#place-holder-questions' style={this.modifiedStyleForReviewHeaderItemLink(reviewHeaderItemLink)}>
                <span style={reviewHeaderItemLinkLinkNatureHidden}>0</span>
                <span id='item-link-questions' onMouseLeave={this.changeColorOnMouseLeave} onMouseEnter={this.changeColorOnMouseEnter} style={reviewHeaderItemLinkLinklike}>Questions</span>
              </a>
            </li>
            <li style={reviewHeaderListItem}>
              <a href='#place-holder-questions' style={reviewHeaderItemLink}>
                <span style={reviewHeaderItemLinkLinkNatureHidden}>0</span>
                <span id='item-link-answers' onMouseLeave={this.changeColorOnMouseLeave} onMouseEnter={this.changeColorOnMouseEnter} style={reviewHeaderItemLinkLinklike}>Answers</span>
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
