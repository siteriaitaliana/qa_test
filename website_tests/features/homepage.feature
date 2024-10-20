Feature: QA.com Homepage

    Scenario: AWS course search
        Given User Navigate to "homepage"
        When he searches for
        | searchQuery | 
        | aws         | 
        | gcp         |
        | azure       | 
        Then the page displays the correct search results 
        | prettyName | 
        | aws        | 
        | gcp        |
        | azure      | 