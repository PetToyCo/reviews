const { connect } = ReactRedux;

const handleClickYesOrNoButton = function(indexInCurrentFilteredReviews, option) {
  const objectInCurrentFilteredReviews = this.props.filteredReviews[indexInCurrentFilteredReviews];
  const { disabled } = objectInCurrentFilteredReviews;

  if (!disabled) {
    objectInCurrentFilteredReviews.disabled = true;
    objectInCurrentFilteredReviews[option]++;

    const yesTarget = document.getElementById(`yes-button-${indexInCurrentFilteredReviews}`);
    const noTarget = document.getElementById(`no-button-${indexInCurrentFilteredReviews}`);
    const buttons = document.getElementsByClassName(`helpful-tracker-${indexInCurrentFilteredReviews}`);

    if (option === 'yeses') {
      yesTarget.innerHTML = objectInCurrentFilteredReviews.yeses;
    } else {
      noTarget.innerHTML = objectInCurrentFilteredReviews.noes;
    }

    yesTarget.style.color = 'rgb(41, 120, 38)';
    noTarget.style.color = 'rgb(180, 48, 52)';

    for (let i = 0; i < buttons.length; i++) {
      const target = buttons[i];
      target.style.cursor = 'default';
      target.style.boxShadow = null;
    }
  }
};

const handleMouseOverYesNoReportButton = function(indexInCurrentFilteredReviews, option) {
  const objectInCurrentFilteredReviews = this.props.filteredReviews[indexInCurrentFilteredReviews];
  const { disabled } = objectInCurrentFilteredReviews;

  if (!disabled || option === 'report') {
    objectInCurrentFilteredReviews[option]++;

    const target = document.getElementById(`${option}-tracker-${indexInCurrentFilteredReviews}`);

    target.style.boxShadow = 'inset 0px 0px 5px 0px rgba(0, 0, 0, 0.2)';
  }
};

const handleMouseOutYesNoReportButton = function(indexInCurrentFilteredReviews, option) {
  const objectInCurrentFilteredReviews = this.props.filteredReviews[indexInCurrentFilteredReviews];
  const { disabled } = objectInCurrentFilteredReviews;

  if (!disabled || option === 'report') {
    objectInCurrentFilteredReviews[option]++;

    const target = document.getElementById(`${option}-tracker-${indexInCurrentFilteredReviews}`);

    target.style.boxShadow = null;
  }
};

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
        <div
          style={{
            display: 'flex',
            backgroundColor: 'rgb(237, 237, 237)',
            padding: '0 0 4px 0',
            margin: '-4px 5px 0 0',
            cursor: 'default',
          }}
        >
          <div
            style={{
              color: 'rgb(51, 51, 51)',
              fontSize: '13px',
              fontWeight: '700',
              margin: '4px 3px 0 10px',
              fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
            }}
          >Yes</div>
          <div
            style={{
              color: 'rgb(51, 51, 51)',
              fontSize: '13px',
              fontWeight: '700',
              margin: '4px 0 0 0',
              fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
            }}
          >&#183;</div>
          <div
            style={{
              color: 'rgb(41, 120, 38)',
              fontSize: '13px',
              fontWeight: '700',
              margin: '4px 10px 0 4px',
              fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
            }}
          >{yeses}</div>
        </div>,
      );

      noButton.push(
        <div
          style={{
            display: 'flex',
            backgroundColor: 'rgb(237, 237, 237)',
            padding: '0 0 4px 0',
            margin: '-4px 5px 0 0',
            cursor: 'default',
          }}
        >
          <div
            style={{
              color: 'rgb(51, 51, 51)',
              fontSize: '13px',
              fontWeight: '700',
              margin: '4px 3px 0 10px',
              fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
            }}
          >No</div>
          <div
            style={{
              color: 'rgb(51, 51, 51)',
              fontSize: '13px',
              fontWeight: '700',
              margin: '4px 0 0 0',
              fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
            }}
          >&#183;</div>
          <div
            style={{
              color: 'rgb(180, 48, 52)',
              fontSize: '13px',
              fontWeight: '700',
              margin: '4px 10px 0 4px',
              fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
            }}
          >{noes}</div>
        </div>,
      );
    } else {
      yesButton.push(
        <div
          className={`helpful-tracker-${indexInCurrentFilteredReviews}`}
          id={`yes-tracker-${indexInCurrentFilteredReviews}`}
          style={{
            display: 'flex',
            backgroundColor: 'rgb(237, 237, 237)',
            padding: '0 0 4px 0',
            margin: '-4px 5px 0 0',
            cursor: 'pointer',
          }}
          onClick={handleClickYesOrNoButton.bind(this, indexInCurrentFilteredReviews, 'yeses')}
          onMouseOver={handleMouseOverYesNoReportButton.bind(this, indexInCurrentFilteredReviews, 'yes')}
          onMouseOut={handleMouseOutYesNoReportButton.bind(this, indexInCurrentFilteredReviews, 'yes')}
        >
          <div
            style={{
              color: 'rgb(51, 51, 51)',
              fontSize: '13px',
              fontWeight: '700',
              margin: '4px 3px 0 10px',
              fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
            }}
          >Yes</div>
          <div
            style={{
              color: 'rgb(51, 51, 51)',
              fontSize: '13px',
              fontWeight: '700',
              margin: '4px 0 0 0',
              fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
            }}
          >&#183;</div>
          <div
            style={{
              color: 'rgb(51, 51, 51)',
              fontSize: '13px',
              fontWeight: '700',
              margin: '4px 10px 0 4px',
              fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
            }}
            id={`yes-button-${indexInCurrentFilteredReviews}`}
          >{yeses}</div>
        </div>,
      );

      noButton.push(
        <div
          className={`helpful-tracker-${indexInCurrentFilteredReviews}`}
          id={`no-tracker-${indexInCurrentFilteredReviews}`}
          style={{
            display: 'flex',
            backgroundColor: 'rgb(237, 237, 237)',
            padding: '0 0 4px 0',
            margin: '-4px 5px 0 0',
            cursor: 'pointer',
          }}
          onClick={handleClickYesOrNoButton.bind(this, indexInCurrentFilteredReviews, 'noes')}
          onMouseOver={handleMouseOverYesNoReportButton.bind(this, indexInCurrentFilteredReviews, 'no')}
          onMouseOut={handleMouseOutYesNoReportButton.bind(this, indexInCurrentFilteredReviews, 'no')}
        >
          <div
            style={{
              color: 'rgb(51, 51, 51)',
              fontSize: '13px',
              fontWeight: '700',
              margin: '4px 3px 0 10px',
              fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
            }}
          >No</div>
          <div
            style={{
              color: 'rgb(51, 51, 51)',
              fontSize: '13px',
              fontWeight: '700',
              margin: '4px 0 0 0',
              fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
            }}
          >&#183;</div>
          <div
            style={{
              color: 'rgb(51, 51, 51)',
              fontSize: '13px',
              fontWeight: '700',
              margin: '4px 10px 0 4px',
              fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
            }}
            id={`no-button-${indexInCurrentFilteredReviews}`}
          >{noes}</div>
        </div>,
      );
    }

    return (
      <div
        className='helpful-trackers'
        style={{
          display: 'flex',
          margin: '24px 9px 0 1px',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
            color: 'rgb(102, 102, 102)',
            margin: '0 10px 0 0',
          }}
        >Helpful?</div>
        {yesButton}
        {noButton}
        <div
          id={`report-tracker-${indexInCurrentFilteredReviews}`}
          style={{
            display: 'flex',
            backgroundColor: 'rgb(237, 237, 237)',
            color: 'rgb(51, 51, 51',
            padding: '4px 10px 0 10px',
            margin: '-4px 5px 0 0',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '700',
            fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
          }}
          onMouseOver={handleMouseOverYesNoReportButton.bind(this, indexInCurrentFilteredReviews, 'report')}
          onMouseOut={handleMouseOutYesNoReportButton.bind(this, indexInCurrentFilteredReviews, 'report')}
        >Report</div>
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
