Feature: Add a new User

    As a visitor, I should be able to create a new account

    Scenario: Adding a new user
        Given I am on the homepage
        When I click on the find user
        And I click on the Add Owner
        Then I am on the Add Owner Page
        And I Enter "John" into the "firstName" input "text"
        And I Enter "Petlover" into the "lastName" input "text"
        And I Enter "1 rue de Lyon" into the "address" input "text"
        And I Enter "Toulouse" into the "city" input "text"
        And I Enter "0600000000" into the "telephone" input "text"
        # And I click on the "Add Owner"
        # Then the user data should be displayed in the user list
        # And the user details should be displayed in the user details