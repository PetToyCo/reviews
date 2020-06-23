//////dynamic stars
const dynamicStarsGrayStars = {
  position: 'absolute',
  top: '0',
  left: '0',
  height: 'inherit',
  width: '57px',
  fontSize: '12px',
  color: '#ccc',
};

//////reviewHeader
const reviewHeaderItemLink = {
  display: 'flex',
  flexDirection: 'column',
  textDecoration: 'none',
  fontStyle: 'normal',
  color: 'inherit',
  alignItems: 'center',
  padding: '8px 10px',
  height: '37px',
  fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
};

const reviewHeaderItemLinkLinklike = {
  textDecoration: 'underline',
  color: '#005891',
  fontSize: '14px',
  fontWeight: '400',
  fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
};

const reviewHeaderItemLinkLinkNatureHidden = {
  color: '#333',
  fontSize: '17px',
  fontWeight: '700',
  fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
};

const reviewHeaderListItem = {
  display: 'list-item',
  float: 'left',
  height: 'auto',
  width: '160px',
  left: 'auto',
};

const reviewHeaderWrapper = {
  display: 'flex',
  flexDirection: 'column',
  height: 'auto',
  width: '1095px',
  backgroundColor: '#f7f7f7',
  flexShrink: '0',
  borderBottom: '1px solid',
  borderColor: '#ccc',
};

const reviewHeaderTopHalf = {
  borderBottom: '1px solid',
  borderColor: '#ccc',
  width: 'auto',
  height: '30px',
  padding: '10px 20px',
};

const reviewHeaderReviewAverage = {
  paddingLeft: '10px',
  paddingRight: '10px',
  borderRight: '1px solid #ccc',
  height: '18px',
  color: '#666',
};

const reviewHeaderSearchBar = {
  fontSize: '14px',
  width: '416px',
  height: '16px',
  borderColor: '#bbb',
  margin: '10px 0',
  borderWidth: '1px',
  padding: '7px 10px',
  fontFamily: '"Arial","Helvetica","Helvetica Neue",sans-serif',
};

const reviewHeaderSearchBarButton = {
  backgroundImage: 'url("/searchMagnifyingGlass.png")',
  height: '32px',
  width: '88px',
  border: 'none',
  margin: '10px 0',
  padding: '1px 0',
  cursor: 'pointer',
};

const reviewHeaderList = {
  listStyleType: 'none',
  height: '52px',
  width: '480px',
  float: 'right',
  margin: '0 0 0 36px',
};

export {
  reviewHeaderItemLink,
  reviewHeaderItemLinkLinklike,
  reviewHeaderItemLinkLinkNatureHidden,
  reviewHeaderListItem,
  reviewHeaderWrapper,
  reviewHeaderTopHalf,
  reviewHeaderReviewAverage,
  reviewHeaderSearchBar,
  reviewHeaderSearchBarButton,
  reviewHeaderList,
  dynamicStarsGrayStars,
};
