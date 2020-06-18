import DynamicReviewStars from '../General/dynamicReviewStars.jsx';

class ReviewHeader extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex' }}>
          <DynamicReviewStars />
          <div> number score </div>
          <div> | </div>
          <div> Number of Reviews</div>
        </div>
        <div style={{ display: 'flex' }}>
          <div>Search bar</div>
          <div> Number of Reviews </div>
          <div> Number of Questions </div>
          <div> Number of Answers</div>
        </div>

      </div>
    );
  }
}

export default ReviewHeader;
