import React from 'react';
import { mount } from 'enzyme';
import generalData from '../../setup/generalData.js';
import storeStartingState from '../../setup/storeStartingState.js';
import store from '../../../client/src/ReduxSpecificComponents/store.js';
import ReviewsModule from '../../../client/src/service.jsx';
import updateReviewAverage from '../../../client/src/ReduxSpecificComponents/Actions/updateReviewAverage.js';
import updateNumberOfReviews from '../../../client/src/ReduxSpecificComponents/Actions/updateNumberOfReviews.js';
import updateAllReviews from '../../../client/src/ReduxSpecificComponents/Actions/updateAllReviews.js';
import updateShowNonNumberFilterSetting from '../../../client/src/ReduxSpecificComponents/Actions/updateShowNonNumberFilterSetting.js';
import updateExitedNonNumberFilterDropDownSource from '../../../client/src/ReduxSpecificComponents/Actions/updateExitedNonNumberFilterDropDownSource.js';
import updateEnteredNonNumberFilterSetting from '../../../client/src/ReduxSpecificComponents/Actions/updateEnteredNonNumberFilterSetting.js';
import updateFilter from '../../../client/src/ReduxSpecificComponents/Actions/updateFilter.js';
import updateShowRatingFilter from '../../../client/src/ReduxSpecificComponents/Actions/updateShowRatingFilter.js';
import updateShowRatingFilterDropDown from '../../../client/src/ReduxSpecificComponents/Actions/updateShowRatingFilterDropDown.js';
import updateExitedRatingFilter from '../../../client/src/ReduxSpecificComponents/Actions/updateExitedRatingFilter.js';
import updateEnteredRatingFilterDropDown from '../../../client/src/ReduxSpecificComponents/Actions/updateEnteredRatingFilterDropDown.js';

const { Provider } = ReactRedux;

const { numberOfReviews, reviewAverage, allReviews } = generalData;
allReviews[0].disabled = false;

beforeEach(() => {
  const {
    numberOfReviews,
    reviewAverage,
    allReviews,
    showNonNumberFilterSetting,
    exitedNonNumberFilterDropDownSource,
    enteredNonNumberFilterSetting,
    showRatingFilter,
    showRatingFilterDropDown,
    exitedRatingFilter,
    enteredRatingFilterDropDown,
  } = storeStartingState;

  store.dispatch(updateReviewAverage(reviewAverage));
  store.dispatch(updateNumberOfReviews(numberOfReviews));
  store.dispatch(updateAllReviews(allReviews));
  store.dispatch(updateShowNonNumberFilterSetting(showNonNumberFilterSetting));
  store.dispatch(updateExitedNonNumberFilterDropDownSource(exitedNonNumberFilterDropDownSource));
  store.dispatch(updateEnteredNonNumberFilterSetting(enteredNonNumberFilterSetting));
  store.dispatch(updateFilter('CANCEL_NUMERICAL_FILTERS'));
  store.dispatch(updateFilter('MostRecent'));
  store.dispatch(updateShowRatingFilter(showRatingFilter));
  store.dispatch(updateShowRatingFilterDropDown(showRatingFilterDropDown));
  store.dispatch(updateExitedRatingFilter(exitedRatingFilter));
  store.dispatch(updateEnteredRatingFilterDropDown(enteredRatingFilterDropDown));
});

describe('The ReviewBody component', () => {
  describe('has a FullReviewModal component that', () => {
    it('appears when the most favorable helpful review link is clicked in the HighlightedReviews component', () => {
      const wrapper = mount(<Provider store={store}><ReviewsModule /></Provider>, { attachTo: document.body });

      store.dispatch(updateReviewAverage(reviewAverage));
      store.dispatch(updateNumberOfReviews(numberOfReviews));
      store.dispatch(updateAllReviews(allReviews));
      wrapper.update();

      let renderedComponent = wrapper.render();
      let targetComponent = renderedComponent.find('#full-review-modal');

      expect(targetComponent).toHaveLength(0);

      wrapper.update();
      wrapper.find('#anchor-tag-most-favorable').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent = renderedComponent.find('#full-review-modal');

      expect(targetComponent).toHaveLength(1);

      wrapper.unmount();
    });

    it('appears when the most critical helpful review link is clicked in the HighlightedReviews component', () => {
      const wrapper = mount(<Provider store={store}><ReviewsModule /></Provider>, { attachTo: document.body });

      store.dispatch(updateReviewAverage(reviewAverage));
      store.dispatch(updateNumberOfReviews(numberOfReviews));
      store.dispatch(updateAllReviews(allReviews));
      wrapper.update();

      let renderedComponent = wrapper.render();
      let targetComponent = renderedComponent.find('#full-review-modal');

      expect(targetComponent).toHaveLength(0);

      wrapper.update();
      wrapper.find('#anchor-tag-most-critical').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent = renderedComponent.find('#full-review-modal');

      expect(targetComponent).toHaveLength(1);

      wrapper.unmount();
    });

    it('has the correct review object\'s info when the most favorable helpful review link is clicked in the HighlightedReviews component', () => {
      const wrapper = mount(<Provider store={store}><ReviewsModule /></Provider>, { attachTo: document.body });

      store.dispatch(updateReviewAverage(reviewAverage));
      store.dispatch(updateNumberOfReviews(numberOfReviews));
      store.dispatch(updateAllReviews(allReviews));
      wrapper.update();
      wrapper.find('#anchor-tag-most-favorable').simulate('click');
      wrapper.update();

      const renderedComponent = wrapper.render();
      const targetComponent = renderedComponent.find('#full-review-modal');
      const text = targetComponent.text();

      expect(text).toContain('CatButt');

      wrapper.unmount();
    });

    it('has the correct review object\'s info when the most critical helpful review link is clicked in the HighlightedReviews component', () => {
      const wrapper = mount(<Provider store={store}><ReviewsModule /></Provider>, { attachTo: document.body });

      store.dispatch(updateReviewAverage(reviewAverage));
      store.dispatch(updateNumberOfReviews(numberOfReviews));
      store.dispatch(updateAllReviews(allReviews));
      wrapper.update();
      wrapper.find('#anchor-tag-most-critical').simulate('click');
      wrapper.update();

      const renderedComponent = wrapper.render();
      const targetComponent = renderedComponent.find('#full-review-modal');
      const text = targetComponent.text();

      expect(text).toContain('Sarah');

      wrapper.unmount();
    });
  });
});
