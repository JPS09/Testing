*** Settings ***

Library    SeleniumLibrary
Resource    ../resources/Keywords.robot
Resource    ../resources/Variables.robot
Suite Teardown    Clean Browser

*** Test Cases ***

Test 1 - Connect as Standard User

    Given I am on the login Page
    Then I should be able to type my credentials    ${standard_user}    ${password}
    Then I should be able to connect    https://www.saucedemo.com/inventory.html
    And I should be able to disconnect

Test 2 - Attempt connect as locked out user

    Given I am on the login Page
    Then I should be able to type my credentials    ${locked_out_user}    ${password}
    Then I should be able to connect    https://www.saucedemo.com/
    And I should see an error message

Test 3 - Check out as standard_user 

    Given I am connected as a standard_user
    Then I am able to sort the products    hilo
    Then I can add the first products to my cart
    Then I proceed with the checkout
