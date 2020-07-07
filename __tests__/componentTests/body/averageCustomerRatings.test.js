import React from 'react';
import { mount } from 'enzyme';
import generalData from '../../setup/generalData.js';
import storeStartingState from '../../setup/storeStartingState.js';
import store from '../../../client/src/ReduxSpecificComponents/store.js';
import AverageCustomerRatings from '../../../client/src/Components/ReviewBody/averageCustomerRatings.jsx';
import updateReviewAverage from '../../../client/src/ReduxSpecificComponents/Actions/updateReviewAverage.js';
import updateNumberOfReviews from '../../../client/src/ReduxSpecificComponents/Actions/updateNumberOfReviews.js';
import updateAllReviews from '../../../client/src/ReduxSpecificComponents/Actions/updateAllReviews.js';

const { Provider } = ReactRedux;

const { numberOfReviews, reviewAverage, allReviews } = generalData;

beforeEach(() => {
  const {
    numberOfReviews,
    reviewAverage,
    allReviews,
  } = storeStartingState;

  store.dispatch(updateReviewAverage(reviewAverage));
  store.dispatch(updateNumberOfReviews(numberOfReviews));
  store.dispatch(updateAllReviews(allReviews));
});

describe('The ReviewBody component', () => {
  describe('has a AverageCustomerRatings component', () => {
    it('that correctly renders summary data for the reviews of item 100', () => {
      const wrapper = mount(<Provider store={store}><AverageCustomerRatings /></Provider>, { attachTo: document.body });

      store.dispatch(updateReviewAverage(reviewAverage));
      store.dispatch(updateNumberOfReviews(numberOfReviews));
      store.dispatch(updateAllReviews(allReviews));
      wrapper.update();

      const renderedComponent = wrapper.render();
      const targetComponent1 = renderedComponent.find('#average-customer-ratings-review-average');
      const text1 = targetComponent1.text();
      const targetComponent2 = renderedComponent.find('.filled-stars');
      const style2 = targetComponent2.get(0).attribs.style;

      expect(text1).toEqual('3.5');
      expect(style2).toContain('width: 45');

      wrapper.unmount();
    });
  });
});
