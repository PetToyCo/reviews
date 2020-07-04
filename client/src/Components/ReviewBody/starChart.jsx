import StarChartRow from './starChartRow.jsx';

const { connect } = ReactRedux;

class StarChart extends React.Component {
  // constructor(props) {
  //   super();
  // }

  render() {
    const { allReviews } = this.props;
    let { numberOfReviews } = this.props;
    const scoreCount = {
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
    };

    if (numberOfReviews === 0 || numberOfReviews === null) {
      numberOfReviews = 1;
    }

    for (let i = 0; i < allReviews.length; i++) {
      scoreCount[allReviews[i].score]++;
    }

    return (
      <div id='star-chart' style={{ display: 'flex', flexDirection: 'column' }}>
        <div>Rating Snapshot</div>
        <div>Select a row below to filter reviews.</div>
        <StarChartRow scoreValue={5} scoreCount={scoreCount['5']} numberOfReviews={numberOfReviews} />
        <StarChartRow scoreValue={5} scoreCount={scoreCount['4']} numberOfReviews={numberOfReviews} />
        <StarChartRow scoreValue={3} scoreCount={scoreCount['3']} numberOfReviews={numberOfReviews} />
        <StarChartRow scoreValue={2} scoreCount={scoreCount['2']} numberOfReviews={numberOfReviews} />
        <StarChartRow scoreValue={1} scoreCount={scoreCount['1']} numberOfReviews={numberOfReviews} />
      </div>
    );
  }
}

const mapState = function(state) {
  const { allReviews, numberOfReviews } = state;

  return {
    allReviews,
    numberOfReviews,
  };
};

const wrappedStarChart = connect(mapState)(StarChart);

export default wrappedStarChart;
