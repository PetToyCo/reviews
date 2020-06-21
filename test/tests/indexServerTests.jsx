describe('Reviews Service Server tests', () => {
  describe('The server', () => {
    it('correctly retrieves the hardcoded data for item 100', () => {
      // before(() => {xhook.disable()})
      axios.get('/reviews/100')
        .then((res) => {
          console.log(res.data);
        });
    });
  });
});
