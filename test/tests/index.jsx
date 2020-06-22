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
});
