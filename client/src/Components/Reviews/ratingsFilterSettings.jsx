import updateShowRatingFilterDropDown from '../../ReduxSpecificComponents/Actions/updateShowRatingFilterDropDown.js';
import updateEnteredRatingFilterDropDown from '../../ReduxSpecificComponents/Actions/updateEnteredRatingFilterDropDown.js';
import updateFilter from '../../ReduxSpecificComponents/Actions/updateFilter.js';

const { connect } = ReactRedux;

class RatingsFilterSettings extends React.Component {
  // constructor(props) {
  //   super();
  // }

  handleEnterRatingFilterDropDown() {
    const { dispatchUpdateEnteredRatingFilterDropDown } = this.props;

    dispatchUpdateEnteredRatingFilterDropDown(true);
  }

  actuallyDispatchHideRatingFilter() {
    const { enteredRatingFilterDropDown, dispatchUpdateShowRatingFilterDropDown } = this.props;

    if (!enteredRatingFilterDropDown) {
      dispatchUpdateShowRatingFilterDropDown(false);
    }
  }

  handleExitFilterDropDown() {
    const { dispatchUpdateEnteredRatingFilterDropDown } = this.props;

    dispatchUpdateEnteredRatingFilterDropDown(false);

    setTimeout(this.actuallyDispatchHideRatingFilter.bind(this), 300);
  }

  //On the actual PetCo site, clicking this button sems to have a delay before it actually shows the updated.
  //This seems to be due to a slow refiltering process, possibly an ajax request.
  //If filtering too fast, may need to slow it down with a setTimeout()
  handleClickDropDownMenuItem(value, option) {
    const {
      dispatchUpdateShowRatingFilterDropDown,
      dispatchUpdateFilter,
      dispatchUpdateEnteredRatingFilterDropDown,
    } = this.props;

    dispatchUpdateFilter(value, option);
    dispatchUpdateShowRatingFilterDropDown(false);
    dispatchUpdateEnteredRatingFilterDropDown(false);
  }

  render() {
    const { filter } = this.props;

    const dropDownList = [];

    for (let i = 1; i <= 5; i++) {
      if (filter[i.toString()]) {
        dropDownList.push(<div onClick={this.handleClickDropDownMenuItem.bind(this, `${i}`, 'CANCEL')}>CheckSymbol {i} star</div>);
      } else {
        dropDownList.push(<div onClick={this.handleClickDropDownMenuItem.bind(this, `${i}`, 'ADD')}>PlusSymbol {i} star</div>);
      }
    }

    return (
      <div
        style={{ display: 'flex', flexDirection: 'column' }}
        onMouseOver={this.handleEnterRatingFilterDropDown.bind(this)}
        onMouseOut={this.handleExitFilterDropDown.bind(this)}
      >
        {dropDownList}
      </div>
    );
  }
}

const mapState = function(state) {
  const { filter, enteredRatingFilterDropDown } = state;
  return {
    filter,
    enteredRatingFilterDropDown,
  };
};

const mapDispatch = function(dispatch) {
  return {
    dispatchUpdateShowRatingFilterDropDown: (value) => { dispatch(updateShowRatingFilterDropDown(value)); },
    dispatchUpdateEnteredRatingFilterDropDown: (value) => { dispatch(updateEnteredRatingFilterDropDown(value)); },
    dispatchUpdateFilter: (value, option) => { dispatch(updateFilter(value, option)); },
  };
};

const wrappedRatingsFilterSettings = connect(mapState, mapDispatch)(RatingsFilterSettings);

export default wrappedRatingsFilterSettings;
