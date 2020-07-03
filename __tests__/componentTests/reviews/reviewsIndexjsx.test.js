import React from 'react';
import { shallow, mount } from 'enzyme';
import generalData from '../../setup/generalData.js';
import storeStartingState from '../../setup/storeStartingState.js';
import store from '../../../client/src/ReduxSpecificComponents/store.js';
import Reviews from '../../../client/src/Components/Reviews/index.jsx';
import updateReviewAverage from '../../../client/src/ReduxSpecificComponents/Actions/updateReviewAverage.js';
import updateNumberOfReviews from '../../../client/src/ReduxSpecificComponents/Actions/updateNumberOfReviews.js';
import updateAllReviews from '../../../client/src/ReduxSpecificComponents/Actions/updateAllReviews.js';
import updateShowNonNumberFilterSetting from '../../../client/src/ReduxSpecificComponents/Actions/updateShowNonNumberFilterSetting.js';

const { Provider } = ReactRedux;

const { numberOfReviews, reviewAverage, allReviews } = generalData;

beforeEach(() => {
  const {
    numberOfReviews,
    reviewAverage,
    allReviews,
    showNonNumberFilterSetting,
  } = storeStartingState;
  store.dispatch(updateReviewAverage(reviewAverage));
  store.dispatch(updateNumberOfReviews(numberOfReviews));
  store.dispatch(updateAllReviews(allReviews));
  store.dispatch(updateShowNonNumberFilterSetting(showNonNumberFilterSetting));
});

describe('The ReviewHeader component', () => {
  test('renders only 3 subcomponents when state is in its default state', () => {
    const wrapper = shallow(<Provider store={store}><Reviews /></Provider>);
    const renderedComponent = wrapper.render();

    expect(renderedComponent.find('#filter-header')).toHaveLength(1);
    expect(renderedComponent.find('#review-calculate-filtered-reviews')).toHaveLength(1);
    expect(renderedComponent.find('#individual-reviews-container')).toHaveLength(1);
    expect(renderedComponent.find('#review-navigation-bar')).toHaveLength(0);
    expect(renderedComponent.find('#non-number-filter-menu')).toHaveLength(0);
  });

  test('renders only 4 subcomponents once store has received data from server', () => {
    const wrapper = mount(<Provider store={store}><Reviews /></Provider>);

    store.dispatch(updateReviewAverage(reviewAverage));
    store.dispatch(updateNumberOfReviews(numberOfReviews));
    store.dispatch(updateAllReviews(allReviews));

    const renderedComponent = wrapper.render();

    expect(renderedComponent.find('#filter-header')).toHaveLength(1);
    expect(renderedComponent.find('#review-calculate-filtered-reviews')).toHaveLength(1);
    expect(renderedComponent.find('#individual-reviews-container')).toHaveLength(1);
    expect(renderedComponent.find('#review-navigation-bar')).toHaveLength(1);
    expect(renderedComponent.find('#non-number-filter-menu')).toHaveLength(0);
  });

  test('renders all 5 subcomponents once store has received data from server AND showNonNumberFilterSetting set to true', () => {
    const wrapper = mount(<Provider store={store}><Reviews /></Provider>);

    store.dispatch(updateReviewAverage(reviewAverage));
    store.dispatch(updateNumberOfReviews(numberOfReviews));
    store.dispatch(updateAllReviews(allReviews));
    store.dispatch(updateShowNonNumberFilterSetting(true));

    const renderedComponent = wrapper.render();

    expect(renderedComponent.find('#filter-header')).toHaveLength(1);
    expect(renderedComponent.find('#review-calculate-filtered-reviews')).toHaveLength(1);
    expect(renderedComponent.find('#individual-reviews-container')).toHaveLength(1);
    expect(renderedComponent.find('#review-navigation-bar')).toHaveLength(1);
    expect(renderedComponent.find('#non-number-filter-menu')).toHaveLength(1);
  });

  describe('has a subcomponent Filter that', () => {
    describe('has a <div> tag with id "filter-header-review-range"', () => {
      test('which reads "" initially', () => {
        const wrapper = shallow(<Provider store={store}><Reviews /></Provider>);
        const renderedComponent = wrapper.render();

        const targetComponent = renderedComponent.find('#filter-header-review-range');

        expect(targetComponent.text()).toBe('');
      });

      test('which reads "1-8 of 19 Reviews" once store state updated with intial server data', () => {
        const wrapper = mount(<Provider store={store}><Reviews /></Provider>);

        store.dispatch(updateReviewAverage(reviewAverage));
        store.dispatch(updateNumberOfReviews(numberOfReviews));
        store.dispatch(updateAllReviews(allReviews));

        const renderedComponent = wrapper.render();

        const targetComponent = renderedComponent.find('#filter-header-review-range');

        expect(targetComponent.text()).toBe('1-8 of 19 Reviews');
      });
    });

    describe('has a <div> tag with id "dotted-target"', () => {
      test('which reads "Most Recent" initially', () => {
        const wrapper = shallow(<Provider store={store}><Reviews /></Provider>);
        const renderedComponent = wrapper.render();

        const targetComponent = renderedComponent.find('#dotted-target');

        expect(targetComponent.text()).toBe('Most Recent');
      });

      test('which doesn\'t make its drop down menu appear immediately after mouseover', () => {
        const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });

        wrapper.find('#dotted-target').simulate('mouseover');

        const renderedComponent = wrapper.render();

        const targetComponent = renderedComponent.find('#non-number-filter-menu');

        expect(targetComponent).toHaveLength(0);

        wrapper.unmount();
      });

      test('which does make its drop down menu appear after 150ms, after mouseover', (done) => {
        const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });

        wrapper.find('#dotted-target').simulate('mouseover');

        let renderedComponent = wrapper.render();

        let targetComponent = renderedComponent.find('#non-number-filter-menu');

        expect(targetComponent).toHaveLength(0);

        setTimeout(() => {
          wrapper.update();

          renderedComponent = wrapper.render();
          targetComponent = renderedComponent.find('#non-number-filter-menu');

          expect(targetComponent).toHaveLength(1);

          wrapper.unmount();
          done();
        }, 160);
      });

      test('which doesn\'t make its drop down menu appear after 150ms, after mouseover, if mouseout occurs first', (done) => {
        const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });

        wrapper.find('#dotted-target').simulate('mouseover');

        let renderedComponent = wrapper.render();

        let targetComponent = renderedComponent.find('#non-number-filter-menu');

        expect(targetComponent).toHaveLength(0);

        wrapper.update();
        wrapper.find('#dotted-target').simulate('mouseout');

        setTimeout(() => {
          wrapper.update();

          renderedComponent = wrapper.render();
          targetComponent = renderedComponent.find('#non-number-filter-menu');

          expect(targetComponent).toHaveLength(0);

          wrapper.unmount();
          done();
        }, 160);
      });

      test('which, after its drop down menu appears, doesn\'t cause it to disappear immediately after mouseout', (done) => {
        const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });

        wrapper.find('#dotted-target').simulate('mouseover');

        let renderedComponent = wrapper.render();

        let targetComponent = renderedComponent.find('#non-number-filter-menu');

        expect(targetComponent).toHaveLength(0);

        setTimeout(() => {
          wrapper.update();

          renderedComponent = wrapper.render();
          targetComponent = renderedComponent.find('#non-number-filter-menu');

          expect(targetComponent).toHaveLength(1);

          wrapper.update();
          wrapper.find('#dotted-target').simulate('mouseout');

          renderedComponent = wrapper.render();
          targetComponent = renderedComponent.find('#non-number-filter-menu');

          expect(targetComponent).toHaveLength(1);

          wrapper.unmount();
          done();
        }, 160);
      });

      test('which, after its drop down menu appears, does cause it to disappear after 250ms, after mouseout', (done) => {
        const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });

        wrapper.find('#dotted-target').simulate('mouseover');

        let renderedComponent = wrapper.render();

        let targetComponent = renderedComponent.find('#non-number-filter-menu');

        expect(targetComponent).toHaveLength(0);

        setTimeout(() => {
          wrapper.update();

          renderedComponent = wrapper.render();
          targetComponent = renderedComponent.find('#non-number-filter-menu');

          expect(targetComponent).toHaveLength(1);

          wrapper.update();
          wrapper.find('#dotted-target').simulate('mouseout');

          setTimeout(() => {
            wrapper.update();

            renderedComponent = wrapper.render();
            targetComponent = renderedComponent.find('#non-number-filter-menu');

            expect(targetComponent).toHaveLength(0);

            wrapper.unmount();
            done();
          }, 260);
        }, 160);
      });

      test('which, after its drop down menu appears, doesn\'t cause it to disappear after 250ms, after mouseout, IF mouseover the drop down', (done) => {
        const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });

        wrapper.find('#dotted-target').simulate('mouseover');

        let renderedComponent = wrapper.render();

        let targetComponent = renderedComponent.find('#non-number-filter-menu');

        expect(targetComponent).toHaveLength(0);

        setTimeout(() => {
          wrapper.update();

          renderedComponent = wrapper.render();
          targetComponent = renderedComponent.find('#non-number-filter-menu');

          expect(targetComponent).toHaveLength(1);

          wrapper.update();
          wrapper.find('#dotted-target').simulate('mouseout');
          wrapper.find('#non-number-filter-menu').simulate('mouseover');

          setTimeout(() => {
            wrapper.update();

            renderedComponent = wrapper.render();
            targetComponent = renderedComponent.find('#non-number-filter-menu');

            expect(targetComponent).toHaveLength(1);

            wrapper.unmount();
            done();
          }, 260);
        }, 160);
      });
    });
  });

  describe('has a NonNumberFilterSettings component that', () => {
    test('doesn\'t disappear immediately after mouseout', (done) => {
      const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });

      wrapper.find('#dotted-target').simulate('mouseover');

      setTimeout(() => {
        wrapper.update();

        let renderedComponent = wrapper.render();
        let targetComponent = renderedComponent.find('#non-number-filter-menu');

        expect(targetComponent).toHaveLength(1);

        wrapper.update();
        wrapper.find('#dotted-target').simulate('mouseout');
        wrapper.find('#non-number-filter-menu').simulate('mouseover');

        setTimeout(() => {
          wrapper.update();
          wrapper.find('#non-number-filter-menu').simulate('mouseout');
          wrapper.update();

          renderedComponent = wrapper.render();
          targetComponent = renderedComponent.find('#non-number-filter-menu');

          expect(targetComponent).toHaveLength(1);

          wrapper.unmount();
          done();
        }, 50);
      }, 160);
    });

    test('does disappear after mouseout, after 250ms', (done) => {
      setTimeout(() => {
        const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });

        wrapper.find('#dotted-target').simulate('mouseover');

        setTimeout(() => {
          wrapper.update();

          let renderedComponent = wrapper.render();
          let targetComponent = renderedComponent.find('#non-number-filter-menu');

          expect(targetComponent).toHaveLength(1);

          wrapper.update();
          wrapper.find('#dotted-target').simulate('mouseout');
          wrapper.find('#non-number-filter-menu').simulate('mouseover');

          setTimeout(() => {
            wrapper.update();
            wrapper.find('#non-number-filter-menu').simulate('mouseout');

            setTimeout(() => {
              wrapper.update();

              renderedComponent = wrapper.render();
              targetComponent = renderedComponent.find('#non-number-filter-menu');

              expect(targetComponent).toHaveLength(0);

              wrapper.unmount();
              done();
            }, 260);
          }, 50);
        }, 160);
      }, 200);
    });

    test('doesn\'t disappear after mouseout, after 250ms, if mouseover occurs again', (done) => {
      setTimeout(() => {
        const wrapper = mount(<Provider store={store}><Reviews /></Provider>, { attachTo: document.body });

        wrapper.find('#dotted-target').simulate('mouseover');

        setTimeout(() => {
          wrapper.update();

          let renderedComponent = wrapper.render();
          let targetComponent = renderedComponent.find('#non-number-filter-menu');

          expect(targetComponent).toHaveLength(1);

          wrapper.update();
          wrapper.find('#dotted-target').simulate('mouseout');
          wrapper.find('#non-number-filter-menu').simulate('mouseover');

          setTimeout(() => {
            wrapper.update();
            wrapper.find('#non-number-filter-menu').simulate('mouseout');

            setTimeout(() => {
              wrapper.update();

              renderedComponent = wrapper.render();
              targetComponent = renderedComponent.find('#non-number-filter-menu');

              expect(targetComponent).toHaveLength(0);

              wrapper.unmount();
              done();
            }, 260);
          }, 50);
        }, 160);
      }, 200);
    });
  });
});
