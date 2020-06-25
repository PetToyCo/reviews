import updateShowNonNumberFilterSetting from '../../ReduxSpecificComponents/Actions/updateShowNonNumberFilterSetting.js';
import updateEnteredNonNumberFilterSetting from '../../ReduxSpecificComponents/Actions/updateEnteredNonNumberFilterSetting.js';
import updateFilter from '../../ReduxSpecificComponents/Actions/updateFilter.js';
import updateCurrentNonNumberFilterSetting from '../../ReduxSpecificComponents/Actions/updateCurrentNonNumberFilterSetting.js';

const { connect } = ReactRedux;

class NonNumberFilterSettings extends React.Component {
  // constructor(props) {
  //   super();
  // }

  handleEnterNonNumberFilterSetting() {
    const { dispatchUpdateEnteredNonNumberFilterSetting } = this.props;

    dispatchUpdateEnteredNonNumberFilterSetting(true);
  }

  actuallyDispatchHideNonNumberFilterSetting() {
    const { enteredNonNumberFilterSetting, dispatchUpdateShowNonNumberFilterSetting } = this.props;

    if (!enteredNonNumberFilterSetting) {
      dispatchUpdateShowNonNumberFilterSetting(false);
    }
  }

  handleExitNonNumberFilterSetting() {
    const { dispatchUpdateEnteredNonNumberFilterSetting } = this.props;

    dispatchUpdateEnteredNonNumberFilterSetting(false);

    setTimeout(this.actuallyDispatchHideNonNumberFilterSetting.bind(this), 300);
  }

  //On the actual PetCo site, clicking this button sems to have a delay before it actually shows the updated.
  //This seems to be due to a slow refiltering process, possibly an ajax request.
  //If filtering too fast, may need to slow it down with a setTimeout()
  handleClickDropDownMenuItem(e) {
    const {
      dispatchUpdateShowNonNumberFilterSetting,
      dispatchUpdateCurrentNonNumberFilterSetting,
      dispatchUpdateFilter,
      dispatchUpdateEnteredNonNumberFilterSetting,
    } = this.props;
    const { innerHTML } = e.target;

    const mapOptions = {
      'Most Recent': 'MostRecent',
      'Most Helpful': 'MostHelpful',
      'Highest To Lowest Rating': 'HighToLow',
      'Lowest To Highest Rating': 'LowToHigh',
    };

    dispatchUpdateFilter(mapOptions[innerHTML]);
    dispatchUpdateShowNonNumberFilterSetting(false);
    dispatchUpdateCurrentNonNumberFilterSetting(innerHTML);
    dispatchUpdateEnteredNonNumberFilterSetting(false);
  }

  render() {
    const { currentNonNumberFilterSetting } = this.props;

    return (
      <div
        style={{ display: 'flex', flexDirection: 'column' }}
        onMouseOver={this.handleEnterNonNumberFilterSetting.bind(this)}
        onMouseOut={this.handleExitNonNumberFilterSetting.bind(this)}
      >
        <div onClick={this.handleClickDropDownMenuItem.bind(this)}>Most Helpful</div>
        <div onClick={this.handleClickDropDownMenuItem.bind(this)}>Highest to Lowest Rating</div>
        <div onClick={this.handleClickDropDownMenuItem.bind(this)}>Lowest To Highest Rating</div>
        <div onClick={this.handleClickDropDownMenuItem.bind(this)}>Most Recent</div>
      </div>
    );
  }
}

const mapState = function(state) {
  const { currentNonNumberFilterSetting, enteredNonNumberFilterSetting } = state;
  return {
    currentNonNumberFilterSetting,
    enteredNonNumberFilterSetting,
  };
};

const mapDispatch = function(dispatch) {
  return {
    dispatchUpdateShowNonNumberFilterSetting: (value) => { dispatch(updateShowNonNumberFilterSetting(value)); },
    dispatchUpdateEnteredNonNumberFilterSetting: (value) => { dispatch(updateEnteredNonNumberFilterSetting(value)); },
    dispatchUpdateFilter: (value, option) => { dispatch(updateFilter(value, option)); },
    dispatchUpdateCurrentNonNumberFilterSetting: (value) => { dispatch(updateCurrentNonNumberFilterSetting(value)); },
  };
};

const wrappedNonNumberFilterSettings = connect(mapState, mapDispatch)(NonNumberFilterSettings);

export default wrappedNonNumberFilterSettings;
