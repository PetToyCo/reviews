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
      <div
        id='star-chart'
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '50%',
          padding: '0 0 0 21px',
          margin: '0 0 31px 0',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            color: 'rgb(51, 51, 51)',
            fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
            margin: '0 0 14px 0',
          }}
        >Rating Snapshot</div>
        <div
          style={{
            fontSize: '14px',
            color: 'rgb(102, 102, 102)',
            fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
            margin: '0 0 20px 0',
          }}
        >Select a row below to filter reviews.</div>
        <StarChartRow scoreValue={5} scoreCount={scoreCount['5']} numberOfReviews={numberOfReviews} />
        <StarChartRow scoreValue={4} scoreCount={scoreCount['4']} numberOfReviews={numberOfReviews} />
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
