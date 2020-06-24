const { expect } = chai;

describe('Reviews Service Server tests', () => {
  describe('The server\'s /review/:itemId endpoint', () => {
    it('correctly retrieves the hardcoded data for item 100', (done) => {
      axios.get('/reviews/100')
        .then((res) => {
          const { reviewAverage, numberOfReviews, allReviews } = res.data;
          expect(reviewAverage).to.equal('3.5');
          expect(numberOfReviews).to.equal(19);
          expect(allReviews.length).to.equal(19);
        })
        .then(() => done(), done)
        .catch((err) => {
          console.log(err);
        });
    });

    it('correctly retrieves the hardcoded reviews data for item 100', (done) => {
      axios.get('/reviews/100')
        .then((res) => {
          const { allReviews } = res.data;
          const validUsernames = {
            'ChonkyCat': 1,
            'TummyScratcher': 1,
            'NotACatLady': 1,
            'CatButt': 1,
            'Froggy': 1,
            'PikaPika': 1,
            'catdude': 1,
            'CVCat': 1,
            'Bob': 1,
            'ElGatoSupreme': 1,
            'Winifred': 1,
            'Sarah': 1,
            'Emily': 1,
            'Mary': 1,
            'Binx': 1,
            'Billy': 1,
            'Dani': 1,
            'Max': 1,
            'Allison': 1,
          };
          allReviews.forEach((reviewObject) => {
            const { username } = reviewObject;
            expect(validUsernames[username]).to.equal(1);
            validUsernames[username]++;
          });
        })
        .then(() => done(), done)
        .catch((err) => {
          console.log(err);
        });
    });

    it('correctly retrieves data for an item other than item 100', (done) => {
      const roll = Math.floor(Math.random() * 99 + 100);
      axios.get(`/reviews/${roll}`)
        .then((res) => {
          const { reviewAverage, numberOfReviews, allReviews } = res.data;
          expect(reviewAverage).to.exist;
          expect(numberOfReviews).to.not.equal(19);
          expect(allReviews).to.exist;
        })
        .then(() => done(), done)
        .catch((err) => {
          console.log(err);
        });
    });

    it('correctly retrieves the reviews for item 100 such that the reviews are in chronological order, newest to oldest', (done) => {
      axios.get('/reviews/100')
        .then((res) => {
          const { allReviews } = res.data;
          const usernames = ['Binx', 'ChonkyCat', 'ElGatoSupreme', 'Mary', 'CatButt', 'Allison', 'Winifred', 'CVCat', 'catdude', 'NotACatLady', 'Dani', 'Emily', 'TummyScratcher', 'PikaPika', 'Max', 'Sarah', 'Froggy', 'Billy', 'Bob'];

          for (let i = 0; i < allReviews.length; i++) {
            expect(allReviews[i].username).to.equal(usernames[i]);
          }
        })
        .then(() => done(), done)
        .catch((err) => {
          console.log(err);
        });
    });
  });

  describe('The server\'s /averageReviews/:itemId endpoint', () => {
    it('correctly retrieves the hardcoded data for item 100', (done) => {
      axios.get('/averageReviews/100')
        .then((res) => {
          const { reviewAverage, numberOfReviews } = res.data;
          expect(reviewAverage).to.equal('3.5');
          expect(numberOfReviews).to.equal(19);
        })
        .then(() => done(), done)
        .catch((err) => {
          console.log(err);
        });
    });

    it('correctly retrieves data for an item other than item 100', (done) => {
      const roll = Math.floor(Math.random() * 99 + 100);
      axios.get(`/averageReviews/${roll}`)
        .then((res) => {
          const { reviewAverage, numberOfReviews } = res.data;
          expect(reviewAverage).to.exist;
          expect(numberOfReviews).to.not.equal(19);
        })
        .then(() => done(), done)
        .catch((err) => {
          console.log(err);
        });
    });
  });
});
