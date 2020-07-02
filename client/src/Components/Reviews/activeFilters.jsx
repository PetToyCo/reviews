import updateFilter from '../../ReduxSpecificComponents/Actions/updateFilter.js';

const { connect } = ReactRedux;

class ActiveFilters extends React.Component {
  // constructor(props) {
  //   super();
  // }

  //On the actual PetCo site, clicking this button sems to have a delay before it actually shows the updated.
  //This seems to be due to a slow refiltering process, possibly an ajax request.
  //If filtering too fast, may need to slow it down with a setTimeout()
  handleFilterOptionClick(value) {
    const { dispatchUpdateFilter } = this.props;

    dispatchUpdateFilter(value, 'CANCEL');
  }

  handleCancelOptionClick() {
    const { dispatchUpdateFilter } = this.props;

    dispatchUpdateFilter('CANCEL_NUMERICAL_FILTERS');
  }

  render() {
    const { filter } = this.props;
    const potentialFilterOptions = [];

    for (let i = 1; i <= 5; i++) {
      const stringI = i.toString();
      if (filter[stringI]) {
        potentialFilterOptions.push(stringI);
      }
    }

    const filterOptions = [];

    if (potentialFilterOptions.length) {
      potentialFilterOptions.forEach((filterOption) => {
        filterOptions.push(
          <div
            style={{
              display: 'flex',
              backgroundColor: '#005891',
              padding: '0 0 12px 13px',
              height: '20px',
              width: filterOption === '1' ? '59px' : '66px',
              margin: '0 4px 0 0',
              cursor: 'pointer',
            }}
            onClick={this.handleFilterOptionClick.bind(this, filterOption)}
          >
            <div
              style={{
                fontSize: '13px',
                fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
                color: 'white',
                margin: '8px 2px 0 0',
              }}
            >{`${filterOption} star${filterOption === '1' ? '' : 's'}`}</div>
            <div style={{ display: 'flex', position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0px',
                  color: 'white',
                  fontSize: '23px',
                  margin: '1px 0 0 0',
                }}
              >&#9679;</div>
              <div
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0px',
                  color: 'rgb(0, 88, 145)',
                  fontSize: '10px',
                  margin: '8px 0 0 0',
                  padding: '1px 0 0 4px',
                  fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
                }}
              >x</div>
            </div>
          </div>,
        );
      });

      filterOptions.push(
        <div
          id='clear-all-number-filters'
          style={{
            display: 'flex',
            backgroundColor: '#ededed',
            padding: '0 0 12px 13px',
            height: '20px',
            width: '76px',
            cursor: 'pointer',
          }}
          onClick={this.handleCancelOptionClick.bind(this)}
        >
          <div
            style={{
              fontSize: '13px',
              fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
              color: '#333',
              margin: '8px 2px 0 0',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,.2)',
              cursor: 'default',
            }}
          >Clear All</div>
          <div style={{ display: 'flex', position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                top: '0',
                left: '0px',
                color: '#333',
                fontSize: '23px',
                margin: '1px 0 0 0',
              }}
            >&#9679;</div>
            <div
              style={{
                position: 'absolute',
                top: '0',
                left: '0px',
                color: 'white',
                fontSize: '10px',
                margin: '8px 0 0 0',
                padding: '1px 0 0 4px',
                fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
              }}
            >x</div>
          </div>
        </div>,
      );
    } else {
      return <div />;
    }

    return (
      <div
        id='active-filters-bar'
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#f7f7f7',
          padding: '13px 0 12px 10px',
          margin: '0 0 0 10px',
          width: '1065px',
        }}
      >
        <div
          style={{
            display: 'flex',
            float: 'left',
            margin: '0 auto 11px 1px',
            color: 'rgb(51, 51, 51)',
            fontSize: '14px',
            fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
          }}
        >Active Filters</div>
        <div
          style={{
            display: 'flex',
            float: 'left',
          }}
        >
          {filterOptions}
        </div>
      </div>
    );
  }
}

const mapState = function(state) {
  const { filter } = state;
  return {
    filter,
  };
};

const mapDispatch = function(dispatch) {
  return {
    dispatchUpdateFilter: (value, option) => { dispatch(updateFilter(value, option)); },
  };
};

const wrappedActiveFilters = connect(mapState, mapDispatch)(ActiveFilters);

export default wrappedActiveFilters;
