import updateShowNonNumberFilterSetting from '../../ReduxSpecificComponents/Actions/updateShowNonNumberFilterSetting.js';
import updateExitedNonNumberFilterDropDownSource from '../../ReduxSpecificComponents/Actions/updateExitedNonNumberFilterDropDownSource.js';
import updateFilter from '../../ReduxSpecificComponents/Actions/updateFilter.js';
import updateShowRatingFilter from '../../ReduxSpecificComponents/Actions/updateShowRatingFilter.js';
import RatingsFilter from './ratingsFilter.jsx';
import ActiveFilters from './activeFilters.jsx';

const { connect } = ReactRedux;

document.getElementsByTagName('body')[0].addEventListener('click', () => {
  document.getElementById('dotted-target').style.borderColor = 'transparent';
});

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
    const { showNonNumberFilterSetting, dispatchUpdateExitedNonNumberFilterDropDownSource } = this.props;

    document.getElementById('dotted-target').style.borderColor = 'hsl(206, 61%, 39%)';
    dispatchUpdateExitedNonNumberFilterDropDownSource(false);

    if (!showNonNumberFilterSetting) {
      setTimeout(this.actuallyDispatchShowNonNumberFilterSetting.bind(this), 150);
    }
  }

  actuallyDispatchHideNonNumberFilterSetting() {
    const {
      enteredNonNumberFilterSetting,
      exitedNonNumberFilterDropDownSource,
      dispatchUpdateShowNonNumberFilterSetting,
      dispatchUpdateExitedNonNumberFilterDropDownSource,
    } = this.props;

    if (!enteredNonNumberFilterSetting && exitedNonNumberFilterDropDownSource) {
      dispatchUpdateShowNonNumberFilterSetting(false);
      dispatchUpdateExitedNonNumberFilterDropDownSource(false);
    }
  }

  handleExitNonNumberDropDownSource() {
    const { dispatchUpdateExitedNonNumberFilterDropDownSource } = this.props;

    dispatchUpdateExitedNonNumberFilterDropDownSource(true);

    setTimeout(this.actuallyDispatchHideNonNumberFilterSetting.bind(this), 250);
  }

  handleClickNonNumberDropDownSource() {
    const { showNonNumberFilterSetting, dispatchUpdateShowNonNumberFilterSetting } = this.props;

    dispatchUpdateShowNonNumberFilterSetting(!showNonNumberFilterSetting);
  }

  handleClickNonNumberDropDownSourceDescription() {
    setTimeout(() => {
      document.getElementById('dotted-target').style.borderColor = 'hsl(206, 61%, 39%)';
    }, 3);
  }

  handleClickMenuExpansionButton() {
    const { dispatchUpdateShowRatingFilter, showRatingFilter } = this.props;

    dispatchUpdateShowRatingFilter(!showRatingFilter);
  }

  handleMouseOverMenuExpansionButton() {
    const target = document.getElementById('btn-number-filter-expansion');

    target.style.backgroundColor = '#ddd';
    target.style.boxShadow = 'inset 0 0 5px 0 rgba(0, 0, 0, .2)';
    target.style.margin = '5px 10px 6px 9px';
  }

  handleMouseOutMenuExpansionButton() {
    const target = document.getElementById('btn-number-filter-expansion');

    target.style.backgroundColor = '#ededed';
    target.style.boxShadow = 'none';
    target.style.margin = '6px 10px 5px 9px';
  }

  render() {
    const {
      filteredReviews,
      reviewRange,
      numberOfReviews,
      showRatingFilter,
      filter,
    } = this.props;

    // If there is only one review, the filter component does not display
    if (numberOfReviews === 1) {
      return <div />;
    }

    let displayCurrentNonNumberedFilterSetting;

    if (filter['MostRecent']) {
      displayCurrentNonNumberedFilterSetting = 'Most Recent';
    }

    if (filter['MostHelpful']) {
      displayCurrentNonNumberedFilterSetting = 'Most Helpful';
    }

    if (filter['HighToLow']) {
      displayCurrentNonNumberedFilterSetting = 'Highest To Lowest Rating';
    }

    if (filter['LowToHigh']) {
      displayCurrentNonNumberedFilterSetting = 'Lowest To Highest Rating';
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
      <div id='filter-header' style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{
          display: 'flex',
          width: '1075px',
          height: '43.375px',
          margin: '0 10px 0px 10px',
          color: '#333',
          fontSize: ' 14px',
          fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
          fontWeight: '400',
          background: '#f7f7f7',
          position: 'relative',
        }}>
          <div style={{
            padding: '10px',
            position: 'relative',
            float: 'left',
            color: 'inherit',
            marginTop: '3px',
            marginRight: 'auto',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            fontWeight: 'inherit',
          }}
          >
            {reviewRangeHeader}
          </div>
          <div
            style={{
              display: 'flex',
              padding: '10px',
              position: 'relative',
              float: 'none',
              color: 'inherit',
              marginTop: '3px',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              fontWeight: 'inherit',
            }}
            onMouseOver={this.handleEnterNonNumberDropDownSource.bind(this)}
            onMouseOut={this.handleExitNonNumberDropDownSource.bind(this)}
            onClick={this.handleClickNonNumberDropDownSource.bind(this)}
          >
            <div style={{ marginRight: '4px' }}>Sort by:</div>
            <div
              id='dotted-target'
              style={{ marginRight: '5px', border: '1px dotted transparent', height: '16px' }}
              onClick={this.handleClickNonNumberDropDownSourceDescription.bind(this)}
            >{displayCurrentNonNumberedFilterSetting}</div>
            <div style={{ color: '#000' }}>&#9662;</div>
          </div>
          <button
            id='btn-number-filter-expansion'
            style={{
              margin: '6px 10px 5px 9px',
              height: '32px',
              width: '36px',
              border: '0',
              color: '#333',
              fontWeight: '700',
              lineHeight: '24px',
              fontSize: '24px',
              fontFamily: 'inherit',
              float: 'right',
              backgroundColor: '#ededed',
              cursor: 'pointer',
              // outlineColor: 'transparent',
              outlineWidth: '0',
            }}
            onClick={this.handleClickMenuExpansionButton.bind(this)}
            onMouseOver={this.handleMouseOverMenuExpansionButton.bind(this)}
            onMouseOut={this.handleMouseOutMenuExpansionButton.bind(this)}
          >&#8801;</button>
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
    enteredNonNumberFilterSetting,
    exitedNonNumberFilterDropDownSource,
    showNonNumberFilterSetting,
    showRatingFilter,
    filter,
  } = state;

  return {
    filteredReviews,
    reviewRange,
    numberOfReviews,
    enteredNonNumberFilterSetting,
    exitedNonNumberFilterDropDownSource,
    showNonNumberFilterSetting,
    showRatingFilter,
    filter,
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
