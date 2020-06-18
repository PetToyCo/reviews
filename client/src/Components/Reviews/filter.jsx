class Filter extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div style={{ display: 'flex' }}>
        <div> first review - last review out of number of reviews </div>
        <div> sort by drop down </div>
        <div> menu expansion button</div>
      </div>
    );
  }
}

export default Filter;
