
*** Settings ***
Library    SeleniumLibrary
Resource    ../resources/Keywords.robot
Resource    ../resources/Variables.robot
Suite Teardown    Clean Browser

*** Test Cases ***

# Test to check the sorting functionality
Test 4 - Check Product sort
    [Documentation]    This test case verifies the sorting functionality by logging in as a standard user,
    ...    sorting products in high-to-low and low-to-high order, and checking if the products are sorted correctly.
    Given I am connected as a standard_user
    Then I am able to sort the products    hilo
    Then I check that the products are sorted properly    hilo
    Then I am able to sort the products    lohi
    Then I check that the products are sorted properly    lohi

# Test to add a specific product to the cart and verify its presence
Test 5 - Add a specific product
    [Documentation]    This test case verifies that a specific product, Sauce Labs Bike Light, can be added to the cart
    ...    by logging in as a standard user, checking the product details, adding it to the cart, and verifying its presence in the cart.
    Given I am connected as a standard_user
    Then I am able to see the correct details of the choosen product    Sauce Labs Bike Light
    I can add the product to the cart
    Then I can see the choosen product in the cart    Sauce Labs Bike Light
