const { connect } = ReactRedux;

class DynamicReviewStars extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const { reviewAverage, numberOfReviews } = this.props;

    return (
      <div style={{height: '20px', width: '57px'}}>
        <a title={`Read ${numberOfReviews} Reviews`} style={{position: 'relative', height: 'inherit', width: 'inherit'}}>
          <div style={{position: 'absolute', top: '0', left: '0', height: 'inherit', width: '57px', fontSize: '12px', color: '#ccc',}}>&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          <div style={{position: 'absolute', top: '0', left: '0', height: 'inherit', width: `${Number.parseFloat(reviewAverage) * 12}px`, fontSize: '12px', color: '#333', overflow: 'hidden'}}>&#9733;&#9733;&#9733;&#9733;&#9733;</div>
        </a>
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


const wrappedDynamicReviewStars = connect(mapState)(DynamicReviewStars);

export default wrappedDynamicReviewStars;
