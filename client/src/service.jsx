import store from './ReduxSpecificComponents/store.js';
import ReviewHeader from './Components/ReviewHeader/index.jsx';
import ReviewBody from './Components/ReviewBody/index.jsx';
import Reviews from './Components/Reviews/index.jsx';

const { Provider } = ReactRedux;

class ReviewsModule extends React.Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    axios.get('/reviews/100')
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    // console.log('Review freshly mounted')
    return (
      <div id="reviews-module" style={{ display: 'flex', flexDirection: 'column' }}>
        <ReviewHeader />
        <ReviewBody />
        <Reviews />
      </div>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <ReviewsModule />
  </Provider>,
  document.getElementById('REVIEWS_ATTACH_POINT'),
);

export default ReviewsModule;
