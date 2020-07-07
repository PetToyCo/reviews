import React from 'react';
import { mount } from 'enzyme';
import generalData from '../../setup/generalData.js';
import storeStartingState from '../../setup/storeStartingState.js';
import store from '../../../client/src/ReduxSpecificComponents/store.js';
import ReviewsModule from '../../../client/src/service.jsx';
import ReviewBody from '../../../client/src/Components/ReviewBody/index.jsx';
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
  describe('has a StarChart component where each StarChartRow subcomponent', () => {
    it('correctly dynamically renders its type, bar, and count', () => {
      const wrapper = mount(<Provider store={store}><ReviewsModule /></Provider>, { attachTo: document.body });

      store.dispatch(updateReviewAverage(reviewAverage));
      store.dispatch(updateNumberOfReviews(numberOfReviews));
      store.dispatch(updateAllReviews(allReviews));
      wrapper.update();

      const renderedComponent = wrapper.render();
      let targetComponent1 = renderedComponent.find('#star-chart-row-bar-1');
      const style1 = targetComponent1.get(0).attribs.style;
      let targetComponent2 = renderedComponent.find('#star-chart-row-bar-2');
      const style2 = targetComponent2.get(0).attribs.style;
      let targetComponent3 = renderedComponent.find('#star-chart-row-bar-3');
      const style3 = targetComponent3.get(0).attribs.style;
      let targetComponent4 = renderedComponent.find('#star-chart-row-bar-4');
      const style4 = targetComponent4.get(0).attribs.style;
      let targetComponent5 = renderedComponent.find('#star-chart-row-bar-5');
      const style5 = targetComponent5.get(0).attribs.style;

      expect(style1).toContain('width: 36');
      expect(style2).toContain('width: 24');
      expect(style3).toContain('width: 36');
      expect(style4).toContain('width: 48');
      expect(style5).toContain('width: 84');

      targetComponent1 = renderedComponent.find('#star-chart-row-type-1');
      let text1 = targetComponent1.text();
      targetComponent2 = renderedComponent.find('#star-chart-row-type-2');
      let text2 = targetComponent2.text();
      targetComponent3 = renderedComponent.find('#star-chart-row-type-3');
      let text3 = targetComponent3.text();
      targetComponent4 = renderedComponent.find('#star-chart-row-type-4');
      let text4 = targetComponent4.text();
      targetComponent5 = renderedComponent.find('#star-chart-row-type-5');
      let text5 = targetComponent5.text();

      expect(text1).toEqual('1');
      expect(text2).toEqual('2');
      expect(text3).toEqual('3');
      expect(text4).toEqual('4');
      expect(text5).toEqual('5');

      targetComponent1 = renderedComponent.find('#star-chart-row-count-1');
      text1 = targetComponent1.text();
      targetComponent2 = renderedComponent.find('#star-chart-row-count-2');
      text2 = targetComponent2.text();
      targetComponent3 = renderedComponent.find('#star-chart-row-count-3');
      text3 = targetComponent3.text();
      targetComponent4 = renderedComponent.find('#star-chart-row-count-4');
      text4 = targetComponent4.text();
      targetComponent5 = renderedComponent.find('#star-chart-row-count-5');
      text5 = targetComponent5.text();

      expect(text1).toEqual('3');
      expect(text2).toEqual('2');
      expect(text3).toEqual('3');
      expect(text4).toEqual('4');
      expect(text5).toEqual('7');

      wrapper.unmount();
    });

    it('has no background unless the mouse is hovering over it', () => {
      const wrapper = mount(<Provider store={store}><ReviewBody /></Provider>, { attachTo: document.body });

      store.dispatch(updateReviewAverage(reviewAverage));
      store.dispatch(updateNumberOfReviews(numberOfReviews));
      store.dispatch(updateAllReviews(allReviews));
      wrapper.update();

      let renderedComponent = wrapper.render();
      let targetComponent1 = renderedComponent.find('#star-chart-row-1');
      let style1 = targetComponent1.get(0).attribs.style;
      let targetComponent2 = renderedComponent.find('#star-chart-row-2');
      let style2 = targetComponent2.get(0).attribs.style;
      let targetComponent3 = renderedComponent.find('#star-chart-row-3');
      let style3 = targetComponent3.get(0).attribs.style;
      let targetComponent4 = renderedComponent.find('#star-chart-row-4');
      let style4 = targetComponent4.get(0).attribs.style;
      let targetComponent5 = renderedComponent.find('#star-chart-row-5');
      let style5 = targetComponent5.get(0).attribs.style;

      expect(style1).toEqual(expect.not.stringContaining('background-color: rgb(247, 247, 247);'));
      expect(style2).toEqual(expect.not.stringContaining('background-color: rgb(247, 247, 247);'));
      expect(style3).toEqual(expect.not.stringContaining('background-color: rgb(247, 247, 247);'));
      expect(style4).toEqual(expect.not.stringContaining('background-color: rgb(247, 247, 247);'));
      expect(style5).toEqual(expect.not.stringContaining('background-color: rgb(247, 247, 247);'));

      wrapper.update();
      wrapper.find('#star-chart-row-1').simulate('mouseover');
      wrapper.find('#star-chart-row-2').simulate('mouseover');
      wrapper.find('#star-chart-row-3').simulate('mouseover');
      wrapper.find('#star-chart-row-4').simulate('mouseover');
      wrapper.find('#star-chart-row-5').simulate('mouseover');
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent1 = renderedComponent.find('#star-chart-row-1');
      style1 = targetComponent1.get(0).attribs.style;
      targetComponent2 = renderedComponent.find('#star-chart-row-2');
      style2 = targetComponent2.get(0).attribs.style;
      targetComponent3 = renderedComponent.find('#star-chart-row-3');
      style3 = targetComponent3.get(0).attribs.style;
      targetComponent4 = renderedComponent.find('#star-chart-row-4');
      style4 = targetComponent4.get(0).attribs.style;
      targetComponent5 = renderedComponent.find('#star-chart-row-5');
      style5 = targetComponent5.get(0).attribs.style;

      expect(style1).toContain('background-color: rgb(247, 247, 247);');
      expect(style2).toContain('background-color: rgb(247, 247, 247);');
      expect(style3).toContain('background-color: rgb(247, 247, 247);');
      expect(style4).toContain('background-color: rgb(247, 247, 247);');
      expect(style5).toContain('background-color: rgb(247, 247, 247);');

      wrapper.update();
      wrapper.find('#star-chart-row-1').simulate('mouseout');
      wrapper.find('#star-chart-row-2').simulate('mouseout');
      wrapper.find('#star-chart-row-3').simulate('mouseout');
      wrapper.find('#star-chart-row-4').simulate('mouseout');
      wrapper.find('#star-chart-row-5').simulate('mouseout');
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent1 = renderedComponent.find('#star-chart-row-1');
      style1 = targetComponent1.get(0).attribs.style;
      targetComponent2 = renderedComponent.find('#star-chart-row-2');
      style2 = targetComponent2.get(0).attribs.style;
      targetComponent3 = renderedComponent.find('#star-chart-row-3');
      style3 = targetComponent3.get(0).attribs.style;
      targetComponent4 = renderedComponent.find('#star-chart-row-4');
      style4 = targetComponent4.get(0).attribs.style;
      targetComponent5 = renderedComponent.find('#star-chart-row-5');
      style5 = targetComponent5.get(0).attribs.style;

      expect(style1).toEqual(expect.not.stringContaining('background-color: rgb(247, 247, 247);'));
      expect(style2).toEqual(expect.not.stringContaining('background-color: rgb(247, 247, 247);'));
      expect(style3).toEqual(expect.not.stringContaining('background-color: rgb(247, 247, 247);'));
      expect(style4).toEqual(expect.not.stringContaining('background-color: rgb(247, 247, 247);'));
      expect(style5).toEqual(expect.not.stringContaining('background-color: rgb(247, 247, 247);'));

      wrapper.unmount();
    });

    it('that work in conjunction with the other filter buttons', () => {
      const wrapper = mount(<Provider store={store}><ReviewsModule /></Provider>, { attachTo: document.body });

      store.dispatch(updateReviewAverage(reviewAverage));
      store.dispatch(updateNumberOfReviews(numberOfReviews));
      store.dispatch(updateAllReviews(allReviews));
      wrapper.update();
      wrapper.find('#star-chart-row-1').simulate('click');
      wrapper.update();

      let renderedComponent = wrapper.render();
      let reviews = renderedComponent.find('#individual-reviews-container');
      let reviewsText = reviews.text();

      expect(reviewsText).toContain('Allison');
      expect(reviewsText).toContain('Dani');
      expect(reviewsText).toContain('Max');
      expect(reviewsText).toEqual(expect.not.stringContaining('Binx'));
      expect(reviewsText).toEqual(expect.not.stringContaining('Billy'));

      wrapper.update();
      store.dispatch(updateShowRatingFilter(true));
      wrapper.update();
      store.dispatch(updateShowRatingFilterDropDown(true));
      wrapper.update();
      wrapper.find('#score-filter-3-button-container').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      reviews = renderedComponent.find('#individual-reviews-container');
      reviewsText = reviews.text();

      expect(reviewsText).toContain('Allison');
      expect(reviewsText).toContain('Dani');
      expect(reviewsText).toContain('Max');
      expect(reviewsText).toContain('Mary');
      expect(reviewsText).toContain('Emily');
      expect(reviewsText).toContain('Sarah');
      expect(reviewsText).toEqual(expect.not.stringContaining('CatButt'));
      expect(reviewsText).toEqual(expect.not.stringContaining('catdude'));

      wrapper.update();
      store.dispatch(updateShowRatingFilterDropDown(true));
      wrapper.update();
      wrapper.find('#score-filter-5-button-container').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      reviews = renderedComponent.find('#individual-reviews-container');
      reviewsText = reviews.text();

      expect(reviewsText).toContain('ChonkyCat');
      expect(reviewsText).toContain('Mary');
      expect(reviewsText).toContain('CatButt');
      expect(reviewsText).toContain('Allison');
      expect(reviewsText).toContain('catdude');
      expect(reviewsText).toContain('NotACatLady');
      expect(reviewsText).toContain('Emily');
      expect(reviewsText).toContain('Dani');
      expect(reviewsText).toEqual(expect.not.stringContaining('TummyScratcher'));
      expect(reviewsText).toEqual(expect.not.stringContaining('Binx'));

      wrapper.update();
      wrapper.find('#forward-nav-button').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      reviews = renderedComponent.find('#individual-reviews-container');
      reviewsText = reviews.text();

      expect(reviewsText).toContain('TummyScratcher');
      expect(reviewsText).toContain('PikaPika');
      expect(reviewsText).toContain('Max');
      expect(reviewsText).toContain('Sarah');
      expect(reviewsText).toContain('Froggy');

      wrapper.update();
      store.dispatch(updateShowNonNumberFilterSetting(true));
      wrapper.update();
      wrapper.find('#most-helpful').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      reviews = renderedComponent.find('#individual-reviews-container');
      reviewsText = reviews.text();

      expect(reviewsText).toContain('Sarah');
      expect(reviewsText).toContain('PikaPika');
      expect(reviewsText).toContain('ChonkyCat');
      expect(reviewsText).toContain('CatButt');
      expect(reviewsText).toContain('Allison');
      expect(reviewsText).toContain('catdude');
      expect(reviewsText).toContain('NotACatLady');
      expect(reviewsText).toContain('Dani');

      wrapper.update();
      wrapper.find('#forward-nav-button').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      reviews = renderedComponent.find('#individual-reviews-container');
      reviewsText = reviews.text();

      expect(reviewsText).toContain('TummyScratcher');
      expect(reviewsText).toContain('Max');
      expect(reviewsText).toContain('Froggy');
      expect(reviewsText).toContain('Emily');
      expect(reviewsText).toContain('Mary');

      wrapper.update();
      store.dispatch(updateShowNonNumberFilterSetting(true));
      wrapper.update();
      wrapper.find('#high-to-low').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      reviews = renderedComponent.find('#individual-reviews-container');
      reviewsText = reviews.text();

      expect(reviewsText).toContain('PikaPika');
      expect(reviewsText).toContain('ChonkyCat');
      expect(reviewsText).toContain('CatButt');
      expect(reviewsText).toContain('catdude');
      expect(reviewsText).toContain('NotACatLady');
      expect(reviewsText).toContain('TummyScratcher');
      expect(reviewsText).toContain('Froggy');
      expect(reviewsText).toContain('Mary');

      wrapper.update();
      wrapper.find('#forward-nav-button').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      reviews = renderedComponent.find('#individual-reviews-container');
      reviewsText = reviews.text();

      expect(reviewsText).toContain('Allison');
      expect(reviewsText).toContain('Sarah');
      expect(reviewsText).toContain('Emily');
      expect(reviewsText).toContain('Max');
      expect(reviewsText).toContain('Dani');

      wrapper.update();
      store.dispatch(updateShowNonNumberFilterSetting(true));
      wrapper.update();
      wrapper.find('#low-to-high').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      reviews = renderedComponent.find('#individual-reviews-container');
      reviewsText = reviews.text();

      expect(reviewsText).toContain('ChonkyCat');
      expect(reviewsText).toContain('CatButt');
      expect(reviewsText).toContain('Mary');
      expect(reviewsText).toContain('Allison');
      expect(reviewsText).toContain('Sarah');
      expect(reviewsText).toContain('Emily');
      expect(reviewsText).toContain('Max');
      expect(reviewsText).toContain('Dani');

      wrapper.update();
      wrapper.find('#forward-nav-button').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      reviews = renderedComponent.find('#individual-reviews-container');
      reviewsText = reviews.text();

      expect(reviewsText).toContain('PikaPika');
      expect(reviewsText).toContain('catdude');
      expect(reviewsText).toContain('NotACatLady');
      expect(reviewsText).toContain('TummyScratcher');
      expect(reviewsText).toContain('Froggy');

      wrapper.update();
      wrapper.find('#star-chart-row-4').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      reviews = renderedComponent.find('#individual-reviews-container');
      reviewsText = reviews.text();

      expect(reviewsText).toContain('Mary');
      expect(reviewsText).toContain('Allison');
      expect(reviewsText).toContain('Sarah');
      expect(reviewsText).toContain('Emily');
      expect(reviewsText).toContain('Max');
      expect(reviewsText).toContain('Dani');
      expect(reviewsText).toContain('Winifred');
      expect(reviewsText).toContain('ElGatoSupreme');

      wrapper.update();
      wrapper.find('#forward-nav-button').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      reviews = renderedComponent.find('#individual-reviews-container');
      reviewsText = reviews.text();

      expect(reviewsText).toContain('PikaPika');
      expect(reviewsText).toContain('ChonkyCat');
      expect(reviewsText).toContain('catdude');
      expect(reviewsText).toContain('NotACatLady');
      expect(reviewsText).toContain('TummyScratcher');
      expect(reviewsText).toContain('Froggy');
      expect(reviewsText).toContain('CVCat');
      expect(reviewsText).toContain('Bob');
      expect(reviewsText).toContain('CatButt');

      wrapper.unmount();
    });

    it('causes the reviews to be filtered by their specific score, when clicked', () => {
      const wrapper = mount(<Provider store={store}><ReviewsModule /></Provider>, { attachTo: document.body });

      store.dispatch(updateReviewAverage(reviewAverage));
      store.dispatch(updateNumberOfReviews(numberOfReviews));
      store.dispatch(updateAllReviews(allReviews));
      wrapper.update();

      let renderedComponent = wrapper.render();
      let reviews = renderedComponent.find('#individual-reviews-container');
      let reviewsText = reviews.text();

      expect(reviewsText).toContain('Binx');
      expect(reviewsText).toContain('ChonkyCat');
      expect(reviewsText).toContain('ElGatoSupreme');
      expect(reviewsText).toContain('Mary');
      expect(reviewsText).toContain('CatButt');
      expect(reviewsText).toContain('Allison');
      expect(reviewsText).toContain('Winifred');
      expect(reviewsText).toContain('CVCat');

      wrapper.update();
      wrapper.find('#forward-nav-button').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      reviews = renderedComponent.find('#individual-reviews-container');
      reviewsText = reviews.text();

      expect(reviewsText).toContain('catdude');
      expect(reviewsText).toContain('NotACatLady');
      expect(reviewsText).toContain('Emily');
      expect(reviewsText).toContain('Dani');
      expect(reviewsText).toContain('TummyScratcher');
      expect(reviewsText).toContain('PikaPika');
      expect(reviewsText).toContain('Max');
      expect(reviewsText).toContain('Sarah');
      expect(reviewsText).toContain('Froggy');
      expect(reviewsText).toContain('Billy');
      expect(reviewsText).toContain('Bob');

      wrapper.update();
      wrapper.find('#star-chart-row-1').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      reviews = renderedComponent.find('#individual-reviews-container');
      reviewsText = reviews.text();

      expect(reviewsText).toContain('Allison');
      expect(reviewsText).toContain('Dani');
      expect(reviewsText).toContain('Max');
      expect(reviewsText).toEqual(expect.not.stringContaining('Binx'));
      expect(reviewsText).toEqual(expect.not.stringContaining('Billy'));

      wrapper.update();
      wrapper.find('#clear-all-number-filters').simulate('click');
      wrapper.find('#star-chart-row-2').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      reviews = renderedComponent.find('#individual-reviews-container');
      reviewsText = reviews.text();

      expect(reviewsText).toContain('Binx');
      expect(reviewsText).toContain('Billy');
      expect(reviewsText).toEqual(expect.not.stringContaining('CatButt'));
      expect(reviewsText).toEqual(expect.not.stringContaining('catdude'));

      wrapper.update();
      wrapper.find('#clear-all-number-filters').simulate('click');
      wrapper.find('#star-chart-row-3').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      reviews = renderedComponent.find('#individual-reviews-container');
      reviewsText = reviews.text();

      expect(reviewsText).toContain('Mary');
      expect(reviewsText).toContain('Emily');
      expect(reviewsText).toContain('Sarah');
      expect(reviewsText).toEqual(expect.not.stringContaining('CatButt'));
      expect(reviewsText).toEqual(expect.not.stringContaining('catdude'));

      wrapper.update();
      wrapper.find('#clear-all-number-filters').simulate('click');
      wrapper.find('#star-chart-row-4').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      reviews = renderedComponent.find('#individual-reviews-container');
      reviewsText = reviews.text();

      expect(reviewsText).toContain('ElGatoSupreme');
      expect(reviewsText).toContain('Winifred');
      expect(reviewsText).toContain('CVCat');
      expect(reviewsText).toContain('Bob');
      expect(reviewsText).toEqual(expect.not.stringContaining('CatButt'));
      expect(reviewsText).toEqual(expect.not.stringContaining('catdude'));

      wrapper.update();
      wrapper.find('#clear-all-number-filters').simulate('click');
      wrapper.find('#star-chart-row-5').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      reviews = renderedComponent.find('#individual-reviews-container');
      reviewsText = reviews.text();

      expect(reviewsText).toContain('ChonkyCat');
      expect(reviewsText).toContain('CatButt');
      expect(reviewsText).toContain('catdude');
      expect(reviewsText).toContain('NotACatLady');
      expect(reviewsText).toContain('TummyScratcher');
      expect(reviewsText).toContain('PikaPika');
      expect(reviewsText).toContain('Froggy');
      expect(reviewsText).toEqual(expect.not.stringContaining('Binx'));
      expect(reviewsText).toEqual(expect.not.stringContaining('Billy'));

      wrapper.update();
      wrapper.find('#clear-all-number-filters').simulate('click');
      wrapper.find('#star-chart-row-1').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      reviews = renderedComponent.find('#individual-reviews-container');
      reviewsText = reviews.text();

      expect(reviewsText).toContain('Allison');
      expect(reviewsText).toContain('Dani');
      expect(reviewsText).toContain('Max');

      wrapper.update();
      wrapper.find('#star-chart-row-2').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      reviews = renderedComponent.find('#individual-reviews-container');
      reviewsText = reviews.text();

      expect(reviewsText).toContain('Allison');
      expect(reviewsText).toContain('Dani');
      expect(reviewsText).toContain('Max');
      expect(reviewsText).toContain('Binx');
      expect(reviewsText).toContain('Billy');

      wrapper.update();
      wrapper.find('#star-chart-row-3').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      reviews = renderedComponent.find('#individual-reviews-container');
      reviewsText = reviews.text();

      expect(reviewsText).toContain('Allison');
      expect(reviewsText).toContain('Dani');
      expect(reviewsText).toContain('Max');
      expect(reviewsText).toContain('Binx');
      expect(reviewsText).toContain('Billy');
      expect(reviewsText).toContain('Mary');
      expect(reviewsText).toContain('Emily');
      expect(reviewsText).toContain('Sarah');

      wrapper.update();
      wrapper.find('#star-chart-row-4').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      reviews = renderedComponent.find('#individual-reviews-container');
      reviewsText = reviews.text();

      expect(reviewsText).toContain('Binx');
      expect(reviewsText).toContain('ElGatoSupreme');
      expect(reviewsText).toContain('Mary');
      expect(reviewsText).toContain('Allison');
      expect(reviewsText).toContain('Winifred');
      expect(reviewsText).toContain('CVCat');
      expect(reviewsText).toContain('Emily');
      expect(reviewsText).toContain('Dani');

      wrapper.update();
      wrapper.find('#forward-nav-button').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      reviews = renderedComponent.find('#individual-reviews-container');
      reviewsText = reviews.text();

      expect(reviewsText).toContain('Max');
      expect(reviewsText).toContain('Sarah');
      expect(reviewsText).toContain('Billy');
      expect(reviewsText).toContain('Bob');

      wrapper.update();
      wrapper.find('#star-chart-row-5').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      reviews = renderedComponent.find('#individual-reviews-container');
      reviewsText = reviews.text();

      expect(reviewsText).toContain('Binx');
      expect(reviewsText).toContain('ChonkyCat');
      expect(reviewsText).toContain('ElGatoSupreme');
      expect(reviewsText).toContain('Mary');
      expect(reviewsText).toContain('CatButt');
      expect(reviewsText).toContain('Allison');
      expect(reviewsText).toContain('Winifred');
      expect(reviewsText).toContain('CVCat');

      wrapper.update();
      wrapper.find('#forward-nav-button').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      reviews = renderedComponent.find('#individual-reviews-container');
      reviewsText = reviews.text();

      expect(reviewsText).toContain('catdude');
      expect(reviewsText).toContain('NotACatLady');
      expect(reviewsText).toContain('Emily');
      expect(reviewsText).toContain('Dani');
      expect(reviewsText).toContain('TummyScratcher');
      expect(reviewsText).toContain('PikaPika');
      expect(reviewsText).toContain('Max');
      expect(reviewsText).toContain('Sarah');
      expect(reviewsText).toContain('Froggy');
      expect(reviewsText).toContain('Billy');
      expect(reviewsText).toContain('Bob');

      wrapper.unmount();
    });
  });
});
