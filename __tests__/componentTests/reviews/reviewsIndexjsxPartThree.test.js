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
  describe('The Helpful component', () => {
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

      let renderedComponent = wrapper.render();
      let targetComponent = renderedComponent.find('#yes-tracker-0');
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
      style  = targetComponent.get(0).attribs.style;

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
      style  = targetComponent.get(0).attribs.style;

      expect(style).toContain('box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, 0.2);');

      wrapper.update();
      wrapper.find('#yes-tracker-0').simulate('mouseout');

      renderedComponent = wrapper.render();
      targetComponent = renderedComponent.find('#yes-tracker-0');
      style  = targetComponent.get(0).attribs.style;

      expect(style).toEqual(expect.not.stringContaining('box-shadow'));

      wrapper.unmount();
    });

    test('has a <div> tag with id "no-tracker-0" that does not normally have a box shadow', () => {
      const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });
      store.dispatch(updateReviewAverage(reviewAverage));
      store.dispatch(updateNumberOfReviews(numberOfReviews));
      store.dispatch(updateAllReviews(allReviews));

      let renderedComponent = wrapper.render();
      let targetComponent = renderedComponent.find('#no-tracker-0');
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
      style  = targetComponent.get(0).attribs.style;

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
      style  = targetComponent.get(0).attribs.style;

      expect(style).toContain('box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, 0.2);');

      wrapper.update();
      wrapper.find('#no-tracker-0').simulate('mouseout');

      renderedComponent = wrapper.render();
      targetComponent = renderedComponent.find('#no-tracker-0');
      style  = targetComponent.get(0).attribs.style;

      expect(style).toEqual(expect.not.stringContaining('box-shadow'));

      wrapper.unmount();
    });

    test('has a <div> tag with id "report-tracker-0" that does not normally have a box shadow', () => {
      const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });
      store.dispatch(updateReviewAverage(reviewAverage));
      store.dispatch(updateNumberOfReviews(numberOfReviews));
      store.dispatch(updateAllReviews(allReviews));

      let renderedComponent = wrapper.render();
      let targetComponent = renderedComponent.find('#report-tracker-0');
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
      style  = targetComponent.get(0).attribs.style;

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
      style  = targetComponent.get(0).attribs.style;

      expect(style).toContain('box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, 0.2);');

      wrapper.update();
      wrapper.find('#report-tracker-0').simulate('mouseout');

      renderedComponent = wrapper.render();
      targetComponent = renderedComponent.find('#report-tracker-0');
      style  = targetComponent.get(0).attribs.style;

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

      wrapper.unmount();
    });
  });
});

// describe('The ReviewHeader component', () => {
//   describe('has a subcomponent ActiveFilters that', () => {
//     it('should not be there initially', () => {
//       const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });

//       const renderedComponent = wrapper.render();
//       const targetComponent = renderedComponent.find('#active-filters-bar');

//       expect(targetComponent).toHaveLength(0);

//       wrapper.unmount();
//     });

//     it('should be there if any number key in the store\'s filter state variable is set to true', () => {
//       const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });

//       let renderedComponent = wrapper.render();
//       let targetComponent = renderedComponent.find('#active-filters-bar');

//       expect(targetComponent).toHaveLength(0);

//       store.dispatch(updateFilter('4', 'ADD'));
//       wrapper.update();

//       renderedComponent = wrapper.render();
//       targetComponent = renderedComponent.find('#active-filters-bar');

//       expect(targetComponent).toHaveLength(1);

//       wrapper.unmount();
//     });

//     it('should disappear when a store\'s filter number state variable set to true, is then set to false', () => {
//       const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });

//       let renderedComponent = wrapper.render();
//       let targetComponent = renderedComponent.find('#active-filters-bar');

//       expect(targetComponent).toHaveLength(0);

//       store.dispatch(updateFilter('4', 'ADD'));
//       wrapper.update();

//       renderedComponent = wrapper.render();
//       targetComponent = renderedComponent.find('#active-filters-bar');

//       expect(targetComponent).toHaveLength(1);

//       store.dispatch(updateFilter('4', 'CANCEL'));
//       wrapper.update();

//       renderedComponent = wrapper.render();
//       targetComponent = renderedComponent.find('#active-filters-bar');

//       expect(targetComponent).toHaveLength(0);

//       wrapper.unmount();
//     });

//     it('should disappear when a store\'s filter number state variable set to true, is then set to false', () => {
//       const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });

//       let renderedComponent = wrapper.render();
//       let targetComponent = renderedComponent.find('#active-filters-bar');

//       expect(targetComponent).toHaveLength(0);

//       store.dispatch(updateFilter('4', 'ADD'));
//       wrapper.update();

//       renderedComponent = wrapper.render();
//       targetComponent = renderedComponent.find('#active-filters-bar');

//       expect(targetComponent).toHaveLength(1);

//       store.dispatch(updateFilter('4', 'CANCEL'));
//       wrapper.update();

//       renderedComponent = wrapper.render();
//       targetComponent = renderedComponent.find('#active-filters-bar');

//       expect(targetComponent).toHaveLength(0);

//       wrapper.unmount();
//     });

//     it('should disappear when multiple number state variables are set to true, and the "Clear All" button is clicked', () => {
//       const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });

//       let renderedComponent = wrapper.render();
//       let targetComponent = renderedComponent.find('#active-filters-bar');

//       expect(targetComponent).toHaveLength(0);

//       store.dispatch(updateFilter('4', 'ADD'));
//       store.dispatch(updateFilter('3', 'ADD'));
//       wrapper.update();

//       renderedComponent = wrapper.render();
//       targetComponent = renderedComponent.find('#active-filters-bar');

//       expect(targetComponent).toHaveLength(1);

//       store.dispatch(updateFilter('4', 'CANCEL'));
//       wrapper.update();

//       renderedComponent = wrapper.render();
//       targetComponent = renderedComponent.find('#active-filters-bar');

//       expect(targetComponent).toHaveLength(1);

//       store.dispatch(updateFilter('4', 'ADD'));

//       wrapper.update();
//       wrapper.find('#clear-all-number-filters').simulate('click');

//       wrapper.update();

//       renderedComponent = wrapper.render();
//       targetComponent = renderedComponent.find('#active-filters-bar');

//       expect(targetComponent).toHaveLength(0);

//       wrapper.unmount();
//     });
//   });

//   describe('has a NonNumberFilterSettings component that', () => {
//     describe('when the option "Highest To Lowest Rating" is selected, causes', () => {
//       test('"dotted-target" to now read "Highest to Lowest Rating"', () => {
//         const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });

//         let renderedComponent = wrapper.render();
//         let targetComponent = renderedComponent.find('#dotted-target');

//         expect(targetComponent.text()).toBe('Most Recent');

//         store.dispatch(updateFilter('HighToLow'));
//         wrapper.update();

//         renderedComponent = wrapper.render();
//         targetComponent = renderedComponent.find('#dotted-target');

//         expect(targetComponent.text()).toBe('Highest To Lowest Rating');

//         wrapper.unmount();
//       });

//       test('ReviewsContainer to now contain "catdude"', () => {
//         const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });

//         store.dispatch(updateReviewAverage(reviewAverage));
//         store.dispatch(updateNumberOfReviews(numberOfReviews));
//         store.dispatch(updateAllReviews(allReviews));

//         wrapper.update();

//         let renderedComponent = wrapper.render();
//         let targetComponent = renderedComponent.find('#individual-reviews-container');

//         let text = targetComponent.text();

//         expect(text).toContain('Binx');
//         expect(text).toEqual(expect.not.stringContaining('catdude'));

//         store.dispatch(updateFilter('HighToLow'));
//         wrapper.update();

//         renderedComponent = wrapper.render();
//         targetComponent = renderedComponent.find('#individual-reviews-container');

//         text = targetComponent.text();

//         expect(text).toEqual(expect.not.stringContaining('Binx'));
//         expect(text).toContain('catdude');

//         wrapper.unmount();
//       });
//     });

//     describe('has a subcomponent RatingsFilter that', () => {
//       it('should not be there initially', () => {
//         const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });

//         const renderedComponent = wrapper.render();
//         const targetComponent = renderedComponent.find('#score-ratings-filter');

//         expect(targetComponent).toHaveLength(0);

//         wrapper.unmount();
//       });

//       it('should be there after "btn-number-filter-expansion" is clicked', () => {
//         const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });

//         let renderedComponent = wrapper.render();
//         let targetComponent = renderedComponent.find('#score-ratings-filter');

//         expect(targetComponent).toHaveLength(0);

//         wrapper.find('#btn-number-filter-expansion').simulate('click');
//         wrapper.update();

//         renderedComponent = wrapper.render();
//         targetComponent = renderedComponent.find('#score-ratings-filter');

//         expect(targetComponent).toHaveLength(1);

//         wrapper.unmount();
//       });

//       test('causes ReviewsContainer to now contain "Dani" after filter by one is selected', () => {
//         const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });

//         store.dispatch(updateReviewAverage(reviewAverage));
//         store.dispatch(updateNumberOfReviews(numberOfReviews));
//         store.dispatch(updateAllReviews(allReviews));

//         wrapper.update();

//         let renderedComponent = wrapper.render();
//         let targetComponent = renderedComponent.find('#individual-reviews-container');

//         let text = targetComponent.text();

//         expect(text).toContain('Binx');
//         expect(text).toContain('Allison');
//         expect(text).toEqual(expect.not.stringContaining('Dani'));

//         store.dispatch(updateFilter('1', 'ADD'));
//         wrapper.update();

//         renderedComponent = wrapper.render();
//         targetComponent = renderedComponent.find('#individual-reviews-container');

//         text = targetComponent.text();

//         expect(text).toEqual(expect.not.stringContaining('Binx'));
//         expect(text).toContain('Allison');
//         expect(text).toContain('Dani');

//         wrapper.unmount();
//       });

//       it('has an annoyingly large amount of functionality', (done) => {
//         const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });

//         store.dispatch(updateShowRatingFilter(true));

//         let renderedComponent = wrapper.render();
//         let targetComponent = renderedComponent.find('#score-ratings-filter-menu');

//         expect(targetComponent).toHaveLength(0);

//         wrapper.update();
//         wrapper.find('#score-ratings-filter-trigger').simulate('mouseover');

//         renderedComponent = wrapper.render();
//         targetComponent = renderedComponent.find('#score-ratings-filter-menu');

//         expect(targetComponent).toHaveLength(0);

//         setTimeout(() => {
//           wrapper.update();

//           renderedComponent = wrapper.render();
//           targetComponent = renderedComponent.find('#score-ratings-filter-menu');

//           expect(targetComponent).toHaveLength(1);

//           wrapper.update();
//           wrapper.find('#score-ratings-filter-trigger').simulate('mouseout');

//           renderedComponent = wrapper.render();
//           targetComponent = renderedComponent.find('#score-ratings-filter-menu');

//           expect(targetComponent).toHaveLength(1);

//           setTimeout(() => {
//             wrapper.update();

//             renderedComponent = wrapper.render();
//             targetComponent = renderedComponent.find('#score-ratings-filter-menu');

//             expect(targetComponent).toHaveLength(0);

//             store.dispatch(updateShowRatingFilterDropDown(true));

//             wrapper.update();

//             renderedComponent = wrapper.render();
//             targetComponent = renderedComponent.find('#score-ratings-filter-menu');

//             expect(targetComponent).toHaveLength(1);

//             wrapper.find('#score-ratings-filter-trigger').simulate('mouseout');
//             wrapper.find('#score-ratings-filter-trigger').simulate('mouseover');

//             setTimeout(() => {
//               wrapper.update();

//               renderedComponent = wrapper.render();
//               targetComponent = renderedComponent.find('#score-ratings-filter-menu');

//               expect(targetComponent).toHaveLength(1);

//               wrapper.find('#score-ratings-filter-trigger').simulate('mouseout');
//               wrapper.find('#score-ratings-filter-menu').simulate('mouseover');

//               setTimeout(() => {
//                 wrapper.update();

//                 renderedComponent = wrapper.render();
//                 targetComponent = renderedComponent.find('#score-ratings-filter-menu');

//                 expect(targetComponent).toHaveLength(1);

//                 wrapper.find('#score-ratings-filter-menu').simulate('mouseout');
//                 wrapper.find('#score-ratings-filter-menu').simulate('mouseover');

//                 setTimeout(() => {
//                   wrapper.update();

//                   renderedComponent = wrapper.render();
//                   targetComponent = renderedComponent.find('#score-ratings-filter-menu');

//                   expect(targetComponent).toHaveLength(1);

//                   wrapper.find('#score-ratings-filter-menu').simulate('mouseout');

//                   wrapper.update();

//                   renderedComponent = wrapper.render();
//                   targetComponent = renderedComponent.find('#score-ratings-filter-menu');

//                   expect(targetComponent).toHaveLength(1);

//                   setTimeout(() => {
//                     wrapper.update();

//                     renderedComponent = wrapper.render();
//                     targetComponent = renderedComponent.find('#score-ratings-filter-menu');

//                     expect(targetComponent).toHaveLength(0);

//                     wrapper.unmount();
//                     done();
//                   }, 310);
//                 }, 310);
//               }, 260);
//             }, 260);
//           }, 260);
//         }, 160);
//       });
//     });
//   });
// });
