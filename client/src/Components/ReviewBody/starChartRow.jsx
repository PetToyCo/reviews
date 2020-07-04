import updateFilter from '../../ReduxSpecificComponents/Actions/updateFilter.js';

const { connect } = ReactRedux;

class StarChartRow extends React.Component {
  // constructor(props) {
  //   super();
  // }

  handleClickRow(score) {
    const { dispatchUpdateFilter } = this.props;

    dispatchUpdateFilter(score);

    document.getElementById('review-link').scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    const {
      scoreValue,
      scoreCount,
      numberOfReviews,
    } = this.props;

    const width = 200;

    return (
      <div
        className='star-chart-row'
        style={{
          display: 'flex',
        }}
        onClick={this.handleClickRow.bind(this, `${scoreValue}`)}
      >
        <div>{scoreValue}</div>
        <div>&#9733;</div>
        <div style={{ position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '10px',
              width: `${width}px`,
              backgroundColor: 'gray',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '10px',
              width: `${width / numberOfReviews * scoreCount}px`,
              backgroundColor: 'black',
            }}
          />
        </div>
        <div>{scoreCount}</div>
      </div>
    );
  }
}

const mapDispatch = function (dispatch) {
  return {
    dispatchUpdateFilter: (score) => { dispatch(updateFilter(score, 'ADD')); },
  };
};

const wrappedStarChartRow = connect(null, mapDispatch)(StarChartRow);

export default wrappedStarChartRow;
