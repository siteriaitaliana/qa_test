# Build the Docker image.

docker build -t playwright-tests .

# Run the Docker container.

docker run --rm -v $(pwd):/app -v $(pwd)/playwright-report:/app/playwright-report -w /app playwright-tests

# Open the Report Locally

open playwright-report/index.html (macOS)

// TODO: https://talent500.co/blog/how-to-integrate-cucumber-with-playwright/
