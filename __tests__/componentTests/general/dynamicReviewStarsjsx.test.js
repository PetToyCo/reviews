import React from 'react';
import { mount } from 'enzyme';
import generalData from '../../setup/generalData.js';
import storeStartingState from '../../setup/storeStartingState.js';
import store from '../../../client/src/ReduxSpecificComponents/store.js';
import DynamicReviewStars from '../../../client/src/Components/General/dynamicReviewStars.jsx';
import updateReviewAverage from '../../../client/src/ReduxSpecificComponents/Actions/updateReviewAverage.js';

const { Provider } = ReactRedux;

const { reviewAverage } = generalData;

beforeEach(() => {
  const { reviewAverage } = storeStartingState;
  store.dispatch(updateReviewAverage(reviewAverage));
});

describe('The DynamicReviewStars component', () => {
  test('has black stars with a length that is 3.5/5 that of the white stars\' length when the reviewAverage is 3.5', (done) => {
    const wrapper = mount(<Provider store={store}><DynamicReviewStars /></Provider>);

    store.dispatch(updateReviewAverage(reviewAverage));

    setTimeout(() => {
      const renderedComponent = wrapper.render();

      const emptyStarsComponent = renderedComponent.find('.empty-stars');
      const filledStarsComponent = renderedComponent.find('.filled-stars');

      const emptyStarsStyles = emptyStarsComponent.get(0).attribs.style;
      const filledStarsStyles = filledStarsComponent.get(0).attribs.style;

      const emptyStarsStylesSplit = emptyStarsStyles.split(';');
      const filledStarsStylesSplit = filledStarsStyles.split(';');

      let emptyStarsLength;
      let filledStarsLength;

      for (let i = 0; i < emptyStarsStylesSplit.length; i++) {
        if (emptyStarsStylesSplit[i].includes('width:')) {
          const splitStyle = emptyStarsStylesSplit[i].split(' ');
          const numberString = splitStyle[2].substring(0, splitStyle[1].length - 2);
          emptyStarsLength = Number.parseInt(numberString, 10);
        }
      }

      for (let i = 0; i < filledStarsStylesSplit.length; i++) {
        if (filledStarsStylesSplit[i].includes('width:')) {
          const splitStyle = filledStarsStylesSplit[i].split(' ');
          const numberString = splitStyle[2].substring(0, splitStyle[1].length - 2);
          filledStarsLength = Number.parseInt(numberString, 10);
        }
      }

      expect(filledStarsLength / 3.5 * 5).toBe(emptyStarsLength);

      done();
    }, 50);
  });
});
