*** Settings ***
Library    SeleniumLibrary    run_on_failure=None
Library    Collections
Test Teardown    Run Keyword And Ignore Error    Clean Browser
Suite Teardown    Run Keyword And Ignore Error    Clean Browser
Resource    Keywords.robot
Resource    Variables.robot

*** Test Cases ***
Test 1 - Utilisation du click

    Open Browser    https://www.cdiscount.com/
    Wait Until Element Is Visible    //button[contains(@title, "Continuer sans accepter")]
    Click Button    //button[contains(@title, "Continuer sans accepter")]


Test 2 - Utilisation de la recherche

    Open Browser    https://www.cdiscount.com/
    Maximize Browser Window
    Wait Until Element Is Visible    //button[contains(@title, "Continuer sans accepter")]
    Click Button    //button[contains(@title, "Continuer sans accepter")]
    Input Text    //input[contains(@id, "search")]    "Livre de Poche"
    Click Element    //button[contains(@class, "btn btn--reset form-icon js-search__icon")]
    Wait Until Element Is Visible   locator=//div[contains(@class,'c-heading__title o-vstack gap-sm')]/h1/span
    Element Should Contain    locator=//div[contains(@class,'c-heading__title o-vstack gap-sm')]/h1/span    expected=Livre de poche

Test 3 - Connexion

    Open and Maximise    url_to_open=https://demo.nopcommerce.com/
    Click On Element    html_tag=a    attr_name=class    attr_value=ico-login
    Enter Data    attr_name=id    attr_value=Email    text_to_enter=${user_email}
    Enter Data    attr_name=id    attr_value=Password    text_to_enter=${user_pswd}
    Click On Element    html_tag=button    attr_name=class    attr_value=login-button
    Click On Element    html_tag=a    attr_name=href    attr_value=/customer/info
    Element Attribute Value Should Be   //input[contains(@id, "Email")]    attribute=value    expected=${user_email}


Test 4 - Liste déroulante

    Open and Maximise    url_to_open=https://demo.nopcommerce.com/
    Select From List By Label    //select[contains(@name, "customerCurrency")]    Euro

Test 5 - Trier des produits
    Open and Maximise    https://www.cdiscount.com/
    Click On Element    button    title   Continuer sans accepter
    Enter Data    id    search    ${product1}
    Click On Element    button    class    js-search__icon
    Click on Element with Ratings
    Run keyword and Ignore error    Scroll Element Into View    //button[contains(@data-id, "avis-accordion")]
    Click On Element    button    data-id    avis-accordion
    Select From List By Value   id=review-sort    ${sort_by_value}
    Wait Until Keyword Succeeds    20s    strict:250ms    Element Text Should Be    //option[contains(@selected, "selected")]    ${option_displayed}

    #Element Text Should Be    //option[contains(@selected, "selected")]     ${sort_by}
    # ${selected_value}    Get Selected List Label    //select[contains(@id, "review-sort")]
    # Should Be Equal    ${selected_value}    ${sort_by}

Test 6 - Ajouter un produit au panier
    Open and Maximise    https://www.cdiscount.com/
    Click On Element    button    title   Continuer sans accepter
    Enter Data    id    search    ${product1}
    Click On Element    button    class    js-search__icon
    Click on Element with Ratings
    ${product_name}    Get Product Name
    Click On Element    input    id    fpAddBsk
    Wait Until Element Is Visible    //div[contains(@class, "raAddMsgWithCheck")]
    Click On Element    a    href    https://www.cdiscount.com/Basket.html
    Wait Until Element Is Visible    //div[contains(@class,'bProductLineDescTitle')]
    Element Should Contain    //div[contains(@class,'bProductLineDescTitle')]   ${product_name}

Test 7 - Ajouter plusieurs produits
    Open and Maximise    https://www.cdiscount.com/
    Click On Element    button    title   Continuer sans accepter
    ${products_titles}    Add Product from Detail Page    ${list_of_products_to_search}
    Wait Until Element Is Visible    //div[contains(@class, "raAddMsgWithCheck")]
    ${basket_products}    Fetch Basket Product Names    https://www.cdiscount.com/Basket.html
    Compare Lists    ${products_titles}    ${basket_products}

Test 8 - Manipulation d'une Liste
    Open and Maximise    https://www.cdiscount.com/
    Click On Element    button    title   Continuer sans accepter
    Search    Livres de poche
    Product list should be X element long    //h2[contains(@class,"alt-h4 u-line-clamp--2")]
*** Comments ***

Everything is a loop, eveything is cool when you're part of a list !
