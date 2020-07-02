import React from 'react';
import { shallow, mount } from 'enzyme';
import generalData from '../../setup/generalData.js';
import storeStartingState from '../../setup/storeStartingState.js';
import store from '../../../client/src/ReduxSpecificComponents/store.js';
import ReviewHeader from '../../../client/src/Components/ReviewHeader/index.jsx';
import updateReviewAverage from '../../../client/src/ReduxSpecificComponents/Actions/updateReviewAverage.js';
import updateNumberOfReviews from '../../../client/src/ReduxSpecificComponents/Actions/updateNumberOfReviews.js';

const { Provider } = ReactRedux;

const { numberOfReviews, reviewAverage } = generalData;

beforeEach(() => {
  const { numberOfReviews, reviewAverage } = storeStartingState;
  store.dispatch(updateReviewAverage(reviewAverage));
  store.dispatch(updateNumberOfReviews(numberOfReviews));
});

describe('The ReviewHeader component', () => {
  test('renders all its subcomponents', () => {
    const wrapper = shallow(<Provider store={store}><ReviewHeader /></Provider>);
    const renderedComponent = wrapper.render();

    expect(renderedComponent.find('.dynamic-stars')).toHaveLength(1);
  });

  test('correctly renders text that is determined by store\'s current state', (done) => {
    const wrapper = mount(<Provider store={store}><ReviewHeader /></Provider>);

    store.dispatch(updateReviewAverage(reviewAverage));
    store.dispatch(updateNumberOfReviews(numberOfReviews));

    setTimeout(() => {
      const renderedComponent = wrapper.render();

      const reviewAverageComponent = renderedComponent.find('#header-upper-review-average');
      const firstNumberOfReviewsComponent = renderedComponent.find('#header-upper-reviews');
      const secondNumberOfReviewsComponent = renderedComponent.find('#item-value-reviews');

      expect(reviewAverageComponent.text()).toBe('3.5');
      expect(firstNumberOfReviewsComponent.text()).toBe('19 Reviews');
      expect(secondNumberOfReviewsComponent.text()).toBe('19');

      done();
    }, 50);
  });

  describe('has an <span> tag with id "item-link-reviews" that', () => {
    test('has a starting text color of rgb(0, 88, 145)', () => {
      const wrapper = mount(<Provider store={store}><ReviewHeader /></Provider>);
      const renderedComponent = wrapper.render();

      const targetComponent = renderedComponent.find('#item-link-reviews');
      const { style } = targetComponent.get(0).attribs;

      expect(style).toContain('color: rgb(0, 88, 145);');
    });

    test('has a text color that changes to rgb(0, 156, 217) on mouseover', () => {
      const wrapper = mount(<Provider store={store}><ReviewHeader /></Provider>, { attachTo: document.body });
      let renderedComponent = wrapper.render();

      let targetComponent = renderedComponent.find('#item-link-reviews');
      let { style } = targetComponent.get(0).attribs;

      expect(style).toContain('color: rgb(0, 88, 145);');

      wrapper.find('#item-link-reviews').simulate('mouseover');
      renderedComponent = wrapper.render();

      targetComponent = renderedComponent.find('#item-link-reviews');
      style = targetComponent.get(0).attribs.style;

      expect(style).toContain('color: rgb(0, 156, 217);');

      wrapper.unmount();
    });

    test('has a text color that changes back to rgb(0, 88, 145) on mouseout', () => {
      const wrapper = mount(<Provider store={store}><ReviewHeader /></Provider>, { attachTo: document.body });
      let renderedComponent = wrapper.render();

      let targetComponent = renderedComponent.find('#item-link-reviews');
      let { style } = targetComponent.get(0).attribs;

      expect(style).toContain('color: rgb(0, 88, 145);');

      wrapper.find('#item-link-reviews').simulate('mouseover');
      renderedComponent = wrapper.render();

      targetComponent = renderedComponent.find('#item-link-reviews');
      style = targetComponent.get(0).attribs.style;

      expect(style).toContain('color: rgb(0, 156, 217);');

      wrapper.find('#item-link-reviews').simulate('mouseout');
      renderedComponent = wrapper.render();

      targetComponent = renderedComponent.find('#item-link-reviews');
      style = targetComponent.get(0).attribs.style;

      expect(style).toContain('color: rgb(0, 88, 145);');

      wrapper.unmount();
    });
  });

  describe('has an <span> tag with id "item-link-questions" that', () => {
    test('has a starting text color of rgb(0, 88, 145)', () => {
      const wrapper = mount(<Provider store={store}><ReviewHeader /></Provider>);
      const renderedComponent = wrapper.render();

      const targetComponent = renderedComponent.find('#item-link-questions');
      const { style } = targetComponent.get(0).attribs;

      expect(style).toContain('color: rgb(0, 88, 145);');
    });

    test('has a text color that changes to rgb(0, 156, 217) on mouseover', () => {
      const wrapper = mount(<Provider store={store}><ReviewHeader /></Provider>, { attachTo: document.body });
      let renderedComponent = wrapper.render();

      let targetComponent = renderedComponent.find('#item-link-questions');
      let { style } = targetComponent.get(0).attribs;

      expect(style).toContain('color: rgb(0, 88, 145);');

      wrapper.find('#item-link-questions').simulate('mouseover');
      renderedComponent = wrapper.render();

      targetComponent = renderedComponent.find('#item-link-questions');
      style = targetComponent.get(0).attribs.style;

      expect(style).toContain('color: rgb(0, 156, 217);');

      wrapper.unmount();
    });

    test('has a text color that changes back to rgb(0, 88, 145) on mouseout', () => {
      const wrapper = mount(<Provider store={store}><ReviewHeader /></Provider>, { attachTo: document.body });
      let renderedComponent = wrapper.render();

      let targetComponent = renderedComponent.find('#item-link-questions');
      let { style } = targetComponent.get(0).attribs;

      expect(style).toContain('color: rgb(0, 88, 145);');

      wrapper.find('#item-link-questions').simulate('mouseover');
      renderedComponent = wrapper.render();

      targetComponent = renderedComponent.find('#item-link-questions');
      style = targetComponent.get(0).attribs.style;

      expect(style).toContain('color: rgb(0, 156, 217);');

      wrapper.find('#item-link-questions').simulate('mouseout');
      renderedComponent = wrapper.render();

      targetComponent = renderedComponent.find('#item-link-questions');
      style = targetComponent.get(0).attribs.style;

      expect(style).toContain('color: rgb(0, 88, 145);');

      wrapper.unmount();
    });
  });

  describe('has an <span> tag with id "item-link-answers" that', () => {
    test('has a starting text color of rgb(0, 88, 145)', () => {
      const wrapper = mount(<Provider store={store}><ReviewHeader /></Provider>);
      const renderedComponent = wrapper.render();

      const targetComponent = renderedComponent.find('#item-link-answers');
      const { style } = targetComponent.get(0).attribs;

      expect(style).toContain('color: rgb(0, 88, 145);');
    });

    test('has a text color that changes to rgb(0, 156, 217) on mouseover', () => {
      const wrapper = mount(<Provider store={store}><ReviewHeader /></Provider>, { attachTo: document.body });
      let renderedComponent = wrapper.render();

      let targetComponent = renderedComponent.find('#item-link-answers');
      let { style } = targetComponent.get(0).attribs;

      expect(style).toContain('color: rgb(0, 88, 145);');

      wrapper.find('#item-link-answers').simulate('mouseover');
      renderedComponent = wrapper.render();

      targetComponent = renderedComponent.find('#item-link-answers');
      style = targetComponent.get(0).attribs.style;

      expect(style).toContain('color: rgb(0, 156, 217);');

      wrapper.unmount();
    });

    test('has a text color that changes back to rgb(0, 88, 145) on mouseout', () => {
      const wrapper = mount(<Provider store={store}><ReviewHeader /></Provider>, { attachTo: document.body });
      let renderedComponent = wrapper.render();

      let targetComponent = renderedComponent.find('#item-link-answers');
      let { style } = targetComponent.get(0).attribs;

      expect(style).toContain('color: rgb(0, 88, 145);');

      wrapper.find('#item-link-answers').simulate('mouseover');
      renderedComponent = wrapper.render();

      targetComponent = renderedComponent.find('#item-link-answers');
      style = targetComponent.get(0).attribs.style;

      expect(style).toContain('color: rgb(0, 156, 217);');

      wrapper.find('#item-link-answers').simulate('mouseout');
      renderedComponent = wrapper.render();

      targetComponent = renderedComponent.find('#item-link-answers');
      style = targetComponent.get(0).attribs.style;

      expect(style).toContain('color: rgb(0, 88, 145);');

      wrapper.unmount();
    });
  });

  describe('has an <a> tag with id "header-upper-reviews" that', () => {
    test('has a starting text color of rgb(0, 88, 145)', () => {
      const wrapper = mount(<Provider store={store}><ReviewHeader /></Provider>);
      const renderedComponent = wrapper.render();

      const targetComponent = renderedComponent.find('#header-upper-reviews');
      const { style } = targetComponent.get(0).attribs;

      expect(style).toContain('color: rgb(0, 88, 145);');
    });

    test('has a text color that changes to rgb(0, 156, 217) on mouseover', () => {
      const wrapper = mount(<Provider store={store}><ReviewHeader /></Provider>, { attachTo: document.body });
      let renderedComponent = wrapper.render();

      let targetComponent = renderedComponent.find('#header-upper-reviews');
      let { style } = targetComponent.get(0).attribs;

      expect(style).toContain('color: rgb(0, 88, 145);');

      wrapper.find('#header-upper-reviews').simulate('mouseover');
      renderedComponent = wrapper.render();

      targetComponent = renderedComponent.find('#header-upper-reviews');
      style = targetComponent.get(0).attribs.style;

      expect(style).toContain('color: rgb(0, 156, 217);');

      wrapper.unmount();
    });

    test('has a text color that changes back to rgb(0, 88, 145) on mouseout', () => {
      const wrapper = mount(<Provider store={store}><ReviewHeader /></Provider>, { attachTo: document.body });
      let renderedComponent = wrapper.render();

      let targetComponent = renderedComponent.find('#header-upper-reviews');
      let { style } = targetComponent.get(0).attribs;

      expect(style).toContain('color: rgb(0, 88, 145);');

      wrapper.find('#header-upper-reviews').simulate('mouseover');
      renderedComponent = wrapper.render();

      targetComponent = renderedComponent.find('#header-upper-reviews');
      style = targetComponent.get(0).attribs.style;

      expect(style).toContain('color: rgb(0, 156, 217);');

      wrapper.find('#header-upper-reviews').simulate('mouseout');
      renderedComponent = wrapper.render();

      targetComponent = renderedComponent.find('#header-upper-reviews');
      style = targetComponent.get(0).attribs.style;

      expect(style).toContain('color: rgb(0, 88, 145);');

      wrapper.unmount();
    });
  });

  describe('has an <button> tag with id "magnifying-glass" that', () => {
    test('has a background image with url http://127.0.0.1:3001/searchMagnifyingGlass.png', () => {
      const wrapper = mount(<Provider store={store}><ReviewHeader /></Provider>);
      const renderedComponent = wrapper.render();

      const targetComponent = renderedComponent.find('#magnifying-glass');
      const { style } = targetComponent.get(0).attribs;

      expect(style).toContain('background-image: url(http://127.0.0.1:3001/searchMagnifyingGlass.png);');
    });

    test('has a background image url that changes to http://127.0.0.1:3001/searchMagnifyingGlassHover.png on mouseover', () => {
      const wrapper = mount(<Provider store={store}><ReviewHeader /></Provider>, { attachTo: document.body });
      let renderedComponent = wrapper.render();

      let targetComponent = renderedComponent.find('#magnifying-glass');
      let { style } = targetComponent.get(0).attribs;

      expect(style).toContain('background-image: url(http://127.0.0.1:3001/searchMagnifyingGlass.png);');

      wrapper.find('#magnifying-glass').simulate('mouseover');
      renderedComponent = wrapper.render();

      targetComponent = renderedComponent.find('#magnifying-glass');
      style = targetComponent.get(0).attribs.style;

      expect(style).toContain('background-image: url(http://127.0.0.1:3001/searchMagnifyingGlassHover.png);');

      wrapper.unmount();
    });

    test('has a background image url that changes back to http://127.0.0.1:3001/searchMagnifyingGlass.png on mouseout', () => {
      const wrapper = mount(<Provider store={store}><ReviewHeader /></Provider>, { attachTo: document.body });
      let renderedComponent = wrapper.render();

      let targetComponent = renderedComponent.find('#magnifying-glass');
      let { style } = targetComponent.get(0).attribs;

      expect(style).toContain('background-image: url(http://127.0.0.1:3001/searchMagnifyingGlass.png);');

      wrapper.find('#magnifying-glass').simulate('mouseover');
      renderedComponent = wrapper.render();

      targetComponent = renderedComponent.find('#magnifying-glass');
      style = targetComponent.get(0).attribs.style;

      expect(style).toContain('background-image: url(http://127.0.0.1:3001/searchMagnifyingGlassHover.png);');

      wrapper.find('#magnifying-glass').simulate('mouseout');
      renderedComponent = wrapper.render();

      targetComponent = renderedComponent.find('#magnifying-glass');
      style = targetComponent.get(0).attribs.style;

      expect(style).toContain('background-image: url(http://127.0.0.1:3001/searchMagnifyingGlass.png);');

      wrapper.unmount();
    });
  });
});
