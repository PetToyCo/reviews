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
  test('has black stars with a length that is ~38px when reviewAverage is 3.5px', () => {
    const wrapper = mount(<Provider store={store}><DynamicReviewStars /></Provider>);

    store.dispatch(updateReviewAverage(reviewAverage));
    const renderedComponent = wrapper.render();

    const filledStarsComponent = renderedComponent.find('.filled-stars');
    const filledStarsStyles = filledStarsComponent.get(0).attribs.style;

    expect(filledStarsStyles).toContain('width: 38');
  });
});
