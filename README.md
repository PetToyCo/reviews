# reviews
Handles all reviews and review-related visuals for PetToyCo

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

From project's root folder:
1. In terminal: npm install
2. If you need to seed database with fake data, follow the "Seeding Database" instructions below.
3. Once you have seed data in your MongoDB instance, you can start the server with: npm run server
4. To see the actual service in action, in a browser, type:
http://127.0.0.1:3001
Note: service currently hardcoded to only view item 100.
5. To run the service's test specs, in a browser, type:
http://127.0.0.1:3001/est/SpecRunner.html
6. To test the service's server endpoints, in a browser, type:
http://127.0.0.1:3001/est/ServerSpecRunner.html



To connect this service to a proxy server:



Seeding Database:
1. From preject's root directory in terminal: npm run testSeed
2. If all tests pass, run: npm run seedDb
3. Note: if you try to reseed databse, you will error out. To reseed, you first have to manually drop the PTCReviewsService database from your MongoDB instance and then repeat step2.



To upscale mock data:
1. All files that need an update are located in /server/seed/
2. In seed.js, search for "Initiate randomly generated data"
3. Below the comment is a while loop where itemId tracker is being compared to the number 199. Increase/decrease that number to desired level. NOTE: the counter starts at 101 and not 0. Also not at 100 since the first item is hardcoded in and doesn't need to be randmly generated. As such, the file will generate 99 random item records for a total of 100.
4. In seed.test.js, you will have to change three tests to account for the change made inseed.js.
5. For "it produces a record for exactly 100 items", you will have to change the value 100 to the new number of records you now expect to have.
6. For "all itemIds are within the range 100 to 199", you wil have to change 199 to equal 99 + "the number of records you expect to have", which you just changed in point 5 above.
7.  For "the length of the detailedIndividualReviews array is within the range 415-1702", you willl have to change both 415 and 1702 to their new values. See the rather length comment above the test for more info on the math involved here.


## Requirements

- Node 12.16.1


## Development

### Installing Dependencies

From within the root directory: npm install


