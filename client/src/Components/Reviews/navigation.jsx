class HighlightedReviews extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div style={{ display: 'flex' }}>
        <div> first review - last review out of number of reviews </div>
        <div> previous set of reviews button </div>
        <div> next set of reviews button</div>
      </div>
    );
  }
}

export default HighlightedReviews;
