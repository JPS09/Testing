Feature: Be able to order products with a standard account

    As a user with a standard account I should be able to make an order without issues

    Scenario: Connect and add products to cart

        Given I am on the login page
        And I enter "standard_user" as a user-name and "secret_sauce" as a password
        Then I should be redirected to the product page
        Then I should be able to sort the products from most expensive to cheapest
        And Add the two first product to the cart
        Then Check that the products are added to the cart

    Scenario: Enter client data and checkout 2 products

        Given I am logged in as a standard_user
        And I have products in my cart
        Then I should be able to enter the user data
        Then Validate the order

