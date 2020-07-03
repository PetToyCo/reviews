import React from 'react';
import { shallow, mount } from 'enzyme';
import nock from 'nock';
import ReviewsModule from '../../client/src/service.jsx';
import store from '../../client/src/ReduxSpecificComponents/store.js';
import generalData from '../setup/generalData.js';
import storeStartingState from '../setup/storeStartingState.js';
import updateReviewAverage from '../../client/src/ReduxSpecificComponents/Actions/updateReviewAverage.js';
import updateNumberOfReviews from '../../client/src/ReduxSpecificComponents/Actions/updateNumberOfReviews.js';
import updateAllReviews from '../../client/src/ReduxSpecificComponents/Actions/updateAllReviews.js';

const { numberOfReviews, reviewAverage, allReviews } = generalData;

const { Provider } = ReactRedux;

beforeEach(() => {
  const { numberOfReviews, reviewAverage, allReviews } = storeStartingState;

  store.dispatch(updateReviewAverage(reviewAverage));
  store.dispatch(updateNumberOfReviews(numberOfReviews));
  store.dispatch(updateAllReviews(allReviews));
});

nock('http://127.0.0.1:3001')
  .persist()
  .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
  .get('/reviews/100')
  .reply(200, generalData);

describe('The Reviews Module', () => {
  test('renders all its subcomponents', () => {
    const wrapper = shallow(<Provider store={store}><ReviewsModule /></Provider>);
    const renderedComponent = wrapper.render();

    expect(renderedComponent.find('#review-header-component')).toHaveLength(1);
    expect(renderedComponent.find('#review-body-component')).toHaveLength(1);
    expect(renderedComponent.find('#review-reviews-component')).toHaveLength(1);
  });

  test('renders two sets of DynamicReviewStars Components', () => {
    const wrapper = shallow(<Provider store={store}><ReviewsModule /></Provider>);
    const renderedComponent = wrapper.render();

    expect(renderedComponent.find('.dynamic-stars')).toHaveLength(2);
    expect(renderedComponent.find('.empty-stars')).toHaveLength(2);
    expect(renderedComponent.find('.filled-stars')).toHaveLength(2);
  });

  test('correctly updates the store with new state data after components componentDidMount axios call completes', (done) => {
    const wrapper = mount(<Provider store={store}><ReviewsModule /></Provider>);

    setTimeout(() => {
      const renderedComponent = wrapper.render();

      const reviewAverageComponent = renderedComponent.find('#header-upper-review-average');
      const numberOfReviewsComponent = renderedComponent.find('#header-upper-reviews');
      const reviewsContainerComponent = renderedComponent.find('#individual-reviews-container');

      expect(reviewAverageComponent.text()).toBe('3.5');
      expect(numberOfReviewsComponent.text()).toBe('19 Reviews');
      expect(reviewsContainerComponent.text()).toContain('Binx');
      expect(reviewsContainerComponent.text()).toContain('CatButt');
      expect(reviewsContainerComponent.text()).toContain('CVCat');

      done();
    }, 50);
  });

  describe('has a subcomponent Filter that', () => {
    describe('has a <div> tag with id "filter-header-review-range"', () => {
      test('which reads "9-19 of 19 Reviews" once store state updated with intial server data AND nav forward button clicked', () => {
        const wrapper = mount(<Provider store={store}><ReviewsModule /></Provider>, { attachTo: document.body });

        store.dispatch(updateReviewAverage(reviewAverage));
        store.dispatch(updateNumberOfReviews(numberOfReviews));
        store.dispatch(updateAllReviews(allReviews));

        let renderedComponent = wrapper.render();

        let targetComponent = renderedComponent.find('#filter-header-review-range');

        expect(targetComponent.text()).toBe('1-8 of 19 Reviews');

        wrapper.update();
        wrapper.find('#forward-nav-button').simulate('click');

        renderedComponent = wrapper.render();

        targetComponent = renderedComponent.find('#filter-header-review-range');

        expect(targetComponent.text()).toBe('9-19 of 19 Reviews');

        wrapper.unmount();
      });

      test('which reads "1-8 of 19 Reviews" once store state updated with intial server data AND nav forward button clicked FOLLOWED by nav back button being clicked', () => {
        const wrapper = mount(<Provider store={store}><ReviewsModule /></Provider>, { attachTo: document.body });

        store.dispatch(updateReviewAverage(reviewAverage));
        store.dispatch(updateNumberOfReviews(numberOfReviews));
        store.dispatch(updateAllReviews(allReviews));

        let renderedComponent = wrapper.render();

        let targetComponent = renderedComponent.find('#filter-header-review-range');

        expect(targetComponent.text()).toBe('1-8 of 19 Reviews');

        wrapper.update();
        wrapper.find('#forward-nav-button').simulate('click');

        renderedComponent = wrapper.render();

        targetComponent = renderedComponent.find('#filter-header-review-range');

        expect(targetComponent.text()).toBe('9-19 of 19 Reviews');

        wrapper.update();
        wrapper.find('#back-nav-button').simulate('click');

        renderedComponent = wrapper.render();

        targetComponent = renderedComponent.find('#filter-header-review-range');

        expect(targetComponent.text()).toBe('1-8 of 19 Reviews');
        allReviews[0].disabled = false;
        wrapper.unmount();
      });
    });
  });
});
