# API tests (jest/axios)
### How to run
- cd api_tests
- docker build -t api-tests .
- docker run --rm -v $(pwd):/app -v $(pwd)/api-report:/app/api-report -w /app api-tests

# Load tests (k6)
### How to run
- cd load_tests
- ./runLoad.sh 2>&1 | tee  test-report.log  

# Mock api server (express-node)
Had to create a quick local server to mock the api request/response since the rickandmortyapi was often unresponsive during my test creation
### How to run 
- cd server
- npm i
- npm run start

# UI tests (playwright)
### How to run
- cd website_tests
- docker build -t playwright-tests .
- docker run --rm -v $(pwd):/app -v $(pwd)/playwright-report:/app/playwright-report -w /app playwright-tests

To open the report (html):
- open playwright-report/index.html 

# Notes:
* The previous steps have only been tested on a MacOS, so don't consider them cross-platform compatible.
* TODO: Add Cucumber support. [https://talent500.co/blog/how-to-integrate-cucumber-with-playwright/]
Haven't added for time reasons and because I'm not a fan of Cucumber my self (tried it several times in the past but eventually it ended up only into added cumbersome code and difficult maintenance not eventually reaching its scope to have a common communication ground between tech and non-tech people (e.g.POs) considering how far are the 2 used laanguages).

 