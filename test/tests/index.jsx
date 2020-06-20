// const { render } = require('@testing-library/react');
// const { toBeInTheDocument } = require('@testing-library/jest-dom');
import ReviewsModule from '../../client/src/service.jsx';
import store from '../../client/src/ReduxSpecificComponents/store.js';

const { expect } = chai;
const { Provider } = ReactRedux;

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
