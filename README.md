# reviews
Handles all reviews and review-related visuals for PetToyCo

## Related Projects

  - https://github.com/PetToyCo/photo-gallery
  - https://github.com/PetToyCo/description_directions_attributes_
  - https://github.com/PetToyCo/mainTitle_price
  - https://github.com/PetToyCo/ProductRecommendations
  - https://github.com/PetToyCo/deliver-pickup
  
  None of the Related Projects need to be used to run this service. However, you will need a proxy to take advantage of it. The proxy can be found at https://github.com/PetToyCo/nick-proxy-server

## Table of Contents

1. Usage Development/Service Mode
2. Usage with a Proxy Server
3. Usage as a Deployed Service
4. Seeding Database
5. To Upscale Mock Data
6. Requirements
7. Development
8. images


## Usage Development/Service Mode

From project's root folder:
1. In terminal: npm install
2. If you need to seed database with fake data, follow the "Seeding Database" instructions below.
3. Once you have seed data in your MongoDB instance, you can start the server with: npm run server. At this point, everything is ready to be used in Service Mode. However, you will have to alter the proxy's html file to take advantage of the service. To do so, see the section below titled "Usage with a proxy server". If you are currently developing (or doing a code review) and want to run tests, continue to step 4.
4. To see the actual service in action, visit: http://127.0.0.1:3001. This will show the hardcoded data for item 100.
5. To run server endpoint tests, in terminal and project's root directory as cd >npm run testServer
6. To run the service's tests, follow these steps:
a. Open ./client/src/service.jsx
b. There is a line of code with 'MODAL_ATTACH_POINT' as part of its code. Uncomment this and save the file. Don't forget to re-comment-out and save if you want to continue exploring the service.
c. Then run from project's root directory in terminal >npm run test.
d. NOTE1: The coverage report shows one red in the %stmts column for one index.jsx file. This is unavoidable. Those lines of code cannot be tested in Jest/Enzyme because they involve lines of codes that set a component's style for backgroundImage to a '--webkit' value. Jest doesn't know how to process this and, while it doesn't error out, that backgroundImage value cannot be found on the component, in Jest. You can visually inspect that these lines of code are working though. On the service or proxy page, on the right hand side is a 'Write Review' button that should darken on mouseover, then lighten back to original color on mouseout.
e. NOTE2: The coverage report shows one yellow in the %stmts column for one index.jsx file. After considerable research, I'm fairly confident there is a bug in the way enzyme implements .find() which is preventing me from testing that the FullReviewModal closes upon clicking the "x" button that appears in that window. I plan on filing a bug report for this. In the meantime, you can visually inspect that this functionality works on the service by clicking either of the "Show Full Review" links and then, in the modal window that pops up, clicking the "x" button in the upper right corner. This should close the modal window AND scroll the page back down to where it was before the "Show Full Review" buton was clicked.



## Usage with a Proxy Server
1. Follow steps 1-3 in the above section titled "Usage Development/Service Mode"

2. In your proxy's index.html file, make sure there is this tag in the approproate location, within the <body>:
<div id="REVIEWS_ATTACH_POINT"></div>
Without this tag, the Reviews module will not be able to mount itself in the DOM. The "appropriate" location is where ever the reviews appear on a real PetCo product page, in relatoin to the other elements

You will also need this tag:
<div
  id="MODAL_ATTACH_POINT"
  style="position: absolute; top: -20px; left: -20px; visibility: hidden; overflow: hidden; background-color: rgba(0, 0, 0, 0.4); z-index: 100;"
></div>
Recommended you put it directly under the opening <body> tag so there is no unintended side-effects. This tag allows modals to attach in a proxy.

3. To complete the modal functionality, you will also need to add the following after the closing </body> tag:
<script>
  const callback = function() {
    const body = document.body;

    let height = body.scrollHeight + 40;
    let width = body.scrollWidth + 40;

    const modalAttachPoint = document.getElementById("MODAL_ATTACH_POINT");

    modalAttachPoint.style.height = `${height}px`;
    modalAttachPoint.style.width = `${width}px`;
  };

  window.addEventListener('resize', callback);

  const targetNode = document.body;
  const observer = new MutationObserver(callback);
  const config = { childList: true, subtree: true, attributes: false };
  observer.observe(targetNode, config);
</script>

4. The proxy server's valid urls must include the search param ?itemID="value 100 to 199 without the quotes."

5. You will also need the following CDN links posted ABOVE the tag in step 2:
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js"></script>
<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/redux/4.0.5/redux.min.js"></script>
<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react-redux/7.2.0/react-redux.min.js"></script>
<script crossorigin src="https://momentjs.com/downloads/moment.min.js"></script>
<link href="https://fonts.googleapis.com/css2?family=Nunito&display=swap" rel="stylesheet" async>

5. To retrieve the Reviews Module, use the script tag 
<script src="http://127.0.0.1:3001/app.js" async></script>

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


## Usage as a Deployed Service

You have two options. In ./bashScripts, there are some example bash scripts you can use to semi-automate the process. This is option 1. However, if you have yet to deploy this project before, it is recommended you follow the "Manual Deployment Instructions" for the first deployment.

Semi-automated Deployment Instructions:
1. In terminal, >cd "project's root directory path, without quotes"

2. I Locate the following two files and open them: ./client/src/enviromentalVariables.js and ./server/enviromentalVariables.js

 Then comment out the "Service and Development mode environmental variables" and uncomment the "Deployment mode environmental variables". You may also have to update the IP address if the AWS instance you will be deploying this service from was stopped or terminated since the last time you followed these instructions. If so, only update the IP_ADDRESS key with the new IP address as its value. And only for the Deployment mode. Also, if the IP address for IP_ADDRESS_E and/or IP_ADDRESS_K chnaged, you will have to update the appropriate address 
 
 Save all changes

3.  If you already followed this step and steps 4/5, skip to step 6. Otherwise: At ./bashScripts, there are seven files. They each have an extension .example.sh. Duplicate each of these and rename so .example copy.sh is now just .sh.

Example: bashScript4.example copy.sh should now be bashScript4.sh

IMPORTANT: If you do not follow these instructions exactly, the .gitignore and .dockerignore will not properly ignore the files you just duplicated/renamed. To check that you correctly renamed them all, in terminal >git status

If you renamed correctly, none of the files should show up as changes that needed to be staged/committed

4. You will now need to open each file and make changes for each variable. Variables come in the format: variable=[[[Instructions for what this variable value should be changed to]]]

For each variable, you replace all the [ ] brackets and everything inside them with the actual value IMPORTANT: two things: one, some variables will need to be changed everytime you want to deploy a new build. Those are mentioned in comments found within each file AND below in step 6. Two, DO NOT use string brackets around values. This is not javascript and so you do not need '' or ""

5. You will have to make it so three of the files you created can be edited and executed by only the root user on your comp. Do so with the following commands
>chmod 700 ./bashScripts/bashScript.sh
>chmod 700 ./bashScripts/bashScript2.sh
>chmod 700 ./bashScripts/bashScript3.sh

You do not need to do this with the last four files since you won't be executing them directly. 

6. Now follow this process to deploy:
- Make sure all IP addresses and script tags are accurate(see step 2 above)
- >./bashScripts/bashScript.sh
- The above script will build your docker image locally. At the end of the build, it will report the image's id. Copy and paste that to the imageID variable in bashScript2.sh. Also update the version variable in that file.
- >./bashScripts/bashScript2.sh   You will have to enter your Docker Hub password when prompted
- While waiting for the above command to finish running, you can open a second terminal window, cd to project's root directory, and run >./bashScripts/bashScript3.sh
- Once both script 2 and 3 are done running, you will have your image on Docker Hub and you will be logged into your AWS server, in the second terminal window. It is this window that you will use for the remaining steps.
- If you already have an older image running on the AWS instance. You have to: 1. >docker ps     and then copy and paste the correct container's ID into bashScript4.sh, for the runningContainerID variable. 2. the same command already gives you access to Image ID also, so copy and paste the correct image's ID for the runningImageID variable in the same file. 3. Copy and paste the entire contents of bashScript4.sh (EXCEPT the last line) into the second terminal, hit enter, then enter y when prompted. Once those scripts finihs running, copy just the last line into the terminal and hit enter.
- To pull the image you built and pushed to Docker Hub, you first have to login to Docker Hub with >docker login --username="your username, without quotes". Then in bashScript5.sh, update the version variable with the same version you gave it, then copy and paste all the code into the second terminal, and hit enter. You will have to enter your Docker Hub password when prompted
- If you do not already have a MongoDB image running on the AWS instance, you must update and run the code in bashScript7.sh before proceeding to the last step. If the DB is already running, proceed to the last step. 

NOTE: you might already have a network and volume running on the instance. If you do, follow the instructions in bashScript7.sh to acquire them, then copy and paste them to networkName and volumeName variables, respectively. Also make sure, in bashScript6.sh, that the networkName variable matches

NOTE 2. The network alias should match the Deployment DATABASE_LOCAL_ADDRESS variable in server/environmentalVariables.js

NOTE3: the mongo version expected for this project is 4.2.6

- Lastly, use >docker images     to get the Image ID for the image you just pulled, then copy and paste it into bashScript6.sh for the variable  imageID. Then copy and paste the file's entire contents into the second terminal and hit enter. The instance should now be running. Visit http://"your proxy instance's IP address, without quotes":3000/product?itemID=100 to confirm





Manual Deployment Instructions
1. Locate the following two files and open them: ./client/src/enviromentalVariables.js and ./server/enviromentalVariables.js
2. In each, comment out the "Service and Development mode environmental variables" and uncomment the "Deployment mode environmental variables". You may also have to update the IP address if the AWS instance you will be deploying this service from was stopped or terminated since the last time you followed these instructions. If so, only update the IP_ADDRESS key with the new IP address as its value. And only for the Deployment mode. Also, if the IP address for IP_ADDRESS_E and/or IP_ADDRESS_K chnaged, you will have to update the appropriate address 
3. From projects root directory >npm run build
4. Now build the docker image with >docker build -t "name of image, without quotes" . (yes, that dot is necessary for the command). If you want to assign a tag, don't forget :tagName after the image name. If you don't supply the tag name, :latest will be automatically appended. I currently use reviews-service as my image name.
5. If not already done so, create account at hub.docker.com and login. Then create a public repo. The name of the repo I currently use is fec-reviews-service.
6. In terminal, you can directly login into your Docker Hub account with >docker login --username="your username, without quotes". When prompted, enter your password.
7. The image you just built should report the image ID at the end of the build. Or you can find it by >docker images. In the printout caused by this command, the image should be the first one listed if you haven't built any other images since building the one for this service. With either method, copy the image's ID number for use in step 8
8. Before you push, you have to tag the image with >docker tag "image ID, without quotes" "Docker Hub username, without quotes"/"repo name from step 5, without quotes":"tag name, without quotes". Earlier, it was OK to let :latest be automatically appended but for this tag name, you will probably want to assign a version number or some other uniquely identifying feature.
9.  To push: >docker push "Docker Hub username, without quotes"/"repo name you tagged the image with in step 8, without quotes".
10. With the image on Docker Hub, you now need to get it onto your AWS instance that should have been fired up before (or during) step 2.
11. In terminal, >cd "file directory where .pem file is saved for the AWS instance".
12. If not done already, make sure only the root user on your computer can access the .pem file with >chmod 400 "name of .pem file, without quotes".pem
13. Then SSH into your AWS instance with >ssh -i "name of .pem file, without quotes".pem ec2-user@"the IP address of the AWS instance"
14. If not already done so, install docker onto the instance with >sudo yum update -y && sudo yum install -y docker && sudo service docker start. You can then add the ec2-user to the docker group so all docker commands can be run without sudo by >sudo usermod -a -G docker ec2-user. You then have to exit for this change to take effect using >exit. Re-sign-in to your AWS instance by repeating step 13.
15. You can now run Docker commands the same way you run them on your local terminal. Login to Docker (step 6).
16. Pull the image with >docker pull "Docker Hub username, without quotes"/"repo name from step 5, without quotes":"tag name, without quotes"
17. Before you can use the service's image, you first need to have a running MongoDB image on your AWS instance. Futhermore, both the MongoDB image's container and the container for your service's image will need to connect to the same network. If the network does not already exist >docker network create "Name of network, without quotes". I am currently using "services-connect-db" as the name of my network. As such, the command to run the MongoDB image references this (command found in step 18)
18. To actually run the MongoDb image (if not already running from a previous deployment) >docker run -d \
--network services-connect-db --network-alias mongo \
-v "name of volume, without quotes":/etc/mongo \
mongo:4.2.6

For name of volume, you do not need to create it ahead of time since, if it doesn't exist, the above command will first create it and then connect the container to it. I am currently using "db-storage" as the name of my volume. You have to keep using that name if you want to keep using the data already stored in the volume. Otherwise, you can create a new volume by upplying a different name.

19. Find your service's image ID with >docker images. Copy it for use in step 20.
20. Fire up the service's image with >docker -dp 3001:3001 \
--network services-connect-db \
"image ID, without quotes"

21. At this point, the service should be live and, if your proxy is also live, you can see it in action by going to http://"AWS instance IP address for the instance the proxy is on":3000/product?itemID="value 100 to 199, without quotes".



## Seeding Database:
1. From project's root directory in terminal: npm run testSeed
2. If all tests pass, run: npm run seedDb
3. Note: if you try to reseed databse, you will error out. To reseed, you first have to manually drop the PTCReviewsService database from your MongoDB instance and then repeat step2.



## To Upscale Mock Data:
1. All files that need an update are located in /server/seed/
2. In seed.js, search for "Initiate randomly generated data"
3. Below the comment is a while loop where itemId tracker is being compared to the number 199. Increase/decrease that number to desired level. NOTE: the counter starts at 101 and not 0. Also not at 100 since the first item is hardcoded in and doesn't need to be randmly generated. As such, the file will generate 99 random item records for a total of 100.
4. In seed.test.js, you will have to change three tests to account for the change made in seed.js.
5. For "it produces a record for exactly 100 items", you will have to change the value 100 to the new number of records you now expect to have.
6. For "all itemIds are within the range 100 to 199", you wil have to change 199 to equal 99 + "the number of records you expect to have", which you just changed in point 5 above.
7.  For "the length of the detailedIndividualReviews array is within the range 415-1702", you will have to change both 415 and 1702 to their new values. See the rather length comment above the test for more info on the math involved here.


## Requirements

- Node 12.16.1
- MongoDB 4.2.6


## Development

### Installing Dependencies

From within the root directory: npm install

## Images
The folder client/public contains numerous images. As noted in a text file contined within that folder (imgAttribution.txt), those images were: 

"All images taken from https://www.petco.com/shop/en/petcostore/product/cat/cat-toys/leaps-and-bounds-faux-leather-mouse-cat-toy-with-rattle-and-catnip June/July 2020"
