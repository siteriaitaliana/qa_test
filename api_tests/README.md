# How to run the api tests (jest)

docker build -t api-tests .

docker run --rm -v $(pwd):/app -v $(pwd)/api-report:/app/api-report -w /app api-tests
