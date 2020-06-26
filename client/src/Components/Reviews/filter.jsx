import updateShowNonNumberFilterSetting from '../../ReduxSpecificComponents/Actions/updateShowNonNumberFilterSetting.js';
import updateExitedNonNumberFilterDropDownSource from '../../ReduxSpecificComponents/Actions/updateExitedNonNumberFilterDropDownSource.js';
import updateFilter from '../../ReduxSpecificComponents/Actions/updateFilter.js';
import updateShowRatingFilter from '../../ReduxSpecificComponents/Actions/updateShowRatingFilter.js';
import RatingsFilter from './ratingsFilter.jsx';
import ActiveFilters from './activeFilters.jsx';

const { connect } = ReactRedux;

class Filter extends React.Component {
  // constructor(props) {
  //   super();
  // }
  // "ϙ"

  actuallyDispatchShowNonNumberFilterSetting() {
    const { exitedNonNumberFilterDropDownSource, dispatchUpdateShowNonNumberFilterSetting } = this.props;

    if (!exitedNonNumberFilterDropDownSource) {
      dispatchUpdateShowNonNumberFilterSetting(true);
    }
  }

  handleEnterNonNumberDropDownSource() {
    const { showNonNumberFilterSetting } = this.props;

    if (!showNonNumberFilterSetting) {
      setTimeout(this.actuallyDispatchShowNonNumberFilterSetting.bind(this), 150);
    }
  }

  resetExitNonNumberedDropDownSourceToFalse() {
    const { dispatchUpdateExitedNonNumberFilterDropDownSource } = this.props;

    dispatchUpdateExitedNonNumberFilterDropDownSource(false);
  }

  actuallyDispatchHideNonNumberFilterSetting() {
    const { enteredNonNumberFilterSetting, dispatchUpdateShowNonNumberFilterSetting } = this.props;

    if (!enteredNonNumberFilterSetting) {
      dispatchUpdateShowNonNumberFilterSetting(false);
    }
  }

  handleExitNonNumberDropDownSource() {
    const { dispatchUpdateExitedNonNumberFilterDropDownSource } = this.props;

    dispatchUpdateExitedNonNumberFilterDropDownSource(true);

    setTimeout(this.resetExitNonNumberedDropDownSourceToFalse.bind(this), 125);

    setTimeout(this.actuallyDispatchHideNonNumberFilterSetting.bind(this), 250);
  }

  handleClickNonNumberDropDownSource() {
    const { showNonNumberFilterSetting, dispatchUpdateShowNonNumberFilterSetting } = this.props;

    dispatchUpdateShowNonNumberFilterSetting(!showNonNumberFilterSetting);
  }

  handleClickMenuExpansionButton() {
    const { dispatchUpdateShowRatingFilter, showRatingFilter } = this.props;

    dispatchUpdateShowRatingFilter(!showRatingFilter);
  }

  render() {
    const {
      filteredReviews,
      reviewRange,
      numberOfReviews,
      currentNonNumberFilterSetting,
      showRatingFilter,
    } = this.props;

    // If there is only one review, the filter component does not display
    if (numberOfReviews === 1) {
      return <div />;
    }

    let reviewRangeHeader = '';

    if (filteredReviews.length > 0) {
      reviewRangeHeader = `${reviewRange[0] + 1}-${reviewRange[1] + 1} of ${filteredReviews.length} Reviews`;
    }

    const RatingFilter = [];

    if (showRatingFilter) {
      RatingFilter.push(<RatingsFilter />);
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex' }}>
          <div>{reviewRangeHeader}</div>
          <div
            style={{ display: 'flex' }}
            onMouseOver={this.handleEnterNonNumberDropDownSource.bind(this)}
            onMouseOut={this.handleExitNonNumberDropDownSource.bind(this)}
            onClick={this.handleClickNonNumberDropDownSource.bind(this)}
          >
            <div>Sort by:</div>
            <div>{`${currentNonNumberFilterSetting}`}</div>
            <div>&#9662;</div>
          </div>
          <div onClick={this.handleClickMenuExpansionButton.bind(this)}>&#8801;</div>
        </div>
        {RatingFilter}
        <ActiveFilters />
      </div>
    );
  }
}

const mapState = function(state) {
  const {
    filteredReviews,
    reviewRange,
    numberOfReviews,
    currentNonNumberFilterSetting,
    enteredNonNumberFilterSetting,
    exitedNonNumberFilterDropDownSource,
    showNonNumberFilterSetting,
    showRatingFilter,
  } = state;

  return {
    filteredReviews,
    reviewRange,
    numberOfReviews,
    currentNonNumberFilterSetting,
    enteredNonNumberFilterSetting,
    exitedNonNumberFilterDropDownSource,
    showNonNumberFilterSetting,
    showRatingFilter,
  };
};

const mapDispatch = function(dispatch) {
  return {
    dispatchUpdateShowNonNumberFilterSetting: (value) => { dispatch(updateShowNonNumberFilterSetting(value)); },
    dispatchUpdateExitedNonNumberFilterDropDownSource: (value) => { dispatch(updateExitedNonNumberFilterDropDownSource(value)); },
    dispatchUpdateFilter: (value, option) => { dispatch(updateFilter(value, option)); },
    dispatchUpdateShowRatingFilter: (value) => { dispatch(updateShowRatingFilter(value)); },
  };
};

const wrappedFilter = connect(mapState, mapDispatch)(Filter);

export default wrappedFilter;
