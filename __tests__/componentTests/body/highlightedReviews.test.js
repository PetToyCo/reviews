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
import updateFilteredReviews from '../../../client/src/ReduxSpecificComponents/Actions/updateFilteredReviews.js';

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
  describe('has a HighlightedReviews component that', () => {
    it('has links that change color on mouseover, mouseout, and click', () => {
      const wrapper = mount(<Provider store={store}><ReviewsModule /></Provider>, { attachTo: document.body });

      store.dispatch(updateReviewAverage(reviewAverage));
      store.dispatch(updateNumberOfReviews(numberOfReviews));
      store.dispatch(updateAllReviews(allReviews));
      wrapper.update();

      let renderedComponent = wrapper.render();
      let targetComponent1 = renderedComponent.find('#multi-filter-4-5');
      let style1 = targetComponent1.get(0).attribs.style;
      let targetComponent2 = renderedComponent.find('#multi-filter-1-2-3');
      let style2 = targetComponent2.get(0).attribs.style;
      let targetComponent3 = renderedComponent.find('#anchor-tag-most-favorable');
      let style3 = targetComponent3.get(0).attribs.style;
      let targetComponent4 = renderedComponent.find('#anchor-tag-most-critical');
      let style4 = targetComponent4.get(0).attribs.style;

      expect(style1).toContain('color: rgb(0, 88, 145);');
      expect(style2).toContain('color: rgb(0, 88, 145);');
      expect(style3).toContain('color: rgb(0, 88, 145);');
      expect(style4).toContain('color: rgb(0, 88, 145);');

      wrapper.update();
      wrapper.find('#multi-filter-4-5').simulate('mouseover');
      wrapper.find('#multi-filter-1-2-3').simulate('mouseover');
      wrapper.find('#anchor-tag-most-favorable').simulate('mouseover');
      wrapper.find('#anchor-tag-most-critical').simulate('mouseover');
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent1 = renderedComponent.find('#multi-filter-4-5');
      style1 = targetComponent1.get(0).attribs.style;
      targetComponent2 = renderedComponent.find('#multi-filter-1-2-3');
      style2 = targetComponent2.get(0).attribs.style;
      targetComponent3 = renderedComponent.find('#anchor-tag-most-favorable');
      style3 = targetComponent3.get(0).attribs.style;
      targetComponent4 = renderedComponent.find('#anchor-tag-most-critical');
      style4 = targetComponent4.get(0).attribs.style;

      expect(style1).toContain('color: rgb(0, 156, 217);');
      expect(style2).toContain('color: rgb(0, 156, 217);');
      expect(style3).toContain('color: rgb(0, 156, 217);');
      expect(style4).toContain('color: rgb(0, 156, 217);');

      wrapper.update();
      wrapper.find('#multi-filter-4-5').simulate('mouseout');
      wrapper.find('#multi-filter-1-2-3').simulate('mouseout');
      wrapper.find('#anchor-tag-most-favorable').simulate('mouseout');
      wrapper.find('#anchor-tag-most-critical').simulate('mouseout');
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent1 = renderedComponent.find('#multi-filter-4-5');
      style1 = targetComponent1.get(0).attribs.style;
      targetComponent2 = renderedComponent.find('#multi-filter-1-2-3');
      style2 = targetComponent2.get(0).attribs.style;
      targetComponent3 = renderedComponent.find('#anchor-tag-most-favorable');
      style3 = targetComponent3.get(0).attribs.style;
      targetComponent4 = renderedComponent.find('#anchor-tag-most-critical');
      style4 = targetComponent4.get(0).attribs.style;

      expect(style1).toContain('color: rgb(0, 88, 145);');
      expect(style2).toContain('color: rgb(0, 88, 145);');
      expect(style3).toContain('color: rgb(0, 88, 145);');
      expect(style4).toContain('color: rgb(0, 88, 145);');

      wrapper.update();
      wrapper.find('#multi-filter-4-5').simulate('click');
      wrapper.update();
      wrapper.find('#clear-all-number-filters').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent1 = renderedComponent.find('#multi-filter-4-5');
      style1 = targetComponent1.get(0).attribs.style;

      expect(style1).toContain('color: rgb(0, 88, 145);');

      wrapper.update();
      wrapper.find('#multi-filter-4-5').simulate('mouseover');
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent1 = renderedComponent.find('#multi-filter-4-5');
      style1 = targetComponent1.get(0).attribs.style;

      expect(style1).toContain('color: rgb(0, 156, 217);');

      wrapper.update();
      wrapper.find('#multi-filter-4-5').simulate('mouseout');
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent1 = renderedComponent.find('#multi-filter-4-5');
      style1 = targetComponent1.get(0).attribs.style;

      expect(style1).toContain('color: rgb(0, 88, 145);');

      wrapper.update();
      wrapper.find('#multi-filter-1-2-3').simulate('click');
      wrapper.update();
      wrapper.find('#clear-all-number-filters').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent1 = renderedComponent.find('#multi-filter-1-2-3');
      style1 = targetComponent1.get(0).attribs.style;

      expect(style1).toContain('color: rgb(0, 88, 145);');

      wrapper.update();
      wrapper.find('#multi-filter-1-2-3').simulate('mouseover');
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent1 = renderedComponent.find('#multi-filter-1-2-3');
      style1 = targetComponent1.get(0).attribs.style;

      expect(style1).toContain('color: rgb(0, 156, 217);');

      wrapper.update();
      wrapper.find('#multi-filter-1-2-3').simulate('mouseout');
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent1 = renderedComponent.find('#multi-filter-1-2-3');
      style1 = targetComponent1.get(0).attribs.style;

      expect(style1).toContain('color: rgb(0, 88, 145);');

      wrapper.update();
      wrapper.find('#anchor-tag-most-favorable').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent1 = renderedComponent.find('#anchor-tag-most-favorable');
      style1 = targetComponent1.get(0).attribs.style;

      expect(style1).toContain('color: rgb(0, 156, 217);');

      wrapper.update();
      wrapper.find('#anchor-tag-most-favorable').simulate('mouseover');
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent1 = renderedComponent.find('#anchor-tag-most-favorable');
      style1 = targetComponent1.get(0).attribs.style;

      expect(style1).toContain('color: rgb(0, 156, 217);');

      wrapper.update();
      wrapper.find('#anchor-tag-most-favorable').simulate('mouseout');
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent1 = renderedComponent.find('#anchor-tag-most-favorable');
      style1 = targetComponent1.get(0).attribs.style;

      expect(style1).toContain('color: rgb(0, 156, 217);');

      wrapper.update();
      wrapper.find('#anchor-tag-most-critical').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent1 = renderedComponent.find('#anchor-tag-most-critical');
      style1 = targetComponent1.get(0).attribs.style;

      expect(style1).toContain('color: rgb(0, 156, 217);');

      wrapper.update();
      wrapper.find('#anchor-tag-most-critical').simulate('mouseover');
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent1 = renderedComponent.find('#anchor-tag-most-critical');
      style1 = targetComponent1.get(0).attribs.style;

      expect(style1).toContain('color: rgb(0, 156, 217);');

      wrapper.update();
      wrapper.find('#anchor-tag-most-critical').simulate('mouseout');
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent1 = renderedComponent.find('#anchor-tag-most-critical');
      style1 = targetComponent1.get(0).attribs.style;

      expect(style1).toContain('color: rgb(0, 156, 217);');

      wrapper.unmount();
    });

    it('has a "See more 4 and 5 star reviews" button that filters out 1, 2, and 3 star reviews', () => {
      const wrapper = mount(<Provider store={store}><ReviewsModule /></Provider>, { attachTo: document.body });

      store.dispatch(updateReviewAverage(reviewAverage));
      store.dispatch(updateNumberOfReviews(numberOfReviews));
      store.dispatch(updateAllReviews(allReviews));
      wrapper.update();

      let renderedComponent = wrapper.render();
      let targetComponent1 = renderedComponent.find('#most-favorable-helpful');
      let targetComponent2 = renderedComponent.find('#most-critical-helpful');

      expect(targetComponent1).toHaveLength(1);
      expect(targetComponent2).toHaveLength(1);

      wrapper.update();
      wrapper.find('#multi-filter-4-5').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent1 = renderedComponent.find('#most-favorable-helpful');
      targetComponent2 = renderedComponent.find('#most-critical-helpful');

      expect(targetComponent1).toHaveLength(0);
      expect(targetComponent2).toHaveLength(0);

      let reviews = renderedComponent.find('#individual-reviews-container');
      let reviewsText = reviews.text();

      expect(reviewsText).toContain('ChonkyCat');
      expect(reviewsText).toContain('CatButt');
      expect(reviewsText).toContain('catdude');
      expect(reviewsText).toContain('NotACatLady');
      expect(reviewsText).toContain('TummyScratcher');
      expect(reviewsText).toContain('ElGatoSupreme');
      expect(reviewsText).toContain('Winifred');
      expect(reviewsText).toContain('CVCat');
      expect(reviewsText).toEqual(expect.not.stringContaining('Dani'));
      expect(reviewsText).toEqual(expect.not.stringContaining('Binx'));

      wrapper.update();
      wrapper.find('#forward-nav-button').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      reviews = renderedComponent.find('#individual-reviews-container');
      reviewsText = reviews.text();

      expect(reviewsText).toContain('PikaPika');
      expect(reviewsText).toContain('Bob');
      expect(reviewsText).toContain('Froggy');

      wrapper.unmount();
    });

    it('has a "See more 1, 2, and 3 star reviews" button that filters out 4 and 5 star reviews', () => {
      const wrapper = mount(<Provider store={store}><ReviewsModule /></Provider>, { attachTo: document.body });

      store.dispatch(updateReviewAverage(reviewAverage));
      store.dispatch(updateNumberOfReviews(numberOfReviews));
      store.dispatch(updateAllReviews(allReviews));
      wrapper.update();

      let renderedComponent = wrapper.render();
      let targetComponent1 = renderedComponent.find('#most-favorable-helpful');
      let targetComponent2 = renderedComponent.find('#most-critical-helpful');

      expect(targetComponent1).toHaveLength(1);
      expect(targetComponent2).toHaveLength(1);

      wrapper.update();
      wrapper.find('#multi-filter-1-2-3').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent1 = renderedComponent.find('#most-favorable-helpful');
      targetComponent2 = renderedComponent.find('#most-critical-helpful');

      expect(targetComponent1).toHaveLength(0);
      expect(targetComponent2).toHaveLength(0);

      const reviews = renderedComponent.find('#individual-reviews-container');
      const reviewsText = reviews.text();

      expect(reviewsText).toContain('Mary');
      expect(reviewsText).toContain('Allison');
      expect(reviewsText).toContain('Emily');
      expect(reviewsText).toContain('Max');
      expect(reviewsText).toContain('Sarah');
      expect(reviewsText).toContain('Billy');
      expect(reviewsText).toContain('Binx');
      expect(reviewsText).toContain('Dani');
      expect(reviewsText).toEqual(expect.not.stringContaining('ChonkyCat'));
      expect(reviewsText).toEqual(expect.not.stringContaining('TummyScratcher'));

      wrapper.unmount();
    });

    it('shows the correct Most Favorable and Most Critical reviews rendered', () => {
      const wrapper = mount(<Provider store={store}><ReviewsModule /></Provider>, { attachTo: document.body });

      store.dispatch(updateReviewAverage(reviewAverage));
      store.dispatch(updateNumberOfReviews(numberOfReviews));
      store.dispatch(updateAllReviews(allReviews));
      wrapper.update();

      const renderedComponent = wrapper.render();
      const targetComponent1 = renderedComponent.find('#most-favorable-helpful');
      const text1 = targetComponent1.text();
      const targetComponent2 = renderedComponent.find('#most-critical-helpful');
      const text2 = targetComponent2.text();

      expect(text1).toContain('CatButt');
      expect(text2).toContain('Sarah');

      wrapper.unmount();
    });

    it('should only disappear when there are not enough reviews or a filter by particular score has been selected', () => {
      const wrapper = mount(<Provider store={store}><ReviewsModule /></Provider>, { attachTo: document.body });

      store.dispatch(updateReviewAverage(reviewAverage));
      store.dispatch(updateNumberOfReviews(numberOfReviews));
      store.dispatch(updateAllReviews(allReviews));
      wrapper.update();

      let renderedComponent = wrapper.render();
      let targetComponent1 = renderedComponent.find('#most-favorable-helpful');
      let targetComponent2 = renderedComponent.find('#most-critical-helpful');

      expect(targetComponent1).toHaveLength(1);
      expect(targetComponent2).toHaveLength(1);

      wrapper.update();
      wrapper.find('#star-chart-row-5').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent1 = renderedComponent.find('#most-favorable-helpful');
      targetComponent2 = renderedComponent.find('#most-critical-helpful');

      expect(targetComponent1).toHaveLength(0);
      expect(targetComponent2).toHaveLength(0);

      wrapper.update();
      wrapper.find('#star-chart-row-1').simulate('click');
      wrapper.find('#star-chart-row-2').simulate('click');
      wrapper.find('#star-chart-row-3').simulate('click');
      wrapper.find('#star-chart-row-4').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent1 = renderedComponent.find('#most-favorable-helpful');
      targetComponent2 = renderedComponent.find('#most-critical-helpful');

      expect(targetComponent1).toHaveLength(0);
      expect(targetComponent2).toHaveLength(0);

      wrapper.update();
      wrapper.find('#clear-all-number-filters').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent1 = renderedComponent.find('#most-favorable-helpful');
      targetComponent2 = renderedComponent.find('#most-critical-helpful');

      expect(targetComponent1).toHaveLength(1);
      expect(targetComponent2).toHaveLength(1);

      wrapper.update();
      store.dispatch(updateShowRatingFilter(true));
      store.dispatch(updateShowRatingFilterDropDown(true));
      wrapper.update();
      wrapper.find('#score-filter-2-button-container').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent1 = renderedComponent.find('#most-favorable-helpful');
      targetComponent2 = renderedComponent.find('#most-critical-helpful');

      expect(targetComponent1).toHaveLength(0);
      expect(targetComponent2).toHaveLength(0);

      wrapper.update();
      wrapper.find('#clear-all-number-filters').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent1 = renderedComponent.find('#most-favorable-helpful');
      targetComponent2 = renderedComponent.find('#most-critical-helpful');

      expect(targetComponent1).toHaveLength(1);
      expect(targetComponent2).toHaveLength(1);

      wrapper.update();
      store.dispatch(updateShowNonNumberFilterSetting(true));
      wrapper.update();
      wrapper.find('#most-helpful').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent1 = renderedComponent.find('#most-favorable-helpful');
      targetComponent2 = renderedComponent.find('#most-critical-helpful');

      expect(targetComponent1).toHaveLength(1);
      expect(targetComponent2).toHaveLength(1);

      wrapper.update();
      store.dispatch(updateNumberOfReviews(0));
      store.dispatch(updateFilteredReviews([]));
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent1 = renderedComponent.find('#most-favorable-helpful');
      targetComponent2 = renderedComponent.find('#most-critical-helpful');

      expect(targetComponent1).toHaveLength(0);
      expect(targetComponent2).toHaveLength(0);

      wrapper.unmount();
    });
  });
});
