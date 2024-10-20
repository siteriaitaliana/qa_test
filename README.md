# API tests (jest/axios)

### How to run

-   `cd api_tests`
-   `docker build -t api-tests .`
-   `docker run --rm -v $(pwd):/app -v $(pwd)/api-report:/app/api-report -w /app api-tests`

# Load tests (k6)

### How to run

-   `cd load_tests`
-   `./runLoad.sh 2>&1 | tee test-report.log`

# Mock api server (express-node)

Had to create a quick local server to mock the api request/response since the rickandmortyapi was often unresponsive during my test creation

### How to run

-   `cd server`
-   `npm i`
-   `npm run start`

# UI tests (playwright/cucumber)

### How to run

-   `cd website_tests`
-   `docker build -t cucumber-tests .`
-   `docker run --rm -v $(pwd):/app -v $(pwd)/cucumber-report:/app/cucumber-report -w /app cucumber-tests`

To open the report (html):

-   `open ./cucumber-report/cucumber-report.html`

# Notes:

-   The previous steps have only been tested on a MacOS, don't assume them cross-platform compatible.
