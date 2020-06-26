# reviews
Handles all reviews and review-related visuals for PetToyCo

## Related Projects

  - https://github.com/PetToyCo/photo-gallery
  - https://github.com/PetToyCo/description_directions_attributes_
  - https://github.com/PetToyCo/mainTitle_price
  - https://github.com/PetToyCo/repo
  - https://github.com/PetToyCo/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

From project's root folder:
1. In terminal: npm install
2. If you need to seed database with fake data, follow the "Seeding Database" instructions below.
3. Once you have seed data in your MongoDB instance, you can start the server with: npm run server
4. To see the actual service in action takes some work. Ideally, this service is meant to work out-of-the-box as a service server for a proxy and so, to see the service as a standalone, you have to do the following
  a. From project's root directory, open the file located at client/src/service.jsx
  b. Search for the comment "start of service as standalone"
  c. Uncomment all the code starting below that comment and ending just before the comment "end of service as standalone"
  d. Just below the code you just uncommented, there is a comment "start of service as proxy service". Comment out all the code below that comment up until you reach the comment "end of service as proxy service"
  e. Save file
  f. In terminal, with cd set to project's root directory, run >npm run build
  g. in a browser, type: http://127.0.0.1:3001/
Note: service currently hardcoded to only view item 100.
5. To test the service's server endpoints, in a browser, type:
http://127.0.0.1:3001/test/ServerSpecRunner.html
6. To run the service's test specs, in a browser, type:
http://127.0.0.1:3001/test/SpecRunner.html (if the steps in Step 4 above were followed)
http://127.0.0.1:3001/test/SpecRunner.html?itemID=100 (if the steps in Step 4 above were NOT followed)



To connect this service to a proxy server:
1. Follow steps 1-3 in the above section titled "From project's root folder"
2. In your proxy's index.html file, make sure there is this tag:
<div id="REVIEWS_ATTACH_POINT"></div>
Without this tag, the Reviews module will not be able to mount itself in the DOM.
3. The proxy server's valid urls must include the search param ?itemID="value 100 to 199 without the quotes."

4. You will also need the following CDN links posted ABOVE the tag in step 2:
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js"></script>
<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/redux/4.0.5/redux.min.js"></script>
<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react-redux/7.2.0/react-redux.min.js"></script>
<script crossorigin src="https://momentjs.com/downloads/moment.min.js"></script>

5. To retrieve the Reviews Module, make a GET request to http://127.0.0.1:3001/app.js
6. This service also has the following endpoints (where :itemId can be a value from 100-199):

Endpoint: /averageReviews/:itemId
Server Response:
{
  reviewAverage: “String between 0-5 representing average number of stars for that item”,
  numberOfReviews: “Integer number representing number of reviews for that item”
}

Endpoint: /reviews/:itemId
Server Response:
{
  reviewAverage: “String representing float number between 0-5 representing average number of stars for that item”,
  numberOfReviews: “Integer number representing number of reviews for that item”,
  allReviews: [array filled with “individual review object”s],
}

“Individual review object”: {
  score: “integer number representing number of star 1 - 5”,
  date : “ISO-8601 timestamp string”,
  title: “String representing title of review”
  review: “String representing review”,
  username: “user who submitted review”,
  recommended: “boolean whether or not user recommends others buy this product”,
  yeses: “Integer representing number of users who found this review helpful”,
  noes: “Integer representing number of users who found this review unhelpful”,
  verified: “boolean of whether or not reviewer is a verified user”,
  promotion: “boolean of whether or not review was collected during a promotion”
}




Seeding Database:
1. From project's root directory in terminal: npm run testSeed
2. If all tests pass, run: npm run seedDb
3. Note: if you try to reseed databse, you will error out. To reseed, you first have to manually drop the PTCReviewsService database from your MongoDB instance and then repeat step2.



To upscale mock data:
1. All files that need an update are located in /server/seed/
2. In seed.js, search for "Initiate randomly generated data"
3. Below the comment is a while loop where itemId tracker is being compared to the number 199. Increase/decrease that number to desired level. NOTE: the counter starts at 101 and not 0. Also not at 100 since the first item is hardcoded in and doesn't need to be randmly generated. As such, the file will generate 99 random item records for a total of 100.
4. In seed.test.js, you will have to change three tests to account for the change made in seed.js.
5. For "it produces a record for exactly 100 items", you will have to change the value 100 to the new number of records you now expect to have.
6. For "all itemIds are within the range 100 to 199", you wil have to change 199 to equal 99 + "the number of records you expect to have", which you just changed in point 5 above.
7.  For "the length of the detailedIndividualReviews array is within the range 415-1702", you will have to change both 415 and 1702 to their new values. See the rather length comment above the test for more info on the math involved here.


## Requirements

- Node 12.16.1


## Development

### Installing Dependencies

From within the root directory: npm install


