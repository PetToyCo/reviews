const { connect } = ReactRedux;

const handleClickYesOrNoButton = function(indexInCurrentFilteredReviews, option) {
  const objectInCurrentFilteredReviews = this.props.filteredReviews[indexInCurrentFilteredReviews];
  const { disabled } = objectInCurrentFilteredReviews;

  if (!disabled) {
    objectInCurrentFilteredReviews.disabled = true;
    objectInCurrentFilteredReviews[option]++;

    const yesTarget = document.getElementById(`yes-button-${indexInCurrentFilteredReviews}`);
    const noTarget = document.getElementById(`no-button-${indexInCurrentFilteredReviews}`);

    if (option === 'yeses') {
      yesTarget.innerHTML = objectInCurrentFilteredReviews.yeses;
    } else {
      noTarget.innerHTML = objectInCurrentFilteredReviews.noes;
    }

    yesTarget.style.color = 'green';
    noTarget.style.color = 'red';
  }
}

class Helpful extends React.Component {
  // constructor(props) {
  //   super();
  // }

  render() {
    const {
      yeses,
      noes,
      disabled,
      indexInCurrentFilteredReviews,
    } = this.props;

    const yesButton = [];
    const noButton = [];

    if (disabled) {
      yesButton.push(
        <div style={{ display: 'flex' }}>
          <div>Yes</div>
          <div>&#183;</div>
          <div style={{ color: 'green' }} >{yeses}</div>
        </div>
      );

      noButton.push(
        <div style={{ display: 'flex' }}>
          <div>No</div>
          <div>&#183;</div>
          <div style={{ color: 'red' }} >{noes}</div>
        </div>
      );
    } else {
      yesButton.push(
        <button onClick={handleClickYesOrNoButton.bind(this, indexInCurrentFilteredReviews, 'yeses')} style={{ display: 'flex' }}>
          <div>Yes</div>
          <div>&#183;</div>
          <div id={`yes-button-${indexInCurrentFilteredReviews}`}>{yeses}</div>
        </button>
      );

      noButton.push(
        <button onClick={handleClickYesOrNoButton.bind(this, indexInCurrentFilteredReviews, 'noes')} style={{ display: 'flex' }}>
          <div>No</div>
          <div>&#183;</div>
          <div id={`no-button-${indexInCurrentFilteredReviews}`}>{noes}</div>
        </button>
      );
    }

    return (
      <div style={{ display: 'flex' }}>
        <div>Helpful?</div>
        {yesButton}
        {noButton}
        <button>Report</button>
      </div>
    );
  }
}

const mapState = function(state) {
  const { filteredReviews } = state;

  return {
    filteredReviews,
  };
};

const wrappedHelpful = connect(mapState)(Helpful);

export default wrappedHelpful;
