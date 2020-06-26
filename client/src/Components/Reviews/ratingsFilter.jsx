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
    const { showRatingFilterDropDown } = this.props;

    if (!showRatingFilterDropDown) {
      setTimeout(this.actuallyDispatchShowRatingFilterDropDown.bind(this), 150);
    }
  }

  resetExitRatingFilterToFalse() {
    const { dispatchUpdateExitedRatingFilter } = this.props;

    dispatchUpdateExitedRatingFilter(false);
  }

  actuallyDispatchHideRatingFilter() {
    const { enteredRatingFilterDropDown, dispatchUpdateShowRatingFilterDropDown } = this.props;

    if (!enteredRatingFilterDropDown) {
      dispatchUpdateShowRatingFilterDropDown(false);
    }
  }

  handleExitRatingFilter() {
    const { dispatchUpdateExitedRatingFilter } = this.props;

    dispatchUpdateExitedRatingFilter(true);

    setTimeout(this.resetExitRatingFilterToFalse.bind(this), 125);

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
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{ display: 'flex' }}
          onMouseOver={this.handleEnterRatingFilter.bind(this)}
          onMouseOut={this.handleExitRatingFilter.bind(this)}
          onClick={this.handleClickRatingFilter.bind(this)}
        >
          <div>&#9662;</div>
          <div>Rating</div>
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
