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
          <div onClick={this.handleFilterOptionClick.bind(this, filterOption)} style={{ display: 'flex' }}>
            <div>{`${filterOption} star${filterOption === '1' ? '' : 's'}`}</div>
            <div style={{ display: 'flex', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '0', bottom: '0' }}>&#9679;</div>
              <div style={{
                position: 'absolute',
                top: '0',
                bottom: '0',
                color: 'white',
              }}>x</div>
            </div>
          </div>,
        );
      });

      filterOptions.push(
        <div onClick={this.handleCancelOptionClick.bind(this)} style={{ display: 'flex' }}>
          <div>Cancel</div>
          <div style={{ display: 'flex', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '0', bottom: '0' }}>&#9679;</div>
            <div style={{
              position: 'absolute',
              top: '0',
              bottom: '0',
              color: 'white',
            }}>x</div>
          </div>
        </div>,
      );
    } else {
      return <div />;
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#f7f7f7' }}>
        <div>Active Filters</div>
        <div style={{ display: 'flex' }}>
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
