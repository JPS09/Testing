Feature: Check if locked_out_user is really locked out

    For security mesures, check if the locked out users are locked out of the system

    Scenario: Try login as Locked out user
        Given I am on the login page
        When I type "locked_out_user" in the "user-name" input
        And  I type "secret_sauce" in the "password" input
        And I click on the logIn button
        Then I should see an error message