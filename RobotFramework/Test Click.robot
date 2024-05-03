*** Settings ***
Library    SeleniumLibrary
# Suite Teardown    Run Keyword    Delete All Cookies

*** Test Cases ***
Test 1 - Utilisation du click

    Open Browser    https://demo.nopcommerce.com/
    Wait Until Element Is Visible    //a[contains(@href, "/register?returnUrl\=%2F") and contains(@class, "ico-register")]
    Click Element    //a[contains(@href, "/register?returnUrl\=%2F") and contains(@class, "ico-register")]
    Close Browser