import Filter from './filter.jsx';
import Navigation from './navigation.jsx';
import IndividualReview from './individualReview.jsx';

class Reviews extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Filter />
        <IndividualReview />
        <IndividualReview />
        <IndividualReview />
        <IndividualReview />
        <IndividualReview />
        <IndividualReview />
        <IndividualReview />
        <IndividualReview />
        <Navigation />
      </div>
    );
  }
}

export default Reviews;
