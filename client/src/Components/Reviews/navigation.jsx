import updateReviewRange from '../../ReduxSpecificComponents/Actions/updateReviewRange.js';

const { connect } = ReactRedux;

class Navigation extends React.Component {
  // constructor(props) {
  //   super();
  // }

  handleBackButtonClick(numberOfReviews) {
    const { dispatchUpdateReviewRange } = this.props;

    dispatchUpdateReviewRange('BACK', null, numberOfReviews);
    document.getElementById('review-link').scrollIntoView({ behavior: 'smooth' });
  }

  handleForwardButtonClick(numberOfReviews) {
    const { dispatchUpdateReviewRange } = this.props;

    dispatchUpdateReviewRange('FORWARD', null, numberOfReviews);
    document.getElementById('review-link').scrollIntoView({ behavior: 'smooth' });
  }

  handleMouseOverNavButton(id) {
    const target = document.getElementById(id);

    target.style.boxShadow = 'inset 0 0 5px 0 rgba(0, 0, 0, 0.2)';
  }

  handleMouseOutNavButton(id) {
    const target = document.getElementById(id);

    target.style.boxShadow = null;
  }

  render() {
    const { reviewRange, filteredReviews } = this.props;

    if (filteredReviews.length <= 8) {
      return null;
    }

    const navButtons = [];

    if (reviewRange[0]) {
      navButtons.push(
        <div
          id='back-nav-button'
          style={{
            float: 'right',
            backgroundColor: 'rgb(237, 237, 237)',
            color: 'black',
            fontSize: '14px',
            fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
            width: '28px',
            height: '23px',
            margin: '5px 2px 0 0',
            padding: '7px 0 0 10px',
          }}
          onClick={this.handleBackButtonClick.bind(this, filteredReviews.length)}
          onMouseOver={this.handleMouseOverNavButton.bind(this, 'back-nav-button')}
          onMouseOut={this.handleMouseOutNavButton.bind(this, 'back-nav-button')}
        >◄</div>,
      );
    } else {
      navButtons.push(
        <div
          style={{
            float: 'right',
            backgroundColor: 'rgb(242, 242, 242)',
            color: 'rgb(110, 110, 110)',
            fontSize: '14px',
            fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
            width: '29px',
            height: '23px',
            margin: '5px 2px 0 0',
            padding: '7px 0 0 9px',
          }}
        >◄</div>,
      );
    }

    if (reviewRange[1] < filteredReviews.length - 1) {
      navButtons.push(
        <div
          id='forward-nav-button'
          style={{
            float: 'right',
            backgroundColor: 'rgb(237, 237, 237)',
            color: 'black',
            fontSize: '14px',
            fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
            width: '25px',
            height: '23px',
            margin: '5px 2px 0 0',
            padding: '7px 0 0 13px',
          }}
          onClick={this.handleForwardButtonClick.bind(this, filteredReviews.length)}
          onMouseOver={this.handleMouseOverNavButton.bind(this, 'forward-nav-button')}
          onMouseOut={this.handleMouseOutNavButton.bind(this, 'forward-nav-button')}
          >►</div>,
      );
    } else {
      navButtons.push(
        <div
          style={{
            float: 'right',
            backgroundColor: 'rgb(242, 242, 242)',
            color: 'rgb(110, 110, 110)',
            fontSize: '14px',
            fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
            width: '24px',
            height: '23px',
            margin: '5px 2px 0 0',
            padding: '7px 0 0 14px',
          }}
        >►</div>,
      );
    }

    return (
      <div
        style={{
          display: 'flex',
          margin: '8px 0 0 10px',
          width: '1067px',
          backgroundColor: 'rgb(247, 247, 247)',
          padding: '0 8px 0 0',
        }}
      >
        <div
          style={{
            fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
            fontSize: '14px',
            color: 'rgb(51, 51, 51)',
            margin: '15px auto 13px 9px',
          }}
        >{`${reviewRange[0] + 1}-${reviewRange[1] + 1} of ${filteredReviews.length} Reviews`}</div>
        {navButtons}
      </div>
    );
  }
}

const mapState = function(state) {
  const { reviewRange, filteredReviews } = state;

  return {
    reviewRange,
    filteredReviews,
  };
};

const mapDispatch = function(dispatch) {
  return {
    dispatchUpdateReviewRange: (option, value, numberOfReviews) => { dispatch(updateReviewRange(option, value, numberOfReviews)); },
  };
};

const wrappedNavigation = connect(mapState, mapDispatch)(Navigation);

export default wrappedNavigation;
