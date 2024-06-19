*** Settings ***

Library    SeleniumLibrary
Resource    ../resources/Keywords.robot
Resource    ../resources/Variables.robot
Suite Teardown    Clean Browser

*** Test Cases ***

# Test to connect as a standard user and then disconnect
Test 1 - Connect as Standard User
    [Documentation]    This test case verifies that a standard user can log in and then log out successfully.
    Given I am on the login Page
    Then I should be able to type my credentials    ${standard_user}    ${password}
    Then I should be able to connect    https://www.saucedemo.com/inventory.html
    And I should be able to disconnect

# Test to attempt connection as a locked out user and check for an error message
Test 2 - Attempt connect as locked out user
    [Documentation]    This test case verifies that a locked out user cannot log in and receives an error message.
    Given I am on the login Page
    Then I should be able to type my credentials    ${locked_out_user}    ${password}
    Then I should be able to connect    https://www.saucedemo.com/
    And I should see an error message

# Test to check out as a standard user
Test 3 - Check out as standard_user
    [Documentation]    This test case verifies that a standard user can log in, sort products, add them to the cart, and proceed with checkout.
    Given I am connected as a standard_user
    Then I am able to sort the products    hilo
    Then I can add the first products to my cart
    Then I proceed with the checkout
