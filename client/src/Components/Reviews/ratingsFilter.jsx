import updateShowRatingFilterDropDown from '../../ReduxSpecificComponents/Actions/updateShowRatingFilterDropDown.js';
import updateExitedRatingFilter from '../../ReduxSpecificComponents/Actions/updateExitedRatingFilter.js';
import updateFilter from '../../ReduxSpecificComponents/Actions/updateFilter.js';
import RatingsFilterSettings from './ratingsFilterSettings.jsx';

const { connect } = ReactRedux;

document.getElementsByTagName('body')[0].addEventListener('click', () => {
  const target = document.getElementById('second-dotted-target');
  if (target) {
    target.style.borderColor = 'transparent';
  }
});

class RatingsFilter extends React.Component {
  // constructor(props) {
  //   super();
  // }

  actuallyDispatchShowRatingFilterDropDown() {
    const { exitedRatingFilter, dispatchUpdateShowRatingFilterDropDown } = this.props;

    if (!exitedRatingFilter) {
      dispatchUpdateShowRatingFilterDropDown(true);
    }
  }

  handleEnterRatingFilter() {
    const { showRatingFilterDropDown, dispatchUpdateExitedRatingFilter } = this.props;

    dispatchUpdateExitedRatingFilter(false);

    document.getElementById('second-dotted-target').style.borderColor = 'hsl(206, 61%, 39%)';

    if (!showRatingFilterDropDown) {
      setTimeout(this.actuallyDispatchShowRatingFilterDropDown.bind(this), 150);
    }
  }

  actuallyDispatchHideRatingFilter() {
    const {
      enteredRatingFilterDropDown,
      exitedRatingFilter,
      dispatchUpdateShowRatingFilterDropDown,
      dispatchUpdateExitedRatingFilter,
    } = this.props;

    if (!enteredRatingFilterDropDown && exitedRatingFilter) {
      dispatchUpdateShowRatingFilterDropDown(false);
      dispatchUpdateExitedRatingFilter(false);
    }
  }

  handleExitRatingFilter() {
    const { dispatchUpdateExitedRatingFilter } = this.props;

    dispatchUpdateExitedRatingFilter(true);

    setTimeout(this.actuallyDispatchHideRatingFilter.bind(this), 250);
  }

  handleClickRatingFilter() {
    const { showRatingFilterDropDown, dispatchUpdateShowRatingFilterDropDown } = this.props;

    setTimeout(() => {
      document.getElementById('second-dotted-target').style.borderColor = 'hsl(206, 61%, 39%)';
    }, 3);

    dispatchUpdateShowRatingFilterDropDown(!showRatingFilterDropDown);
  }

  render() {
    const {
      showRatingFilterDropDown,
    } = this.props;

    const RatingFilterDropDown = [];

    if (showRatingFilterDropDown) {
      RatingFilterDropDown.push(<RatingsFilterSettings />);
    }

    return (
      <div
        id='score-ratings-filter'
        style={{
          display: 'flex',
          flexDirection: 'column',
          margin: '15px 0 16px 20px',
          position: 'relative',
          cursor: 'default',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '60px',
            height: '23px',
            backgroundColor: '#ededed',
            padding: '3px 10px 5px 11px',
          }}
          onMouseOver={this.handleEnterRatingFilter.bind(this)}
          onMouseOut={this.handleExitRatingFilter.bind(this)}
          onClick={this.handleClickRatingFilter.bind(this)}
        >
          <div
            style={{
              margin: '4px 4px 0 0',
              fontSize: '16px',
              color: '#333',
              fontWeight: '700',
            }}
          >&#9662;</div>
          <div
            id='second-dotted-target'
            style={{
              fontStyle: 'italic',
              fontSize: '13px',
              fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
              fontWeight: '700',
              color: '#333',
              margin: '4px 0 0 0',
              padding: '2px 2px 0 2px',
              border: '1px dotted transparent',
            }}
          >Rating</div>
        </div>
        {RatingFilterDropDown}
      </div>
    );
  }
}

const mapState = function(state) {
  const {
    enteredRatingFilterDropDown,
    exitedRatingFilter,
    showRatingFilterDropDown,
  } = state;

  return {
    enteredRatingFilterDropDown,
    exitedRatingFilter,
    showRatingFilterDropDown,
  };
};

const mapDispatch = function(dispatch) {
  return {
    dispatchUpdateExitedRatingFilter: (value) => { dispatch(updateExitedRatingFilter(value)); },
    dispatchUpdateFilter: (value, option) => { dispatch(updateFilter(value, option)); },
    dispatchUpdateShowRatingFilterDropDown: (value) => { dispatch(updateShowRatingFilterDropDown(value)); },
  };
};

const wrappedRatingsFilter = connect(mapState, mapDispatch)(RatingsFilter);

export default wrappedRatingsFilter;
