import updateFilteredReviews from '../../ReduxSpecificComponents/Actions/updateFilteredReviews.js';
import updateReviewRange from '../../ReduxSpecificComponents/Actions/updateReviewRange.js';

const { connect } = ReactRedux;

class CalculateFilteredReviews extends React.Component {
  generateBasedOnMostRecent(allowedScores, allReviews) {
    if (allowedScores.length === 5) {
      return allReviews;
    }

    const filteredReviews = [];

    allReviews.forEach((review) => {
      if (allowedScores.indexOf(review.score) > -1) {
        filteredReviews.push(review);
      }
    });

    return filteredReviews;
  }

  //PetCo defines most helpful in 5 subcategories:
  //1. All yeses and zero noes
  //2. More yeses than noes, noes cannot be zero
  //3. equal yeses and noes
  //4. More noes than yeses, yeses cannot be zero
  //5. All noes and no yeses
  //That is how it generates the list of Most Helpful reviews it displays.
  //First it lists all the subcategory 1 reviews, then subcateogry two, etc.
  //For each subcategory, they are further sorted by two major things:
  //A. The quality of the review in comparison to others within that subcategory. For instance, for
  //subcategory 1.,t the more yeses you have, the earlier in the list you appear
  //B. For ties based on criteria A, chronological order from newest to oldest.
  //To understand this algoritm, look below for a similar algorithm that is being "Saved for posterity",
  //uncomment it and then read the comments that remain. This algorithm is just a slighlty more advanced
  //version of the older one.
  generateBasedOnMostHelpful(allowedScores, allReviews) {
    const indexTracker = {
      'onlyYs1': [],
      'moreYsThanNs1': [],
      'equalYsAndNs0': [],
      'moreNsThanYs-1': [],
      'onlyNs-1': [],
    };

    let filteredReviews = [];
    const onlyYsTracked = [1];
    const moreYsThanNsTracked = [1];
    const equalYsAndNsTracked = [0];
    const moreNsThanYsTracked = [-1];
    const onlyNsTracked = [-1];

    const mappedPrefix = {
      '1': 'onlyYs',
      '2': 'moreYsThanNs',
      '3': 'equalYsAndNs',
      '4': 'moreNsThanYs',
      '5': 'onlyNs',
    };

    const mappedTrackedArray = {
      '1': onlyYsTracked,
      '2': moreYsThanNsTracked,
      '3': equalYsAndNsTracked,
      '4': moreNsThanYsTracked,
      '5': onlyNsTracked,
    };

    allReviews.forEach((review) => {
      const { score } = review;

      if (allowedScores.indexOf(score) > -1) {
        const { yeses, noes } = review;
        let option;
        let yesesValue;

        if (noes === 0 && yeses > 0) {
          option = '1';
          yesesValue = yeses;
        } else if (yeses > 0 && noes > 0 && yeses > noes) {
          option = '2';
          yesesValue = yeses - noes;
        } else if (yeses === noes) {
          option = '3';
          yesesValue = 0;
        } else if (yeses > 0 && noes > 0 && yeses < noes) {
          option = '4';
          yesesValue = yeses - noes;
        } else {
          option = '5';
          yesesValue = 0 - noes;
        }

        const indexTrackerKey = `${mappedPrefix[option]}${yesesValue}`;

        if (indexTracker[indexTrackerKey]) {
          indexTracker[indexTrackerKey].push(review);
        } else {
          const specificTrackedArray = mappedTrackedArray[option];
          let indexTrackedArray;
          for (let i = 0; i <= specificTrackedArray.length; i++) {
            if (specificTrackedArray[i]) {
              if (yesesValue < specificTrackedArray[i]) {
                indexTrackedArray = i;
                break;
              }
            } else {
              indexTrackedArray = i;
            }
          }

          specificTrackedArray.splice(indexTrackedArray, 0, yesesValue);

          indexTracker[indexTrackerKey] = [review];
        }
      }
    });

    for (let j = 1; j <= 5; j++) {
      const specificTrackedArray = mappedTrackedArray[j];
      for (let i = specificTrackedArray.length - 1; i >= 0; i--) {
        const indexTrackerKey = `${mappedPrefix[j]}${specificTrackedArray[i]}`;
        filteredReviews = filteredReviews.concat(indexTracker[indexTrackerKey]);
      }
    }

    return filteredReviews;
  }

  ////////////////////////////////////////
  //////Saved for posterity
  ////////////////////////////////////////
  // //The following code assumes the only criteria for sorting, besides permissable scores, is the
  // //number of yeses a review has. But how do you sort based on such a nebulous concept? One that
  // //can have values ranging from 0 to infinity, without you knowing the values, and without you
  // //knowing how many values, and without you knowing the order the values are in?
  // //Answer to that is this algortihm.
  // generateBasedOnMostHelpful(allowedScores, allReviews) {
  //   //indexTracker is going to store an array of review objects. The key is the number of yeses the
  //   //review received. Since the source array, allReviews, is already ordered in chronological order,
  //   //and since the review object will be pushed into their arrays, each array is in chronological order
  //   const indexTracker = {
  //     '0': [],
  //   };

  //   let filteredReviews = [];
  //   //You have to keep track of the "yeses" values present AND in numericla order from least to greatest,
  //   //so all the arrays in indexTracker can be concatted to filteredReviews, at the end, just before
  //   //filteredReviews is returned
  //   const allYesesTracked = [0];

  //   allReviews.forEach((review) => {
  //     const { score } = review;
  //     //if the review object has a score that the user wants to see (or if the user hasn't filtered by score yet)
  //     if (allowedScores.indexOf(score) > -1) {
  //       //then perform all the steps need to properly sort hat review object into its correct spot
  //       const { yeses } = review;
  //       //if indexTracker contains an array for the number of yeses the review object has
  //       if (indexTracker[yeses]) {
  //         //push review object into that corresponding array. in indexTracker
  //         indexTracker[yeses].push(review);
  //       } else {
  //         //else
  //         let allYesesTrackedIndex;
  //         //This for loop designed to keep allYesesTracked in numerical order from least number of yeses to greatest
  //         for (let i = 0; i <= allYesesTracked.length; i++) {
  //           if (allYesesTracked[i]) {
  //             if (yeses < allYesesTracked[i]) {
  //               allYesesTrackedIndex = i;
  //               break;
  //             }
  //           } else {
  //             allYesesTrackedIndex = i;
  //           }
  //         }
  //         //add new yeses value to allYesesTracked
  //         allYesesTracked.splice(allYesesTrackedIndex, 0, yeses);
  //         //create an array in indexTracker at the new yeses value key position AND have that array contain
  //         //the current review object
  //         indexTracker[yeses]= [review];
  //       }
  //     }
  //   });
  //   //Once all review objects have been sorted, concat each array in indexTracker to the final filteredReviews
  //   //array. The concatanation has to be performed in order of highest number of yeses to lowest.
  //   for (let i = allYesesTracked.length - 1; i >= 0; i--) {
  //     filteredReviews = filteredReviews.concat(indexTracker[allYesesTracked[i]]);
  //   }
  //   return filteredReviews;
  // }

  generateBasedOnScore(allowedScores, allReviews, option) {
    let filteredReviews = [];
    const indexTracker = {
      '5': [],
      '4': [],
      '3': [],
      '2': [],
      '1': [],
    };

    allReviews.forEach((review) => {
      const { score } = review;

      if (allowedScores.indexOf(score) > -1) {
        indexTracker[score].push(review);
      }
    });

    if (option === 'HighToLow') {
      for (let i = 5; i >= 1; i--) {
        filteredReviews = filteredReviews.concat(indexTracker[i]);
      }
    }

    if (option === 'LowToHigh') {
      for (let i = 1; i <= 5; i++) {
        filteredReviews = filteredReviews.concat(indexTracker[i]);
      }
    }

    return filteredReviews;
  }

  render() {
    const {
      filter,
      allReviews,
      dispatchUpdateFilteredReviews,
      dispatchUpdateReviewRange,
    } = this.props;

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
      filteredReviews = this.generateBasedOnScore(allowedScores, allReviews, 'HighToLow');
    }

    if (filter.LowToHigh) {
      filteredReviews = this.generateBasedOnScore(allowedScores, allReviews, 'LowToHigh');
    }

    if (filteredReviews.length === 0) {
      dispatchUpdateReviewRange('RESET', [0, -1]);
    } else if (filteredReviews.length < 8) {
      dispatchUpdateReviewRange('RESET', [0, filteredReviews.length - 1]);
    } else {
      dispatchUpdateReviewRange('RESET', [0, 7]);
    }

    dispatchUpdateFilteredReviews(filteredReviews);

    return null;
  }
}

const mapState = function(state) {
  const { filter, allReviews } = state;

  return {
    filter,
    allReviews,
  };
};

const mapDispatch = function(dispatch) {
  return {
    dispatchUpdateFilteredReviews: (filteredReviews) => { dispatch(updateFilteredReviews(filteredReviews)); },
    dispatchUpdateReviewRange: (option, value) => { dispatch(updateReviewRange(option, value)); },
  };
};

const wrappedCalculateFilteredReviews = connect(mapState, mapDispatch)(CalculateFilteredReviews);

export default wrappedCalculateFilteredReviews;
