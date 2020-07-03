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
  describe('has a RatingsFilter component that', () => {
    it('shows a drop down menu when clicked', () => {
      const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });

      store.dispatch(updateShowRatingFilter(true));

      wrapper.update();

      let renderedComponent = wrapper.render();
      let targetComponent = renderedComponent.find('#score-ratings-filter-menu');

      expect(targetComponent).toHaveLength(0);

      wrapper.update();
      wrapper.find('#score-ratings-filter-trigger').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent = renderedComponent.find('#score-ratings-filter-menu');

      expect(targetComponent).toHaveLength(1);

      wrapper.unmount();
    });

    it('shows a drop down menu when clicked, then hides it when clicked again', () => {
      const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });

      store.dispatch(updateShowRatingFilter(true));

      wrapper.update();

      let renderedComponent = wrapper.render();
      let targetComponent = renderedComponent.find('#score-ratings-filter-menu');

      expect(targetComponent).toHaveLength(0);

      wrapper.update();
      wrapper.find('#score-ratings-filter-trigger').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent = renderedComponent.find('#score-ratings-filter-menu');

      expect(targetComponent).toHaveLength(1);

      wrapper.update();
      wrapper.find('#score-ratings-filter-trigger').simulate('click');
      wrapper.update();

      renderedComponent = wrapper.render();
      targetComponent = renderedComponent.find('#score-ratings-filter-menu');

      expect(targetComponent).toHaveLength(0);

      wrapper.unmount();
    });
  });

  describe('has a Helpful subcomponent that', () => {
    test('has, when indexInCurrentFilteredReviews - 1, has a <div> tag with id "yes-tracker-0"', () => {
      const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });

      let renderedComponent = wrapper.render();
      let targetComponent = renderedComponent.find('#yes-tracker-0');

      expect(targetComponent).toHaveLength(0);

      store.dispatch(updateReviewAverage(reviewAverage));
      store.dispatch(updateNumberOfReviews(numberOfReviews));
      store.dispatch(updateAllReviews(allReviews));

      renderedComponent = wrapper.render();
      targetComponent = renderedComponent.find('#yes-tracker-0');

      expect(targetComponent).toHaveLength(1);

      wrapper.unmount();
    });

    test('has, when indexInCurrentFilteredReviews - 1, has a <div> tag with id "no-tracker-0"', () => {
      const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });

      let renderedComponent = wrapper.render();
      let targetComponent = renderedComponent.find('#no-tracker-0');

      expect(targetComponent).toHaveLength(0);

      store.dispatch(updateReviewAverage(reviewAverage));
      store.dispatch(updateNumberOfReviews(numberOfReviews));
      store.dispatch(updateAllReviews(allReviews));

      renderedComponent = wrapper.render();
      targetComponent = renderedComponent.find('#no-tracker-0');

      expect(targetComponent).toHaveLength(1);

      wrapper.unmount();
    });

    test('has a <div> tag with id "yes-tracker-0" that does not normally have a box shadow', () => {
      const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });
      store.dispatch(updateReviewAverage(reviewAverage));
      store.dispatch(updateNumberOfReviews(numberOfReviews));
      store.dispatch(updateAllReviews(allReviews));

      const renderedComponent = wrapper.render();
      const targetComponent = renderedComponent.find('#yes-tracker-0');
      const { style } = targetComponent.get(0).attribs;

      expect(style).toEqual(expect.not.stringContaining('boxShadow'));

      wrapper.unmount();
    });

    test('has a <div> tag with id "yes-tracker-0" that has a box shadow on mouseover', () => {
      const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });
      store.dispatch(updateReviewAverage(reviewAverage));
      store.dispatch(updateNumberOfReviews(numberOfReviews));
      store.dispatch(updateAllReviews(allReviews));

      let renderedComponent = wrapper.render();
      let targetComponent = renderedComponent.find('#yes-tracker-0');
      let { style } = targetComponent.get(0).attribs;

      expect(style).toEqual(expect.not.stringContaining('box-shadow'));

      wrapper.update();
      wrapper.find('#yes-tracker-0').simulate('mouseover');

      renderedComponent = wrapper.render();
      targetComponent = renderedComponent.find('#yes-tracker-0');
      style = targetComponent.get(0).attribs.style;

      expect(style).toContain('box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, 0.2);');

      wrapper.unmount();
    });

    test('has a <div> tag with id "yes-tracker-0" that loses its box shadow on mouseout', () => {
      const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });
      store.dispatch(updateReviewAverage(reviewAverage));
      store.dispatch(updateNumberOfReviews(numberOfReviews));
      store.dispatch(updateAllReviews(allReviews));

      let renderedComponent = wrapper.render();
      let targetComponent = renderedComponent.find('#yes-tracker-0');
      let { style } = targetComponent.get(0).attribs;

      expect(style).toEqual(expect.not.stringContaining('box-shadow'));

      wrapper.update();
      wrapper.find('#yes-tracker-0').simulate('mouseover');

      renderedComponent = wrapper.render();
      targetComponent = renderedComponent.find('#yes-tracker-0');
      style = targetComponent.get(0).attribs.style;

      expect(style).toContain('box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, 0.2);');

      wrapper.update();
      wrapper.find('#yes-tracker-0').simulate('mouseout');

      renderedComponent = wrapper.render();
      targetComponent = renderedComponent.find('#yes-tracker-0');
      style = targetComponent.get(0).attribs.style;

      expect(style).toEqual(expect.not.stringContaining('box-shadow'));

      wrapper.unmount();
    });

    test('has a <div> tag with id "no-tracker-0" that does not normally have a box shadow', () => {
      const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });
      store.dispatch(updateReviewAverage(reviewAverage));
      store.dispatch(updateNumberOfReviews(numberOfReviews));
      store.dispatch(updateAllReviews(allReviews));

      const renderedComponent = wrapper.render();
      const targetComponent = renderedComponent.find('#no-tracker-0');
      const { style } = targetComponent.get(0).attribs;

      expect(style).toEqual(expect.not.stringContaining('boxShadow'));

      wrapper.unmount();
    });

    test('has a <div> tag with id "no-tracker-0" that has a box shadow on mouseover', () => {
      const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });
      store.dispatch(updateReviewAverage(reviewAverage));
      store.dispatch(updateNumberOfReviews(numberOfReviews));
      store.dispatch(updateAllReviews(allReviews));

      let renderedComponent = wrapper.render();
      let targetComponent = renderedComponent.find('#no-tracker-0');
      let { style } = targetComponent.get(0).attribs;

      expect(style).toEqual(expect.not.stringContaining('box-shadow'));

      wrapper.update();
      wrapper.find('#no-tracker-0').simulate('mouseover');

      renderedComponent = wrapper.render();
      targetComponent = renderedComponent.find('#no-tracker-0');
      style = targetComponent.get(0).attribs.style;

      expect(style).toContain('box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, 0.2);');

      wrapper.unmount();
    });

    test('has a <div> tag with id "no-tracker-0" that loses its box shadow on mouseout', () => {
      const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });
      store.dispatch(updateReviewAverage(reviewAverage));
      store.dispatch(updateNumberOfReviews(numberOfReviews));
      store.dispatch(updateAllReviews(allReviews));

      let renderedComponent = wrapper.render();
      let targetComponent = renderedComponent.find('#no-tracker-0');
      let { style } = targetComponent.get(0).attribs;

      expect(style).toEqual(expect.not.stringContaining('box-shadow'));

      wrapper.update();
      wrapper.find('#no-tracker-0').simulate('mouseover');

      renderedComponent = wrapper.render();
      targetComponent = renderedComponent.find('#no-tracker-0');
      style = targetComponent.get(0).attribs.style;

      expect(style).toContain('box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, 0.2);');

      wrapper.update();
      wrapper.find('#no-tracker-0').simulate('mouseout');

      renderedComponent = wrapper.render();
      targetComponent = renderedComponent.find('#no-tracker-0');
      style = targetComponent.get(0).attribs.style;

      expect(style).toEqual(expect.not.stringContaining('box-shadow'));

      wrapper.unmount();
    });

    test('has a <div> tag with id "report-tracker-0" that does not normally have a box shadow', () => {
      const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });
      store.dispatch(updateReviewAverage(reviewAverage));
      store.dispatch(updateNumberOfReviews(numberOfReviews));
      store.dispatch(updateAllReviews(allReviews));

      const renderedComponent = wrapper.render();
      const targetComponent = renderedComponent.find('#report-tracker-0');
      const { style } = targetComponent.get(0).attribs;

      expect(style).toEqual(expect.not.stringContaining('boxShadow'));

      wrapper.unmount();
    });

    test('has a <div> tag with id "report-tracker-0" that has a box shadow on mouseover', () => {
      const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });
      store.dispatch(updateReviewAverage(reviewAverage));
      store.dispatch(updateNumberOfReviews(numberOfReviews));
      store.dispatch(updateAllReviews(allReviews));

      let renderedComponent = wrapper.render();
      let targetComponent = renderedComponent.find('#report-tracker-0');
      let { style } = targetComponent.get(0).attribs;

      expect(style).toEqual(expect.not.stringContaining('box-shadow'));

      wrapper.update();
      wrapper.find('#report-tracker-0').simulate('mouseover');

      renderedComponent = wrapper.render();
      targetComponent = renderedComponent.find('#report-tracker-0');
      style = targetComponent.get(0).attribs.style;

      expect(style).toContain('box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, 0.2);');

      wrapper.unmount();
    });

    test('has a <div> tag with id "report-tracker-0" that loses its box shadow on mouseout', () => {
      const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });
      store.dispatch(updateReviewAverage(reviewAverage));
      store.dispatch(updateNumberOfReviews(numberOfReviews));
      store.dispatch(updateAllReviews(allReviews));

      let renderedComponent = wrapper.render();
      let targetComponent = renderedComponent.find('#report-tracker-0');
      let { style } = targetComponent.get(0).attribs;

      expect(style).toEqual(expect.not.stringContaining('box-shadow'));

      wrapper.update();
      wrapper.find('#report-tracker-0').simulate('mouseover');

      renderedComponent = wrapper.render();
      targetComponent = renderedComponent.find('#report-tracker-0');
      style = targetComponent.get(0).attribs.style;

      expect(style).toContain('box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, 0.2);');

      wrapper.update();
      wrapper.find('#report-tracker-0').simulate('mouseout');

      renderedComponent = wrapper.render();
      targetComponent = renderedComponent.find('#report-tracker-0');
      style = targetComponent.get(0).attribs.style;

      expect(style).toEqual(expect.not.stringContaining('box-shadow'));

      wrapper.unmount();
    });

    test('has <div> components whose text changes color when "no-tracker-0" is clicked', () => {
      const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });
      store.dispatch(updateReviewAverage(reviewAverage));
      store.dispatch(updateNumberOfReviews(numberOfReviews));
      store.dispatch(updateAllReviews(allReviews));

      let renderedComponent = wrapper.render();
      let targetComponent = renderedComponent.find('#yes-button-0');
      let style1 = targetComponent.get(0).attribs.style;
      let targetComponentTwo = renderedComponent.find('#no-button-0');
      let style2 = targetComponentTwo.get(0).attribs.style;

      expect(style1).toContain('color: rgb(51, 51, 51);');
      expect(style2).toContain('color: rgb(51, 51, 51);');

      wrapper.update();
      wrapper.find('#no-tracker-0').simulate('click');

      renderedComponent = wrapper.render();
      targetComponent = renderedComponent.find('#yes-button-0');
      style1 = targetComponent.get(0).attribs.style;
      targetComponentTwo = renderedComponent.find('#no-button-0');
      style2 = targetComponentTwo.get(0).attribs.style;

      expect(style1).toContain('color: rgb(41, 120, 38);');
      expect(style2).toContain('color: rgb(180, 48, 52);');

      wrapper.unmount();
    });

    test('has <div> components whose text changes color when "yes-tracker-0" is clicked', () => {
      const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });
      allReviews[0].disabled = false;
      store.dispatch(updateReviewAverage(reviewAverage));
      store.dispatch(updateNumberOfReviews(numberOfReviews));
      store.dispatch(updateAllReviews(allReviews));

      let renderedComponent = wrapper.render();
      let targetComponent = renderedComponent.find('#yes-button-0');
      let style1 = targetComponent.get(0).attribs.style;
      let targetComponentTwo = renderedComponent.find('#no-button-0');
      let style2 = targetComponentTwo.get(0).attribs.style;

      expect(style1).toContain('color: rgb(51, 51, 51);');
      expect(style2).toContain('color: rgb(51, 51, 51);');

      wrapper.update();
      wrapper.find('#yes-tracker-0').simulate('click');

      renderedComponent = wrapper.render();
      targetComponent = renderedComponent.find('#yes-button-0');
      style1 = targetComponent.get(0).attribs.style;
      targetComponentTwo = renderedComponent.find('#no-button-0');
      style2 = targetComponentTwo.get(0).attribs.style;

      expect(style1).toContain('color: rgb(41, 120, 38);');
      expect(style2).toContain('color: rgb(180, 48, 52);');

      allReviews[0].disabled = false;
      wrapper.unmount();
    });
  });

  describe('has a NonNumberFilterSettings component that', () => {
    describe('when the option "Lowest To Highest Rating" is selected, causes', () => {
      test('ReviewsContainer to now contain "Dani"', () => {
        const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });

        store.dispatch(updateReviewAverage(reviewAverage));
        store.dispatch(updateNumberOfReviews(numberOfReviews));
        store.dispatch(updateAllReviews(allReviews));

        wrapper.update();

        let renderedComponent = wrapper.render();
        let targetComponent = renderedComponent.find('#individual-reviews-container');

        let text = targetComponent.text();

        expect(text).toContain('Binx');
        expect(text).toEqual(expect.not.stringContaining('Dani'));

        store.dispatch(updateFilter('LowToHigh'));
        wrapper.update();

        renderedComponent = wrapper.render();
        targetComponent = renderedComponent.find('#individual-reviews-container');

        text = targetComponent.text();

        expect(text).toEqual(expect.not.stringContaining('catdude'));
        expect(text).toContain('Dani');

        wrapper.unmount();
      });
    });

    describe('when the option "Most Helpful" is selected, causes', () => {
      test('ReviewsContainer to now contain "NotACatLady"', () => {
        const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });

        store.dispatch(updateReviewAverage(reviewAverage));
        store.dispatch(updateNumberOfReviews(numberOfReviews));
        store.dispatch(updateAllReviews(allReviews));

        wrapper.update();

        let renderedComponent = wrapper.render();
        let targetComponent = renderedComponent.find('#individual-reviews-container');

        let text = targetComponent.text();

        expect(text).toContain('Binx');
        expect(text).toEqual(expect.not.stringContaining('NotACatLady'));

        store.dispatch(updateFilter('MostHelpful'));
        wrapper.update();

        renderedComponent = wrapper.render();
        targetComponent = renderedComponent.find('#individual-reviews-container');

        text = targetComponent.text();

        expect(text).toEqual(expect.not.stringContaining('Binx'));
        expect(text).toContain('NotACatLady');

        wrapper.unmount();
      });
    });
  });
});
