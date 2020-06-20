import StarChartRow from './starChartRow.jsx';

class StarChart extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>Rating Snapshot</div>
        <div>Select a row below to filter reviews.</div>
        <StarChartRow />
        <StarChartRow />
        <StarChartRow />
        <StarChartRow />
        <StarChartRow />
      </div>
    );
  }
}

export default StarChart;
