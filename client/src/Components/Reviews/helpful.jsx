import updateFilteredReviews from '../../ReduxSpecificComponents/Actions/updateFilteredReviews';

const { connect } = ReactRedux;

const handleClickYesOrNoButton = function(indexInCurrentFilteredReviews, option, dispatchUpdateFilteredReviews, modal) {
  const objectInCurrentFilteredReviews = this.props.filteredReviews[indexInCurrentFilteredReviews];
  const { disabled } = objectInCurrentFilteredReviews;

  if (!disabled) {
    dispatchUpdateFilteredReviews(indexInCurrentFilteredReviews, option);

    const buttons = document.getElementsByClassName(`helpful-tracker-${indexInCurrentFilteredReviews}${modal === undefined ? '' : '-modal'}`);

    for (let i = 0; i < buttons.length; i++) {
      const target = buttons[i];
      target.style.cursor = 'default';
      target.style.boxShadow = null;
    }

    if (modal) {
      const yesTarget = document.getElementById(`yes-button-${indexInCurrentFilteredReviews}-modal`);
      const noTarget = document.getElementById(`no-button-${indexInCurrentFilteredReviews}-modal`);

      if (option === 'yeses') {
        yesTarget.innerHTML = Number.parseInt(yesTarget.innerHTML, 10) + 1;
      } else {
        noTarget.innerHTML = Number.parseInt(noTarget.innerHTML, 10) + 1;
      }

      yesTarget.style.color = 'rgb(41, 120, 38)';
      noTarget.style.color = 'rgb(180, 48, 52)';
    }
  }
};

const handleMouseOverYesNoReportButton = function(indexInCurrentFilteredReviews, option, modal) {
  const objectInCurrentFilteredReviews = this.props.filteredReviews[indexInCurrentFilteredReviews];
  const { disabled } = objectInCurrentFilteredReviews;

  if (!disabled || option === 'report') {
    objectInCurrentFilteredReviews[option]++;

    const target = document.getElementById(`${option}-tracker-${indexInCurrentFilteredReviews}${modal === undefined ? '' : '-modal'}`);

    target.style.boxShadow = 'inset 0px 0px 5px 0px rgba(0, 0, 0, 0.2)';
  }
};

const handleMouseOutYesNoReportButton = function(indexInCurrentFilteredReviews, option, modal) {
  const objectInCurrentFilteredReviews = this.props.filteredReviews[indexInCurrentFilteredReviews];
  const { disabled } = objectInCurrentFilteredReviews;

  if (!disabled || option === 'report') {
    objectInCurrentFilteredReviews[option]++;

    const target = document.getElementById(`${option}-tracker-${indexInCurrentFilteredReviews}${modal === undefined ? '' : '-modal'}`);

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
      dispatchUpdateFilteredReviews,
      modal,
    } = this.props;

    const yesButton = [];
    const noButton = [];

    if (disabled) {
      yesButton.push(
        <div
          className={`helpful-tracker-${indexInCurrentFilteredReviews}${modal === undefined ? '' : '-modal'}`}
          id={`yes-tracker-${indexInCurrentFilteredReviews}${modal === undefined ? '' : '-modal'}`}
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
            id={`yes-button-${indexInCurrentFilteredReviews}${modal === undefined ? '' : '-modal'}`}
          >{yeses}</div>
        </div>,
      );

      noButton.push(
        <div
          className={`helpful-tracker-${indexInCurrentFilteredReviews}${modal === undefined ? '' : '-modal'}`}
          id={`no-tracker-${indexInCurrentFilteredReviews}${modal === undefined ? '' : '-modal'}`}
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
            id={`no-button-${indexInCurrentFilteredReviews}${modal === undefined ? '' : '-modal'}`}
          >{noes}</div>
        </div>,
      );
    } else {
      yesButton.push(
        <div
          className={`helpful-tracker-${indexInCurrentFilteredReviews}${modal === undefined ? '' : '-modal'}`}
          id={`yes-tracker-${indexInCurrentFilteredReviews}${modal === undefined ? '' : '-modal'}`}
          style={{
            display: 'flex',
            backgroundColor: 'rgb(237, 237, 237)',
            padding: '0 0 4px 0',
            margin: '-4px 5px 0 0',
            cursor: 'pointer',
          }}
          onClick={handleClickYesOrNoButton.bind(this, indexInCurrentFilteredReviews, 'yeses', dispatchUpdateFilteredReviews, modal)}
          onMouseOver={handleMouseOverYesNoReportButton.bind(this, indexInCurrentFilteredReviews, 'yes', modal)}
          onMouseOut={handleMouseOutYesNoReportButton.bind(this, indexInCurrentFilteredReviews, 'yes', modal)}
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
            id={`yes-button-${indexInCurrentFilteredReviews}${modal === undefined ? '' : '-modal'}`}
          >{yeses}</div>
        </div>,
      );

      noButton.push(
        <div
          className={`helpful-tracker-${indexInCurrentFilteredReviews}${modal === undefined ? '' : '-modal'}`}
          id={`no-tracker-${indexInCurrentFilteredReviews}${modal === undefined ? '' : '-modal'}`}
          style={{
            display: 'flex',
            backgroundColor: 'rgb(237, 237, 237)',
            padding: '0 0 4px 0',
            margin: '-4px 5px 0 0',
            cursor: 'pointer',
          }}
          onClick={handleClickYesOrNoButton.bind(this, indexInCurrentFilteredReviews, 'noes', dispatchUpdateFilteredReviews, modal)}
          onMouseOver={handleMouseOverYesNoReportButton.bind(this, indexInCurrentFilteredReviews, 'no', modal)}
          onMouseOut={handleMouseOutYesNoReportButton.bind(this, indexInCurrentFilteredReviews, 'no', modal)}
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
            id={`no-button-${indexInCurrentFilteredReviews}${modal === undefined ? '' : '-modal'}`}
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
          id={`report-tracker-${indexInCurrentFilteredReviews}${modal === undefined ? '' : '-modal'}`}
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
          onMouseOver={handleMouseOverYesNoReportButton.bind(this, indexInCurrentFilteredReviews, 'report', modal)}
          onMouseOut={handleMouseOutYesNoReportButton.bind(this, indexInCurrentFilteredReviews, 'report', modal)}
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

const mapDispatch = function(dispatch) {
  return {
    dispatchUpdateFilteredReviews: (index, yesOrNo) => { dispatch(updateFilteredReviews(index, yesOrNo, 'UPDATE_REVIEW_OBJECT')); },
  };
};

const wrappedHelpful = connect(mapState, mapDispatch)(Helpful);

export default wrappedHelpful;
