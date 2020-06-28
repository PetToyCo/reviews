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

    setTimeout(() => {
      document.getElementById('second-dotted-target').style.borderColor = 'hsl(206, 61%, 39%)';
    }, 3);

    dispatchUpdateFilter(value, option);
    dispatchUpdateShowRatingFilterDropDown(false);
    dispatchUpdateEnteredRatingFilterDropDown(false);
  }

  handleMouseOverDropDownMenuItem(stars) {
    const parentElement = document.getElementById(`score-filter-${stars}-button-container`);
    const symbolElement = document.getElementById(`score-filter-${stars}-button-symbol`);
    const starsElement = document.getElementById(`score-filter-${stars}-button-stars`);

    parentElement.style.backgroundColor = 'rgb(0, 88, 145)';
    symbolElement.style.backgroundColor = 'white';
    symbolElement.style.color = 'rgb(0, 88, 145)';
    starsElement.style.color = 'white';
  }

  handleMouseOutDropDownMenuItem(stars, option) {
    const parentElement = document.getElementById(`score-filter-${stars}-button-container`);
    const symbolElement = document.getElementById(`score-filter-${stars}-button-symbol`);
    const starsElement = document.getElementById(`score-filter-${stars}-button-stars`);

    parentElement.style.backgroundColor = option === 'ADD' ? 'white' : 'rgb(247, 247, 247)';
    symbolElement.style.backgroundColor = option === 'ADD' ? 'rgb(102, 102, 102)' : '#333';
    symbolElement.style.color = 'white';
    starsElement.style.color = 'rgb(102, 102, 102)';
  }

  render() {
    const { filter } = this.props;

    const dropDownList = [];

    for (let i = 1; i <= 5; i++) {
      if (filter[i.toString()]) {
        dropDownList.push(
          <div
            id={`score-filter-${i}-button-container`}
            style={{
              display: 'flex',
              padding: '8px 30px 10px 5px',
              borderTopLeftRadius: `${i === 1 ? 4 : 0}px`,
              borderTopRightRadius: `${i === 1 ? 4 : 0}px`,
              borderBottomLeftRadius: `${i === 5 ? 4 : 0}px`,
              borderBottomRightRadius: `${i === 5 ? 4 : 0}px`,
              backgroundColor: 'rgb(247, 247, 247)',
            }}
            onClick={this.handleClickDropDownMenuItem.bind(this, `${i}`, 'CANCEL')}
            onMouseOver={this.handleMouseOverDropDownMenuItem.bind(this, i)}
            onMouseOut={this.handleMouseOutDropDownMenuItem.bind(this, i, 'CANCEL')}
          >
            <div>
              <div
                id={`score-filter-${i}-button-symbol`}
                style={{
                  color: 'white',
                  backgroundColor: '#333',
                  borderRadius: '9px',
                  lineHeight: '9px',
                  width: '9px',
                  height: '9px',
                  padding: '2px 0 0px 2px',
                  fontSize: '9px',
                  fontStyle: 'normal',
                  fontWeight: '200',
                  fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
                  margin: '5px 5px 0 0',
                }}
              >✔</div>
            </div>
            <div
              id={`score-filter-${i}-button-stars`}
              style={{
                fontSize: '14px',
                fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
                margin: '2px 0 0 0',
                color: 'rgb(102, 102, 102)',
              }}
            >{i} star{i === 1 ? '' : 's'}</div>
          </div>,
        );
      } else {
        dropDownList.push(
          <div
            id={`score-filter-${i}-button-container`}
            style={{
              display: 'flex',
              padding: '8px 29px 10px 5px',
              borderTopLeftRadius: `${i === 1 ? 4 : 0}px`,
              borderTopRightRadius: `${i === 1 ? 4 : 0}px`,
              borderBottomLeftRadius: `${i === 5 ? 4 : 0}px`,
              borderBottomRightRadius: `${i === 5 ? 4 : 0}px`,
              backgroundColor: 'white',
            }}
            onClick={this.handleClickDropDownMenuItem.bind(this, `${i}`, 'ADD')}
            onMouseOver={this.handleMouseOverDropDownMenuItem.bind(this, i)}
            onMouseOut={this.handleMouseOutDropDownMenuItem.bind(this, i, 'ADD')}
          >
            <div>
              <div
                id={`score-filter-${i}-button-symbol`}
                style={{
                  color: 'white',
                  backgroundColor: 'rgb(102, 102, 102)',
                  borderRadius: '9px',
                  lineHeight: '9px',
                  width: '9px',
                  height: '9px',
                  padding: '2px 0 0px 2px',
                  fontSize: '12px',
                  fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
                  margin: '5px 6px 0 0',
                }}
              >+</div>
            </div>
            <div
              id={`score-filter-${i}-button-stars`}
              style={{
                fontSize: '14px',
                fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
                margin: '2px 0 0 0',
                color: 'rgb(102, 102, 102)',
              }}
            >{i} star{i === 1 ? '' : 's'}</div>
          </div>,
        );
      }
    }

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid rgb(208, 208, 208)',
          borderRadius: '4px',
          width: '94px',
          fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
          cursor: 'pointer',
          position: 'absolute',
          zIndex: 10,
          top: '30px',
          left: '1px',
        }}
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
