import updateShowRatingFilterDropDown from '../../ReduxSpecificComponents/Actions/updateShowRatingFilterDropDown.js';
import updateExitedRatingFilter from '../../ReduxSpecificComponents/Actions/updateExitedRatingFilter.js';
import updateFilter from '../../ReduxSpecificComponents/Actions/updateFilter.js';
import RatingsFilterSettings from './ratingsFilterSettings.jsx';

const { connect } = ReactRedux;

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
      <div style={{ display: 'flex', flexDirection: 'column', margin: '5px 0 16px 20px' }}>
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
              margin: '3px 6px 0 0',
              fontSize: '16px',
              color: '#333',
              fontWeight: '700',
            }}
          >&#9662;</div>
          <div
            style={{
              fontStyle: 'italic',
              fontSize: '13px',
              fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
              fontWeight: '700',
              color: '#333',
              margin: '6px 0 0 0',
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
