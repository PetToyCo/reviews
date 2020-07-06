import DynamicReviewStars from '../General/dynamicReviewStars.jsx';

const { connect } = ReactRedux;

class AverageCustomerRatings extends React.Component {
  // constructor(props) {
  //   super();
  // }
  componentDidMount() {
    const parent = document.getElementById('average-customer-ratings-stats');
    let target;

    for (let i = 0; i < parent.childNodes.length; i++) {
      if (parent.childNodes[i].className === 'dynamic-stars') {
        target = parent.childNodes[i];
      }
    }

    for (let j = 0; j < target.childNodes.length; j++) {
      target.childNodes[j].style.fontSize = '14px';
    }
  }

  render() {
    const { reviewAverage } = this.props;

    return (
      <div id='average-review-stars' style={{ display: 'flex', flexDirection: 'column', margin: '0 0 0 -10px' }}>
        <div
          style={{
            fontSize: '14px',
            color: 'rgb(51, 51, 51)',
            fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
            margin: '0 0 35px 0',
          }}
        >Average Customer Ratings</div>
        <div id='average-customer-ratings-stats' style={{ display: 'flex' }}>
          <div
            style={{
              fontSize: '14px',
              color: 'rgb(102, 102, 102)',
              fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
              margin: '-1px 21px 0 0',
            }}
          >Overall</div>
          <DynamicReviewStars />
          <div
            style={{
              fontSize: '14px',
              color: 'rgb(102, 102, 102)',
              fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
              margin: '-1px 0 0 110px',
            }}
          >{reviewAverage}</div>
        </div>
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

const wrappedAverageCustomerRatings = connect(mapState)(AverageCustomerRatings);

export default wrappedAverageCustomerRatings;
