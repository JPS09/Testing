
*** Settings ***

Library    SeleniumLibrary
Resource    ../resources/Keywords.robot
Resource    ../resources/Variables.robot
Suite Teardown    Clean Browser

*** Test Cases ***
Test 4 - Check Product sort
    Given I am connected as a standard_user
    Then I am able to sort the products    hilo
    Then I check that the products are sorted properly    hilo
    Then I am able to sort the products    lohi
    Then I check that the products are sorted properly    lohi

Test 5 - Add a specific product
    Given I am connected as a standard_user
    Then I am able to see the correct details of the choosen product    Sauce Labs Bike Light
    I can add the product to the cart
    Then I can see the choosen product in the cart    Sauce Labs Bike Light


