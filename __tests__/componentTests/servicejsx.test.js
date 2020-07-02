import React from 'react';
import { shallow, mount } from 'enzyme';
import nock from 'nock';
import ReviewsModule from '../../client/src/service.jsx';
import store from '../../client/src/ReduxSpecificComponents/store.js';
import generalData from '../setup/generalData.js';

const { Provider } = ReactRedux;

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
});
