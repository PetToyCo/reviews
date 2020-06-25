import updateFilteredReviews from '../../ReduxSpecificComponents/Actions/updateFilteredReviews.js';

const { connect } = ReactRedux;

class CalculateFilteredReviews extends React.Component {
  generateBasedOnMostRecent(allowedScores, allReviews) {
    if (allowedScores.length === 5) {
      return allReviews;
    }

    const filteredReviews = [];

    allReviews.forEach((review) => {
      if (allowedScores.indexOf(review.score) > -1) {
        filteredReviews.push(review)
      }
    });

    return filteredReviews;
  }

  generateBasedOnMostHelpful(allowedScores, allReviews) {
    const indexTracker = {
      '0': 0,
    };
    const beginningIndexTracker = {
      '0': 0,
    };
    const filteredReviews = [];
    const allYesesTracked = [0];

    allReviews.forEach((review) => {
      const { score } = review;

      if (allowedScores.indexOf(score) > - 1) {
        const { yeses } = review;
        let allYesesTrackedIndex;

        if (indexTracker[yeses]) {
          filteredReviews.splice(indexTracker[yeses], 0, review);
          indexTracker[yeses]++;

          allYesesTrackedIndex = allYesesTracked.indexOf(yeses);
        } else {
          for (let i = 0; i <= allYesesTracked.length; i++) {
            if (allYesesTracked[i]) {
              if (yeses < allYesesTracked[i]) {
                allYesesTrackedIndex = i;
                break;
              }
            } else {
              allYesesTrackedIndex = i;
            }
          }

          allYesesTracked.splice(allYesesTrackedIndex, 0, yeses);
          var scoreOneLevelLower = allYesesTracked[allYesesTrackedIndex - 1];


          const addIndex = beginningIndexTracker[scoreOneLevelLower];
          filteredReviews.splice(addIndex, 0, review);
          beginningIndexTracker[yeses] = addIndex;
          indexTracker[yeses] = addIndex + 1;
        }

        for (let j = allYesesTrackedIndex - 1; j >= 0; j--) {
          beginningIndexTracker[allYesesTracked[j]]++;
          indexTracker[allYesesTracked[j]]++;
        }
      }
    });

    return filteredReviews;
  }

  render() {
    const { filter, allReviews, dispatchUpdateFilteredReviews } = this.props;

    let allowedScores = [];

    for (let i = 1; i <= 5; i++) {
      if (filter[i]) {
        allowedScores.push(i);
      }
    }

    if (allowedScores.length === 0) {
      allowedScores = [1, 2, 3, 4, 5];
    }

    let filteredReviews;

    if (filter.MostRecent) {
      filteredReviews = this.generateBasedOnMostRecent(allowedScores, allReviews);
    }

    if (filter.MostHelpful) {
      filteredReviews = this.generateBasedOnMostHelpful(allowedScores, allReviews);
    }

    if (filter.HighToLow) {
      filteredReviews = this.generateBasedOnHighToLow(allowedScores, allReviews);
    }

    if (filter.LowToHigh) {
      filteredReviews = this.generateBasedOnLowToHigh(allowedScores, allReviews);
    }

    dispatchUpdateFilteredReviews(filteredReviews);
  }
}

const mapState = function(state) {
  const { filter, allReviews } = state;

  return {
    filter,
    allReviews,
  };
}

const mapDispatch = function(dispatch) {
  return {
    dispatchUpdateFilteredReviews: function(filteredReviews) { dispatch(updateFilteredReviews(filteredReviews)); },
  };
}

const wrappedCalculateFilteredReviews = connect(mapState, mapDispatch)(CalculateFilteredReviews);

export default wrappedCalculateFilteredReviews;