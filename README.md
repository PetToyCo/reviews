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
2. To see service's current status, open the following HTML file in a browser: ./client/public/index.html
3. To see service's current test specs, open the following HTML file in a browser: ./test/SpecRunner.html
4. All of the files necessary for seeding a database with fake data are in ./server/seed  . To run the tests located in seed.test.js, in terminal: npm run testSeed

To connect this service to a proxy server:

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


