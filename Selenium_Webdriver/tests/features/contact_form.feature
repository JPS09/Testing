Feature: Contact form Validation

    Feature Description: As a visitor,
    I want to ensure that the contact form on the contact page workds correctly

    Scenario: Verify the presence of the input field
        Given I am on the contact page
        Then I should see the "id_nom_user" input field "text"
        And I should see the "id_prenom_user" input field "text"
        And I should see the "id_subject" input field "text"


    Scenario: Verify input field is disabled
        Given I am on the contact page
        Then I should see the "id_nom_user" is disabled
        And I should see the "id_prenom_user" is enabled


    Scenario: Verify label text
        Given I am on the contact page
        Then I should see the "id_nom_user" label is equal to "Votre Nom"

    Scenario: Write in a field
        Given I am on the contact page
        Then I can write "Writing things" in the field "message"

    Scenario: I can change page
        Given I am on the index page
        When I click on the contact link
        Then I am redirected on the contact page

    Scenario: Compare values on two pages
        Given I am on the index page with a value to Compare
        When I click on the contact link
        Then I am redirected on the contact page
        And The values are equal

    Scenario: I can select a fruit
        Given I am on the index page
        Then I can select mango on the fruits dropdown