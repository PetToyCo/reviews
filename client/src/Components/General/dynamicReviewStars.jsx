import { dynamicStarsGrayStars } from '../../CSSstyles.js';

const { connect } = ReactRedux;

class DynamicReviewStars extends React.Component {
  // constructor() {
  //   super();
  // }

  //Makes a copy of dynamicStarsGrayStars and then overwrites/adds fields to correctly render blackStars
  modifiedStyleForDynamicStarsGrayStars(originalStyle, reviewAverage) {
    const newStyles = {};
    Object.assign(newStyles, originalStyle);
    //the 12 in this equation is for font size. If the fontSize property is changed from 12px, this needs to change also
    newStyles.width = `${Number.parseFloat(reviewAverage) * 12}px`;
    newStyles.color = '#333';
    newStyles.overflow = 'hidden';

    return newStyles;
  }

  render() {
    const { reviewAverage } = this.props;

    return (
      <div style={{ height: '30px', width: '60px', position: 'relative' }}>
        <div style={dynamicStarsGrayStars}>&#9733;&#9733;&#9733;&#9733;&#9733;</div>
        <div style={this.modifiedStyleForDynamicStarsGrayStars(dynamicStarsGrayStars, reviewAverage)}>&#9733;&#9733;&#9733;&#9733;&#9733;</div>
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
