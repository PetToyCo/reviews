import StarChart from './starChart.jsx';
import AverageCustomerRatings from './averageCustomerRatings.jsx';
import HighlightedReviews from './highlightedReviews.jsx';

class ReviewBody extends React.Component {
  // constructor(props) {
  //   super();
  // }

  handleWriteReviewMouseOver() {
    const target = document.getElementById('write-review-button');

    target.style.backgroundImage = null;
  }

  handleWriteReviewMouseOut() {
    const target = document.getElementById('write-review-button');

    target.style.backgroundImage = '-webkit-linear-gradient(top,rgba(255,255,255,.1) 0,rgba(255,255,255,0) 100%)';
  }

  render() {
    return (
      <div id='review-body-component' style={{ width: '1095px', margin: '20px 0 0 0' }}>
        <div id="review-link" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', margin: '0 0 34px 0' }}>
            <div
              style={{
                margin: '0 auto 0 9px',
                float: 'left',
                fontSize: '20px',
                color: 'rgb(51, 51, 51)',
                fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
                fontWeight: 700,
              }}
            >Reviews</div>
            <div
              id='write-review-button'
              style={{
                fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
                color: 'white',
                margin: '0 10px 0 0',
                fontSize: '13px',
                float: 'right',
                padding: '8.5px 13.5px',
                backgroundColor: 'rgb(0, 88, 145)',
                cursor: 'pointer',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                backgroundImage: '-webkit-linear-gradient(top,rgba(255,255,255,.1) 0,rgba(255,255,255,0) 100%)',
              }}
              onMouseOver={this.handleWriteReviewMouseOver.bind(this)}
              onMouseOut={this.handleWriteReviewMouseOut.bind(this)}
            >Write a review</div>
          </div>
          <div style={{ display: 'flex' }}>
            <StarChart />
            <AverageCustomerRatings />
          </div>
          <HighlightedReviews />
        </div>
      </div>
    );
  }
}

export default ReviewBody;
