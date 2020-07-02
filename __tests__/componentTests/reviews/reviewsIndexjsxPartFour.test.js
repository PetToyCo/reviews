import React from 'react';
import { mount } from 'enzyme';
import generalData from '../../setup/generalData.js';
import storeStartingState from '../../setup/storeStartingState.js';
import store from '../../../client/src/ReduxSpecificComponents/store.js';
import Reviews from '../../../client/src/Components/Reviews/index.jsx';
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

describe('The Reviews component', () => {
  describe('has a menuExpansion button that', () => {
    it('changes appearance based on mouseover and mouseout', () => {
      const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });

      store.dispatch(updateReviewAverage(reviewAverage));
      store.dispatch(updateNumberOfReviews(numberOfReviews));
      store.dispatch(updateAllReviews(allReviews));
      wrapper.update();

      let renderedComponent = wrapper.render();
      let targetComponent = renderedComponent.find('#btn-number-filter-expansion');
      let { style } = targetComponent.get(0).attribs;

      expect(style).toContain('background-color: rgb(237, 237, 237);');
      expect(style).toEqual(expect.not.stringContaining('box-shadow'));

      wrapper.update();
      wrapper.find('#btn-number-filter-expansion').simulate('mouseover');
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent = renderedComponent.find('#btn-number-filter-expansion');
      style = targetComponent.get(0).attribs.style;

      expect(style).toContain('background-color: rgb(221, 221, 221);');
      expect(style).toContain('box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, .2);');

      wrapper.update();
      wrapper.find('#btn-number-filter-expansion').simulate('mouseout');
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent = renderedComponent.find('#btn-number-filter-expansion');
      style = targetComponent.get(0).attribs.style;

      expect(style).toContain('background-color: rgb(237, 237, 237);');
      expect(style).toContain('box-shadow: none;');

      wrapper.unmount();
    });
  });

  describe('has a NonNumberFilterSettings component that', () => {
    it('has buttons which, on mouseover and mouseout, change their color scheme', () => {
      const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });

      store.dispatch(updateReviewAverage(reviewAverage));
      store.dispatch(updateNumberOfReviews(numberOfReviews));
      store.dispatch(updateAllReviews(allReviews));
      store.dispatch(updateShowNonNumberFilterSetting(true));
      wrapper.update();

      let renderedComponent = wrapper.render();
      let targetComponent = renderedComponent.find('#most-helpful');
      let { style } = targetComponent.get(0).attribs;

      expect(style).toContain('background-color: white;');
      expect(style).toContain('color: rgb(102, 102, 102);');

      wrapper.update();
      wrapper.find('#most-helpful').simulate('mouseover');
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent = renderedComponent.find('#most-helpful');
      style = targetComponent.get(0).attribs.style;

      expect(style).toContain('background-color: rgb(0, 88, 145);');
      expect(style).toContain('color: white;');

      wrapper.update();
      wrapper.find('#most-helpful').simulate('mouseout');
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent = renderedComponent.find('#most-helpful');
      style = targetComponent.get(0).attribs.style;

      expect(style).toContain('background-color: white;');
      expect(style).toContain('color: rgb(102, 102, 102);');

      wrapper.unmount();
    });

    it('has buttons which have alternate appearance after being clicked', () => {
      const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });

      store.dispatch(updateReviewAverage(reviewAverage));
      store.dispatch(updateNumberOfReviews(numberOfReviews));
      store.dispatch(updateAllReviews(allReviews));
      store.dispatch(updateShowNonNumberFilterSetting(true));
      wrapper.update();

      let renderedComponent = wrapper.render();
      let targetComponent = renderedComponent.find('#most-recent');
      let { style } = targetComponent.get(0).attribs;

      expect(style).toContain('background-color: rgb(247, 247, 247);');
      expect(style).toContain('color: rgb(102, 102, 102);');

      wrapper.update();
      wrapper.find('#most-recent').simulate('mouseover');
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent = renderedComponent.find('#most-recent');
      style = targetComponent.get(0).attribs.style;

      expect(style).toContain('background-color: rgb(0, 88, 145);');
      expect(style).toContain('color: white;');

      wrapper.update();
      wrapper.find('#most-recent').simulate('mouseout');
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent = renderedComponent.find('#most-recent');
      style = targetComponent.get(0).attribs.style;

      expect(style).toContain('background-color: rgb(247, 247, 247);');
      expect(style).toContain('color: rgb(102, 102, 102);');

      wrapper.unmount();
    });

    it('has buttons which, when clicked, alter other components', () => {
      const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });

      store.dispatch(updateReviewAverage(reviewAverage));
      store.dispatch(updateNumberOfReviews(numberOfReviews));
      store.dispatch(updateAllReviews(allReviews));
      store.dispatch(updateShowNonNumberFilterSetting(true));
      wrapper.update();

      let renderedComponent = wrapper.render();
      let targetComponent = renderedComponent.find('#individual-reviews-container');
      let text = targetComponent.text();

      expect(text).toContain('Allison');
      expect(text).toContain('Binx');
      expect(text).toEqual(expect.not.stringContaining('Sarah'));

      wrapper.update();
      wrapper.find('#most-helpful').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent = renderedComponent.find('#individual-reviews-container');
      text = targetComponent.text();

      expect(text).toContain('Allison');
      expect(text).toContain('Sarah');
      expect(text).toEqual(expect.not.stringContaining('Binx'));

      wrapper.unmount();
    });
  });

  describe('has a RatingsFilterSettings component that', () => {
    it('has buttons which, on mouseover and mouseout, change their color scheme', () => {
      const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });

      store.dispatch(updateShowRatingFilter(true));
      store.dispatch(updateShowRatingFilterDropDown(true));
      wrapper.update();

      let renderedComponent = wrapper.render();
      let targetComponent1 = renderedComponent.find('#score-filter-1-button-container');
      let style1 = targetComponent1.get(0).attribs.style;
      let targetComponent2 = renderedComponent.find('#score-filter-1-button-stars');
      let style2 = targetComponent2.get(0).attribs.style;

      expect(style1).toContain('background-color: white;');
      expect(style2).toContain('color: rgb(102, 102, 102);');

      wrapper.update();
      wrapper.find('#score-filter-1-button-stars').simulate('mouseover');
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent1 = renderedComponent.find('#score-filter-1-button-container');
      style1 = targetComponent1.get(0).attribs.style;
      targetComponent2 = renderedComponent.find('#score-filter-1-button-stars');
      style2 = targetComponent2.get(0).attribs.style;

      expect(style1).toContain('background-color: rgb(0, 88, 145);');
      expect(style2).toContain('color: white;');

      wrapper.update();
      wrapper.find('#score-filter-1-button-stars').simulate('mouseout');
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent1 = renderedComponent.find('#score-filter-1-button-container');
      style1 = targetComponent1.get(0).attribs.style;
      targetComponent2 = renderedComponent.find('#score-filter-1-button-stars');
      style2 = targetComponent2.get(0).attribs.style;

      expect(style1).toContain('background-color: white;');
      expect(style2).toContain('color: rgb(102, 102, 102);');

      wrapper.unmount();
    });

    it('has buttons which have alternate appearance after being clicked', () => {
      const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });

      store.dispatch(updateShowRatingFilter(true));
      store.dispatch(updateShowRatingFilterDropDown(true));
      wrapper.update();

      let renderedComponent = wrapper.render();
      let targetComponent1 = renderedComponent.find('#score-filter-1-button-container');
      let style1 = targetComponent1.get(0).attribs.style;
      let targetComponent2 = renderedComponent.find('#score-filter-1-button-stars');
      let style2 = targetComponent2.get(0).attribs.style;

      expect(style1).toContain('background-color: white;');
      expect(style2).toContain('color: rgb(102, 102, 102);');

      wrapper.update();
      wrapper.find('#score-filter-1-button-container').simulate('click');
      store.dispatch(updateShowRatingFilterDropDown(true));
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent1 = renderedComponent.find('#score-filter-1-button-container');
      style1 = targetComponent1.get(0).attribs.style;
      targetComponent2 = renderedComponent.find('#score-filter-1-button-stars');
      style2 = targetComponent2.get(0).attribs.style;

      expect(style1).toContain('background-color: rgb(247, 247, 247);');
      expect(style2).toContain('color: rgb(102, 102, 102);');

      wrapper.update();
      wrapper.find('#score-filter-1-button-stars').simulate('mouseover');
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent1 = renderedComponent.find('#score-filter-1-button-container');
      style1 = targetComponent1.get(0).attribs.style;
      targetComponent2 = renderedComponent.find('#score-filter-1-button-stars');
      style2 = targetComponent2.get(0).attribs.style;

      expect(style1).toContain('background-color: rgb(0, 88, 145);');
      expect(style2).toContain('color: white;');

      wrapper.update();
      wrapper.find('#score-filter-1-button-stars').simulate('mouseout');
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent1 = renderedComponent.find('#score-filter-1-button-container');
      style1 = targetComponent1.get(0).attribs.style;
      targetComponent2 = renderedComponent.find('#score-filter-1-button-stars');
      style2 = targetComponent2.get(0).attribs.style;

      expect(style1).toContain('background-color: rgb(247, 247, 247);');
      expect(style2).toContain('color: rgb(102, 102, 102);');

      wrapper.unmount();
    });

    it('has buttons which, when clicked, alter other components', () => {
      const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });

      store.dispatch(updateReviewAverage(reviewAverage));
      store.dispatch(updateNumberOfReviews(numberOfReviews));
      store.dispatch(updateAllReviews(allReviews));
      store.dispatch(updateShowRatingFilter(true));
      store.dispatch(updateShowRatingFilterDropDown(true));
      wrapper.update();

      let renderedComponent = wrapper.render();
      let targetComponent1 = renderedComponent.find('#active-filters-bar');
      let targetComponent2 = renderedComponent.find('#individual-reviews-container');
      let text = targetComponent2.text();
      let targetComponent3 = renderedComponent.find('#score-ratings-filter-menu');

      expect(targetComponent1).toHaveLength(0);
      expect(targetComponent3).toHaveLength(1);
      expect(text).toContain('Allison');
      expect(text).toContain('Binx');
      expect(text).toEqual(expect.not.stringContaining('Dani'));

      wrapper.update();
      wrapper.find('#score-filter-1-button-container').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent1 = renderedComponent.find('#active-filters-bar');
      targetComponent2 = renderedComponent.find('#individual-reviews-container');
      text = targetComponent2.text();
      targetComponent3 = renderedComponent.find('#score-ratings-filter-menu');

      expect(targetComponent1).toHaveLength(1);
      expect(targetComponent3).toHaveLength(0);
      expect(text).toContain('Allison');
      expect(text).toContain('Dani');
      expect(text).toEqual(expect.not.stringContaining('Binx'));

      wrapper.update();
      store.dispatch(updateShowRatingFilterDropDown(true));
      wrapper.update();
      wrapper.find('#score-filter-1-button-container').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent1 = renderedComponent.find('#active-filters-bar');
      targetComponent2 = renderedComponent.find('#individual-reviews-container');
      text = targetComponent2.text();
      targetComponent3 = renderedComponent.find('#score-ratings-filter-menu');

      expect(targetComponent1).toHaveLength(0);
      expect(targetComponent3).toHaveLength(0);
      expect(text).toContain('Allison');
      expect(text).toContain('Binx');
      expect(text).toEqual(expect.not.stringContaining('Dani'));

      wrapper.unmount();
    });
  });
});
