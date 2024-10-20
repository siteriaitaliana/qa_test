Feature: QA.com Pricing page

    Scenario: AWS course search
        Given User Navigate to "pricingpage"
        And he check the pricing plans are correctly displayed
        When he click to start a subscription
        Then the form require the correct fields