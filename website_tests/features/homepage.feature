Feature: QA.com Homepage

    Scenario: AWS course search
        Given User Navigate to the homepage
        When he searches for "aws"
        Then the page displays the correct "aws" search results 