import updateShowNonNumberFilterSetting from '../../ReduxSpecificComponents/Actions/updateShowNonNumberFilterSetting.js';
import updateEnteredNonNumberFilterSetting from '../../ReduxSpecificComponents/Actions/updateEnteredNonNumberFilterSetting.js';
import updateFilter from '../../ReduxSpecificComponents/Actions/updateFilter.js';

const { connect } = ReactRedux;
const mapOptions = {
  'Most Recent': 'MostRecent',
  'Most Helpful': 'MostHelpful',
  'Highest To Lowest Rating': 'HighToLow',
  'Lowest To Highest Rating': 'LowToHigh',
};

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

    if (innerHTML === 'Highest to Lowest Rating') {
      dispatchUpdateFilter('HighToLow');
    } else {
      dispatchUpdateFilter(mapOptions[innerHTML]);
    }

    dispatchUpdateShowNonNumberFilterSetting(false);
    dispatchUpdateEnteredNonNumberFilterSetting(false);
  }

  handleMouseOverDropDownMenuItem(id) {
    const target = document.getElementById(id);

    target.style.backgroundColor = '#005891';
    target.style.color = 'white';
  }

  handleMouseOutDropDownMenuItem(id) {
    const { filter } = this.props;
    const target = document.getElementById(id);
    const { innerHTML } = target;
    const anotherUnnecessaryButTotallyNecessary = filter.HighToLow;

    if (filter[mapOptions[innerHTML]]) {
      target.style.backgroundColor = '#f7f7f7';
    } else if (anotherUnnecessaryButTotallyNecessary && innerHTML === 'Highest to Lowest Rating') {
      target.style.backgroundColor = '#f7f7f7';
    } else {
      target.style.backgroundColor = 'white';
    }

    target.style.color = '#666';
  }

  render() {
    const { filter } = this.props;
    const unnecessaryButTotallyNecessary = filter.HighToLow;
    const unhighlightedStyles = {
      width: '183px',
      height: '20px',
      backgroundColor: 'white',
      fontSize: 'inherit',
      fontFamily: 'inherit',
      padding: '10px 30px 6px 11px',
      color: '#666',
      cursor: 'pointer',
    };

    const highlightedStyles = {
      width: '183px',
      height: '20px',
      backgroundColor: '#f7f7f7',
      fontSize: 'inherit',
      fontFamily: 'inherit',
      padding: '10px 30px 6px 11px',
      color: '#666',
      cursor: 'pointer',
    };

    return (
      <div
        id='non-number-filter-menu'
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          top: '43px',
          left: '801px',
          fontSize: '14px',
          fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
          border: '1px solid rgb(208, 208, 208)',
          borderRadius: '4px',
          zIndex: 10,
        }}
        onMouseOver={this.handleEnterNonNumberFilterSetting.bind(this)}
        onMouseOut={this.handleExitNonNumberFilterSetting.bind(this)}
      >
        <div
          id='most-helpful'
          style={Object.assign(
            {},
            (filter['MostHelpful'] ? highlightedStyles : unhighlightedStyles),
            { borderRadius: '4px 4px 0 0' },
          )}
          onClick={this.handleClickDropDownMenuItem.bind(this)}
          onMouseOver={this.handleMouseOverDropDownMenuItem.bind(this, 'most-helpful')}
          onMouseOut={this.handleMouseOutDropDownMenuItem.bind(this, 'most-helpful')}
        >Most Helpful</div>
        <div
          id='high-to-low'
          style={unnecessaryButTotallyNecessary ? highlightedStyles : unhighlightedStyles}
          onClick={this.handleClickDropDownMenuItem.bind(this)}
          onMouseOver={this.handleMouseOverDropDownMenuItem.bind(this, 'high-to-low')}
          onMouseOut={this.handleMouseOutDropDownMenuItem.bind(this, 'high-to-low')}
        >Highest to Lowest Rating</div>
        <div
          id='low-to-high'
          style={filter['LowToHigh'] ? highlightedStyles : unhighlightedStyles}
          onClick={this.handleClickDropDownMenuItem.bind(this)}
          onMouseOver={this.handleMouseOverDropDownMenuItem.bind(this, 'low-to-high')}
          onMouseOut={this.handleMouseOutDropDownMenuItem.bind(this, 'low-to-high')}
        >Lowest To Highest Rating</div>
        <div
          id='most-recent'
          style={Object.assign(
            {},
            (filter['MostRecent'] ? highlightedStyles : unhighlightedStyles),
            { borderRadius: '0 0 4px 4px' },
          )}
          onClick={this.handleClickDropDownMenuItem.bind(this)}
          onMouseOver={this.handleMouseOverDropDownMenuItem.bind(this, 'most-recent')}
          onMouseOut={this.handleMouseOutDropDownMenuItem.bind(this, 'most-recent')}
        >Most Recent</div>
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
