import updateShowNonNumberFilterSetting from '../../ReduxSpecificComponents/Actions/updateShowNonNumberFilterSetting.js';
import updateEnteredNonNumberFilterSetting from '../../ReduxSpecificComponents/Actions/updateEnteredNonNumberFilterSetting.js';
import updateFilter from '../../ReduxSpecificComponents/Actions/updateFilter.js';

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
    dispatchUpdateEnteredNonNumberFilterSetting(false);
  }

  render() {
    const { filter } = this.props;

    const unhighlightedStyles = {
      width: '182px',
      height: '20px',
      backgroundColor: 'white',
      fontSize: 'inherit',
      fontFamily: 'inherit',
      padding: '8px 0 8px 10px',
    }

    const highlightedStyles = {
      width: '182px',
      height: '20px',
      backgroundColor: '#f7f7f7',
      fontSize: 'inherit',
      fontFamily: 'inherit',
      padding: '8px 0 8px 10px',

    }

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          top: '40px',
          left: '850px',
          fontSize: '14px',
          fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
          border: '1px solid rgb(200, 200, 200)',
          borderRadius: '4px',
          zIndex: 10,
        }}
        onMouseOver={this.handleEnterNonNumberFilterSetting.bind(this)}
        onMouseOut={this.handleExitNonNumberFilterSetting.bind(this)}
      >
        <div
          style={Object.assign(
            {},
            (filter['MostHelpful'] ? highlightedStyles : unhighlightedStyles),
            {
              // borderTop: '1px black',
              // borderRight: '1px black',
              // borderLeft: '1px black',
              // borderRadius: '4px 4px 0 0'
            }
          )}
          onClick={this.handleClickDropDownMenuItem.bind(this)}
        >Most Helpful</div>
        <div
          style={filter['HightoLow'] ? highlightedStyles : unhighlightedStyles}
          onClick={this.handleClickDropDownMenuItem.bind(this)}
        >Highest to Lowest Rating</div>
        <div
          style={filter['LowToHigh'] ? highlightedStyles : unhighlightedStyles}
          onClick={this.handleClickDropDownMenuItem.bind(this)}
        >Lowest To Highest Rating</div>
        <div style={filter['MostRecent'] ? highlightedStyles : unhighlightedStyles} onClick={this.handleClickDropDownMenuItem.bind(this)}>Most Recent</div>
      </div>
    );
  }
}

const mapState = function(state) {
  const { filter, enteredNonNumberFilterSetting } = state;
  return {
    filter,
    enteredNonNumberFilterSetting,
  };
};

const mapDispatch = function(dispatch) {
  return {
    dispatchUpdateShowNonNumberFilterSetting: (value) => { dispatch(updateShowNonNumberFilterSetting(value)); },
    dispatchUpdateFilter: (value, option) => { dispatch(updateFilter(value, option)); },
    dispatchUpdateEnteredNonNumberFilterSetting: (value) => { dispatch(updateEnteredNonNumberFilterSetting(value)); },
  };
};

const wrappedNonNumberFilterSettings = connect(mapState, mapDispatch)(NonNumberFilterSettings);

export default wrappedNonNumberFilterSettings;
