class SolidReviewStars extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const { score } = this.props;
    const scoreDisplay = [];

    let numberOfGrayStars = 5;
    let numberOfBlackStars = score;

    while (numberOfBlackStars > 0) {
      scoreDisplay.push(<div>&#9733;</div>)
      numberOfGrayStars--;
      numberOfBlackStars--;
    }

    while (numberOfGrayStars > 0) {
      scoreDisplay.push(<div style={{ color: 'gray' }}>&#9733;</div>)
      numberOfGrayStars--;
    }

    return (
      <div style={{ display: 'flex' }} >
        {scoreDisplay}
      </div>
    );
  }
}

export default SolidReviewStars;
