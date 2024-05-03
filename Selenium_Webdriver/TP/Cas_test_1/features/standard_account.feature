Feature: Verify User Connection

    Feature Description : Check if the user is able to Connect and Disconnect from application


Scenario: Verify the presence of logIn inputs
Given I am on the login page
Then I should see the "username" input "text" is present and enabled
And I should see the "password" input "text" is present and enabled
And I should see the enabled "log-in button" de type "submit"

Scenario: The user is able to enter data in the fields
Given I am on the login page
Then I should be able to type "standard_user" into the "username" input "text"
And I should be able to type "secret_sauce" into the "password" input "text"

Scenario: The user should be redirected to the product page after connection
Given I am on the login page
Then I should be able to type "standard_user" into the "username" input "text"
And I should be able to type "secret_sauce" into the "password" input "text"
And I should be able to click on the "log-in button" de type "submit"
And I should be redirected to the "product" page
And I should be able to click on the burger menu
And I should see the *logOut* button

Scenario: The user should be able to disconnect
Given I am on the product page
Then I should be able to click on the burger menu
And I should see be able to click the *logOut* button
And i should be redirected to the logIn page

