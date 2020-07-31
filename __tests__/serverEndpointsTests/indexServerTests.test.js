describe('Reviews Service Server tests', () => {
  describe('The server\'s /review/:itemId endpoint', () => {
    test('correctly retrieves the hardcoded data for item 100', () => {
      return axios.get('http://127.0.0.1:3001/reviews/100')
        .then((res) => {
          const { reviewAverage, numberOfReviews, allReviews } = res.data;
          expect(reviewAverage).to.equal('3.5');
          expect(numberOfReviews).to.equal(19);
          expect(allReviews.length).to.equal(19);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    test('correctly retrieves the hardcoded reviews data for item 100', () => {
      return axios.get('http://127.0.0.1:3001/reviews/100')
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
        .catch((err) => {
          console.log(err);
        });
    });

    test('correctly retrieves data for an item other than item 100', () => {
      const roll = Math.floor(Math.random() * 99 + 100);
      return axios.get(`http://127.0.0.1:3001/reviews/${roll}`)
        .then((res) => {
          const { reviewAverage, numberOfReviews, allReviews } = res.data;
          expect(reviewAverage).to.exist;
          expect(numberOfReviews).to.not.equal(19);
          expect(allReviews).to.exist;
        })
        .catch((err) => {
          console.log(err);
        });
    });

    test('correctly retrieves the reviews for item 100 such that the reviews are in chronological order, newest to oldest', () => {
      return axios.get('http://127.0.0.1:3001/reviews/100')
        .then((res) => {
          const { allReviews } = res.data;
          const usernames = ['Binx', 'ChonkyCat', 'ElGatoSupreme', 'Mary', 'CatButt', 'Allison', 'Winifred', 'CVCat', 'catdude', 'NotACatLady', 'Dani', 'Emily', 'TummyScratcher', 'PikaPika', 'Max', 'Sarah', 'Froggy', 'Billy', 'Bob'];

          for (let i = 0; i < allReviews.length; i++) {
            expect(allReviews[i].username).to.equal(usernames[i]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });

    test('sends back "Item does not exist" for invalid item number', () => {
      return axios.get('http://127.0.0.1:3001/reviews/99')
        .then((res) => {
          expect(res).to.not.equal('Item does not exist');
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });

  describe('The server\'s /averageReviews/:itemId endpoint', () => {
    test('correctly retrieves the data for multiple items when passed an "array"', () => {
      return axios.get('http://127.0.0.1:3001/averageReviews/array154,133,100')
        .then((res) => {
          const [item100, item133, item154] = res.data;
          const { reviewAverage, numberOfReviews } = item100;
          expect(reviewAverage).to.equal('3.5');
          expect(numberOfReviews).to.equal(19);
          expect(item133.itemId).to.equal('133');
          expect(item154.itemId).to.equal('154');
        })
        .catch((err) => {
          console.log(err);
        });
    });

    test('correctly retrieves the hardcoded data for item 100', () => {
      return axios.get('http://127.0.0.1:3001/averageReviews/100')
        .then((res) => {
          const { reviewAverage, numberOfReviews } = res.data;
          expect(reviewAverage).to.equal('3.5');
          expect(numberOfReviews).to.equal(19);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    test('correctly retrieves data for an item other than item 100', () => {
      const roll = Math.floor(Math.random() * 99 + 100);
      return axios.get(`http://127.0.0.1:3001/averageReviews/${roll}`)
        .then((res) => {
          const { reviewAverage, numberOfReviews } = res.data;
          expect(reviewAverage).to.exist;
          expect(numberOfReviews).to.not.equal(19);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    test('sends back "Item does not exist" for invalid item number', () => {
      return axios.get('http://127.0.0.1:3001/averageReviews/99')
        .then((res) => {
          expect(res).to.not.equal('Item does not exist');
        })
        .catch((err) => {
          console.log(err);
        });
    });

    test('sends back "Items do not exist" for invalid item number inside an "array"', () => {
      return axios.get('http://127.0.0.1:3001/averageReviews/array151,133,99')
        .then((res) => {
          expect(res).to.not.equal('Items do not exist');
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
});
