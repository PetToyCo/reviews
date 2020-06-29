// const { render } = require('@testing-library/react');
// const { toBeInTheDocument } = require('@testing-library/jest-dom');
import ReviewsModule from '../../client/src/service.jsx';
import store from '../../client/src/ReduxSpecificComponents/store.js';

const { expect } = chai;
const { Provider } = ReactRedux;

xhook.before((req, res) => {
  return res({
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    text: '{"reviewAverage":"3.5","numberOfReviews":19,"allReviews":[{"score":5,"date":"2020-05-06T22:07:57.603Z","review":"Morbi commodo justo tortor, malesuada imperdiet justo condimentum eget. Nam fringilla orci dui, non semper nisl venenatis eget. Phasellus nec.","username":"ChonkyCat","recommended":true,"yeses":5,"noes":1,"verified":true,"promotion":false},{"score":5,"date":"2018-07-06T22:07:57.603Z","review":"Suspendisse bibendum lectus sit amet ante auctor consequat. Sed malesuada urna erat, tempus sollicitudin augue porttitor sit amet. Duis viverra.","username":"Froggy","recommended":true,"yeses":1,"noes":1,"verified":true,"promotion":true},{"score":5,"date":"2020-03-15T22:07:57.603Z","review":"Suspendisse bibendum lectus sit amet ante auctor consequat. Sed malesuada urna erat, tempus sollicitudin augue porttitor sit amet. Duis viverra.","username":"CatButt","recommended":true,"yeses":0,"noes":0,"verified":false,"promotion":true},{"score":5,"date":"2019-05-06T22:07:57.603Z","review":"Mauris eget libero ex. Nulla facilisis luctus maximus. Proin eget euismod orci. Cras finibus, magna.","username":"TummyScratcher","recommended":true,"yeses":0,"noes":0,"verified":true,"promotion":false},{"score":5,"date":"2019-12-06T22:07:57.603Z","review":"Aenean semper nunc ac consectetur vestibulum. Morbi et quam placerat, tincidunt lectus in, aliquam sapien. Fusce ultrices nibh in sapien imperdiet, nec semper urna consectetur. Proin accumsan nec mauris ac vehicula. In hac habitasse platea.","username":"NotACatLady","recommended":true,"yeses":0,"noes":0,"verified":true,"promotion":false},{"score":5,"date":"2019-01-30T22:07:57.603Z","review":"Suspendisse arcu dolor, hendrerit ultrices lacus et, vulputate finibus nulla. Cras enim augue, molestie vitae arcu fermentum, commodo egestas nunc. Curabitur massa tellus, iaculis in turpis nec, rutrum scelerisque turpis. Donec mattis, lorem.","username":"PikaPika","recommended":true,"yeses":0,"noes":0,"verified":true,"promotion":true},{"score":4,"date":"2020-01-21T21:07:57.603Z","review":"Nullam accumsan metus justo, non semper quam iaculis vel. Proin in eros lacus. Integer at velit.","username":"CVCat","recommended":true,"yeses":2,"noes":0,"verified":true,"promotion":false},{"score":5,"date":"2020-01-06T22:07:57.603Z","review":"Nunc ex massa, porttitor pulvinar pharetra sit amet, consequat quis lorem. Vestibulum efficitur.","username":"catdude","recommended":true,"yeses":0,"noes":0,"verified":true,"promotion":false},{"score":4,"date":"2020-05-05T22:07:57.603Z","review":"Fusce quis erat ornare, tincidunt odio eget, tempor velit. Donec placerat vestibulum diam. Maecenas molestie congue mauris.","username":"ElGatoSupreme","recommended":true,"yeses":0,"noes":0,"verified":false,"promotion":true},{"score":4,"date":"2020-02-06T22:07:57.603Z","review":"Praesent justo ante, porta at dui eget, placerat scelerisque ex. In hac habitasse platea dictumst. Maecenas at libero ut dolor.","username":"Winifred","recommended":true,"yeses":0,"noes":0,"verified":true,"promotion":true},{"score":3,"date":"2019-07-06T22:07:57.603Z","review":"Suspendisse mollis in felis non blandit. Proin pellentesque dui sed turpis pharetra, a pretium odio fermentum. In hac habitasse platea dictumst. Etiam cursus augue ut.","username":"Emily","recommended":false,"yeses":0,"noes":0,"verified":false,"promotion":false},{"score":3,"date":"2018-09-06T22:07:57.603Z","review":"Mauris sit amet risus purus. Aenean sem ex, aliquam non velit a, varius lobortis neque. Donec tincidunt sit amet mauris eget suscipit. Sed eget lectus leo. Praesent condimentum metus lacus, et tincidunt ipsum fringilla eu.","username":"Sarah","recommended":true,"yeses":0,"noes":1,"verified":true,"promotion":false},{"score":4,"date":"2018-04-06T22:07:57.603Z","review":"Quisque dapibus, urna ac varius mattis, nisi nunc venenatis urna, a.","username":"Bob","recommended":true,"yeses":0,"noes":0,"verified":true,"promotion":false},{"score":2,"date":"2020-05-16T22:07:57.603Z","review":"Suspendisse ultricies ac ligula et molestie. Quisque nisi ante, maximus in mattis sed, finibus id magna. Pellentesque quis finibus ex, non congue augue.","username":"Binx","recommended":false,"yeses":0,"noes":0,"verified":true,"promotion":true},{"score":2,"date":"2018-05-06T22:07:57.603Z","review":"Vestibulum dapibus maximus tellus, ac imperdiet diam bibendum nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam lacus neque, sollicitudin at mauris a, aliquam laoreet enim. Duis turpis urna, auctor at facilisis eleifend, euismod nec odio. Mauris blandit est sed augue lacinia, nec ultricies.","username":"Billy","recommended":false,"yeses":0,"noes":0,"verified":false,"promotion":true},{"score":1,"date":"2019-07-06T22:07:57.603Z","review":"Ut tellus justo, aliquam at libero quis.","username":"Dani","recommended":false,"yeses":0,"noes":0,"verified":true,"promotion":false},{"score":1,"date":"2018-11-01T22:07:57.603Z","review":"Etiam a est sit amet libero aliquam tristique id at libero. Sed id condimentum risus, nec sollicitudin mauris. Duis.","username":"Max","recommended":false,"yeses":1,"noes":0,"verified":true,"promotion":false},{"score":3,"date":"2020-03-24T22:07:57.603Z","review":"Ut gravida ultrices cursus. Suspendisse potenti. Aenean in mi euismod, tempor ligula vel, ornare nisl. Pellentesque id fringilla urna.","username":"Mary","recommended":true,"yeses":0,"noes":0,"verified":true,"promotion":false},{"score":1,"date":"2020-02-14T22:07:57.603Z","review":"Donec eget ligula id mi tempor viverra nec quis felis. Proin in facilisis justo.","username":"Allison","recommended":false,"yeses":2,"noes":1,"verified":true,"promotion":true}]}',
  });
});

describe('Reviews Service tests', () => {
  describe('The service\'s uppermost parent component (ReviewsModule)', () => {
    beforeEach(() => {
      ReactDOM.unmountComponentAtNode(document.getElementById('REVIEWS_ATTACH_POINT'));
      ReactDOM.render(
        <Provider store={store}>
          <ReviewsModule />
        </Provider>,
        document.getElementById('REVIEWS_ATTACH_POINT'),
      );
    });

    it('should mount', () => {
      expect(document.getElementById('reviews-module')).to.not.be.null;
    });
  });

  describe('The ReviewHeader component', () => {
    beforeEach(() => {
      ReactDOM.unmountComponentAtNode(document.getElementById('REVIEWS_ATTACH_POINT'));
      ReactDOM.render(
        <Provider store={store}>
          <ReviewsModule />
        </Provider>,
        document.getElementById('REVIEWS_ATTACH_POINT'),
      );
    });

    it('should mount', () => {
      expect(document.getElementById('review-header-component')).to.not.be.null;
    });

    describe('should have an element with id "header-upper-reviews" that', function() {
      it('normally has a text color of "rgb(0, 88, 145)"', function() {
        const target = document.getElementById('header-upper-reviews');

        expect(target.style.color).to.equal('rgb(0, 88, 145)');
      });

      it('changes its text color to "rgb(0, 156, 217)" when the mouse hovers over it', function() {
        const target = document.getElementById('header-upper-reviews');

        expect(target.style.color).to.equal('rgb(0, 88, 145)');

        const event = new MouseEvent('mouseover', { bubbles: true });
        target.dispatchEvent(event);

        expect(target.style.color).to.equal('rgb(0, 156, 217)');
      });

      it('changes its text color back to "rgb(0, 88, 145)" after a hovering mouse leaves it', function() {
        const target = document.getElementById('header-upper-reviews');

        expect(target.style.color).to.equal('rgb(0, 88, 145)');

        let event = new MouseEvent('mouseover', { bubbles: true });
        target.dispatchEvent(event);

        expect(target.style.color).to.equal('rgb(0, 156, 217)');
        expect(target.style.color).to.not.equal('rgb(0, 88, 145)');

        event = new MouseEvent('mouseout', { bubbles: true });
        target.dispatchEvent(event);

        expect(target.style.color).to.equal('rgb(0, 88, 145)');
        expect(target.style.color).to.not.equal('rgb(0, 156, 217)');
      });

      it('should have innerHTML equal to "19 Reviews" when numberOfReviews equals 19', function() {
        const target = document.getElementById('header-upper-reviews');

        expect(target.innerHTML).to.equal('19 Reviews');
      });
    });

    describe('should have an element with id "item-link-reviews" that', function() {
      it('normally has a text color of "rgb(0, 88, 145)"', function() {
        const target = document.getElementById('item-link-reviews');

        expect(target.style.color).to.equal('rgb(0, 88, 145)');
      });

      it('changes its text color to "rgb(0, 156, 217)" when the mouse hovers over it', function() {
        const target = document.getElementById('item-link-reviews');

        expect(target.style.color).to.equal('rgb(0, 88, 145)');

        const event = new MouseEvent('mouseover', { bubbles: true });
        target.dispatchEvent(event);

        expect(target.style.color).to.equal('rgb(0, 156, 217)');
      });

      it('changes its text color back to "rgb(0, 88, 145)" after a hovering mouse leaves it', function() {
        const target = document.getElementById('item-link-reviews');

        expect(target.style.color).to.equal('rgb(0, 88, 145)');

        let event = new MouseEvent('mouseover', { bubbles: true });
        target.dispatchEvent(event);

        expect(target.style.color).to.equal('rgb(0, 156, 217)');
        expect(target.style.color).to.not.equal('rgb(0, 88, 145)');

        event = new MouseEvent('mouseout', { bubbles: true });
        target.dispatchEvent(event);

        expect(target.style.color).to.equal('rgb(0, 88, 145)');
        expect(target.style.color).to.not.equal('rgb(0, 156, 217)');
      });
    });

    describe('should have an element with id "item-link-questions" that', function() {
      it('normally has a text color of "rgb(0, 88, 145)"', function() {
        const target = document.getElementById('item-link-questions');

        expect(target.style.color).to.equal('rgb(0, 88, 145)');
      });

      it('changes its text color to "rgb(0, 156, 217)" when the mouse hovers over it', function() {
        const target = document.getElementById('item-link-questions');

        expect(target.style.color).to.equal('rgb(0, 88, 145)');

        const event = new MouseEvent('mouseover', { bubbles: true });
        target.dispatchEvent(event);

        expect(target.style.color).to.equal('rgb(0, 156, 217)');
      });

      it('changes its text color back to "rgb(0, 88, 145)" after a hovering mouse leaves it', function() {
        const target = document.getElementById('item-link-questions');

        expect(target.style.color).to.equal('rgb(0, 88, 145)');

        let event = new MouseEvent('mouseover', { bubbles: true });
        target.dispatchEvent(event);

        expect(target.style.color).to.equal('rgb(0, 156, 217)');
        expect(target.style.color).to.not.equal('rgb(0, 88, 145)');

        event = new MouseEvent('mouseout', { bubbles: true });
        target.dispatchEvent(event);

        expect(target.style.color).to.equal('rgb(0, 88, 145)');
        expect(target.style.color).to.not.equal('rgb(0, 156, 217)');
      });
    });

    describe('should have an element with id "item-link-answers" that', function() {
      it('normally has a text color of "rgb(0, 88, 145)"', function() {
        const target = document.getElementById('item-link-answers');

        expect(target.style.color).to.equal('rgb(0, 88, 145)');
      });

      it('changes its text color to "rgb(0, 156, 217)" when the mouse hovers over it', function() {
        const target = document.getElementById('item-link-answers');

        expect(target.style.color).to.equal('rgb(0, 88, 145)');

        const event = new MouseEvent('mouseover', { bubbles: true });
        target.dispatchEvent(event);

        expect(target.style.color).to.equal('rgb(0, 156, 217)');
      });

      it('changes its text color back to "rgb(0, 88, 145)" after a hovering mouse leaves it', function() {
        const target = document.getElementById('item-link-answers');

        expect(target.style.color).to.equal('rgb(0, 88, 145)');

        let event = new MouseEvent('mouseover', { bubbles: true });
        target.dispatchEvent(event);

        expect(target.style.color).to.equal('rgb(0, 156, 217)');
        expect(target.style.color).to.not.equal('rgb(0, 88, 145)');

        event = new MouseEvent('mouseout', { bubbles: true });
        target.dispatchEvent(event);

        expect(target.style.color).to.equal('rgb(0, 88, 145)');
        expect(target.style.color).to.not.equal('rgb(0, 156, 217)');
      });
    });

    describe('should have an element with id "header-upper-review-average" that', function() {
      it('should have innerHTML equal to "3.5" when reviewAverage equals "3.5"', function() {
        const target = document.getElementById('header-upper-review-average');

        expect(target.innerHTML).to.equal('3.5');
      });
    });

    describe('should have an element with id "item-value-reviews" that', function() {
      it('should have innerHTML equal to "19" when numberOfReviews equals 19', function() {
        const target = document.getElementById('item-value-reviews');

        expect(target.innerHTML).to.equal('19');
      });
    });

    describe('should have an element with id "magnifying-glass" that', function() {
      it('normally has a background image property set to "url("/searchMagnifyingGlass.png")"', function() {
        const target = document.getElementById('magnifying-glass');

        expect(target.style.backgroundImage).to.equal('url("http://127.0.0.1:3001/searchMagnifyingGlass.png")');
      });

      it('changes its background image to "url("http://127.0.0.1:3001/searchMagnifyingGlassHover.png")" when the mouse hovers over it', function() {
        const target = document.getElementById('magnifying-glass');

        expect(target.style.backgroundImage).to.equal('url("http://127.0.0.1:3001/searchMagnifyingGlass.png")');

        const event = new MouseEvent('mouseover', { bubbles: true });
        target.dispatchEvent(event);

        expect(target.style.backgroundImage).to.equal('url("http://127.0.0.1:3001/searchMagnifyingGlassHover.png")');
      });

      it('changes its background image back to "url("http://127.0.0.1:3001/searchMagnifyingGlass.png")" after a hovering mouse leaves it', function() {
        const target = document.getElementById('magnifying-glass');

        expect(target.style.backgroundImage).to.equal('url("http://127.0.0.1:3001/searchMagnifyingGlass.png")');

        let event = new MouseEvent('mouseover', { bubbles: true });
        target.dispatchEvent(event);

        expect(target.style.backgroundImage).to.equal('url("http://127.0.0.1:3001/searchMagnifyingGlassHover.png")');
        expect(target.style.backgroundImage).to.not.equal('url("http://127.0.0.1:3001/searchMagnifyingGlass.png")');

        event = new MouseEvent('mouseout', { bubbles: true });
        target.dispatchEvent(event);

        expect(target.style.backgroundImage).to.equal('url("http://127.0.0.1:3001/searchMagnifyingGlass.png")');
        expect(target.style.backgroundImage).to.not.equal('url("http://127.0.0.1:3001/searchMagnifyingGlassHover.png")');
      });
    });
  });

  describe('The DynamicStars component', () => {
    beforeEach(() => {
      ReactDOM.unmountComponentAtNode(document.getElementById('REVIEWS_ATTACH_POINT'));
      ReactDOM.render(
        <Provider store={store}>
          <ReviewsModule />
        </Provider>,
        document.getElementById('REVIEWS_ATTACH_POINT'),
      );
    });

    it('should mount twice', () => {
      expect(document.getElementsByClassName('dynamic-stars').length).to.equal(2);
    });

    it('should mount two sets of gray stars', () => {
      expect(document.getElementsByClassName('empty-stars').length).to.equal(2);
    });

    it('should mount two sets of black stars', () => {
      expect(document.getElementsByClassName('filled-stars').length).to.equal(2);
    });

    it('should have black-stars components with widths that are 3.5/5 that of the grayStars, when the review average is 3.5', function() {
      const blackStars = document.getElementsByClassName('filled-stars');
      const grayStars = document.getElementsByClassName('empty-stars');

      const widthStrings = [blackStars[0].style.width, grayStars[0].style.width, blackStars[1].style.width, grayStars[0].style.width];
      const widths = [];

      widthStrings.forEach((widthString) => {
        const shavedPx = widthString.split('px');
        widths.push(Number.parseFloat(shavedPx));
      });

      expect(widths[0]).to.equal(widths[1] / 5 * 3.5);
      expect(widths[2]).to.equal(widths[3] / 5 * 3.5);
    });
  });
});
