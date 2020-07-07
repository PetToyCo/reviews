import { dynamicStarsGrayStars } from '../../CSSstyles.js';

const { connect } = ReactRedux;

class DynamicReviewStars extends React.Component {
  // constructor() {
  //   super();
  // }

  //Makes a copy of dynamicStarsGrayStars and then overwrites/adds fields to correctly render blackStars
  modifiedStyleForDynamicStarsGrayStars(originalStyle, reviewAverage, biggerFont) {
    const newStyles = {};
    Object.assign(newStyles, originalStyle);
    //the 11 and 3 in thes equations is because the fontSize is 12 or 14.
    //Why is it not 12 and 14 then?
    //The spacing between characters has been reduced by 1px and so the value is 1 less
    //Why the 0.12? Seems like the reduced character spacing isn't exactly 1 px
    newStyles.width = biggerFont ? `${Number.parseFloat(reviewAverage) * 13.12}px` : `${Number.parseFloat(reviewAverage) * 11.12}px`;
    newStyles.color = '#333';
    newStyles.overflow = 'hidden';

    return newStyles;
  }

  render() {
    const { reviewAverage, biggerFont } = this.props;

    return (
      <div
        className='dynamic-stars'
        style={{
          height: '30px',
          width: '60px',
          position: 'relative',
          fontSize: biggerFont ? '14px' : '12px',
        }}
      >
        <div className='empty-stars' style={dynamicStarsGrayStars}>&#9733;&#9733;&#9733;&#9733;&#9733;</div>
        <div className='filled-stars' style={this.modifiedStyleForDynamicStarsGrayStars(dynamicStarsGrayStars, reviewAverage, biggerFont)}>&#9733;&#9733;&#9733;&#9733;&#9733;</div>
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

const wrappedDynamicReviewStars = connect(mapState)(DynamicReviewStars);

export default wrappedDynamicReviewStars;
