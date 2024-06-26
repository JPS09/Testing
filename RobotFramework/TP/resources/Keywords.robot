*** Settings ***
Library    SeleniumLibrary
Library    String
Library    Collections
Library    XML
Resource    Variables.robot

*** Keywords ***

# Keywords related to Gherkin Tests

I am on the login Page
    [Documentation]    Open the login page and maximize the browser window.
    Open Url and Maximise    ${BASE_URL}

I should be able to type my credentials
    [Documentation]    Enter username and password into the login form.
    [Arguments]    ${username}    ${user_password}
    Enter Data    id    user-name    ${username}
    Enter Data    id    password    ${user_password}    

I should be able to connect
    [Documentation]    Click the login button and verify the URL after login.
    [Arguments]    ${url_to_check}
    Click On Element    input    id   login-button
    Check Url    ${url_to_check}

I should be able to disconnect
    [Documentation]    Logout from the application and verify the URL and login button visibility.
    Click On Element    button    id    react-burger-menu-btn
    Click On Element    a    id    logout_sidebar_link
    Check Url    https://www.saucedemo.com/
    Assert Element Visible    input     id    login-button

I should see an error message
    [Documentation]    Verify the visibility and content of the error message.
    Assert Element Visible    h3    data-test    error
    Assert Element Contains    h3    data-test    error   Epic sadface: Sorry, this user has been locked out  

I am connected as a standard_user
    [Documentation]    Login as a standard user.
    Open Url and Maximise    ${BASE_URL}
    I should be able to type my credentials    ${standard_user}    ${password}
    I should be able to connect    https://www.saucedemo.com/inventory.html

I am able to sort the products
    [Documentation]    Sort products using a specified sorting option.
    [Arguments]    ${sort_choice}
    Pick option from List    select    data-test    product-sort-container    ${sort_choice}

I can add the first products to my cart
    [Documentation]    Add the first two products to the cart and verify their presence.
    Click On Element    button    data-test    add-to-cart-sauce-labs-fleece-jacket
    Click On Element    button    data-test    add-to-cart-sauce-labs-backpack
    Click On Element    a    data-test    shopping-cart-link
    Assert Element Visible    a   data-test    item-5-title-link
    Assert Element Contains    a   data-test    item-5-title-link    Sauce Labs Fleece Jacket
    Assert Element Visible    a   data-test    item-4-title-link
    Assert Element Contains    a   data-test    item-4-title-link   Sauce Labs Backpack

I proceed with the checkout
    [Documentation]    Proceed with the checkout process and verify each step.
    Click On Element    button    data-test    checkout
    Check Url    https://www.saucedemo.com/checkout-step-one.html
    Assert Element Visible    input    data-test    firstName
    Assert Element Visible    input    data-test    lastName
    Assert Element Visible    input    data-test    postalCode
    Enter Data    data-test    firstName    ${firstName}
    Enter Data    data-test    lastName    ${lastName}
    Enter Data    data-test    postalCode    ${phoneNumber}
    Click On Element    input    data-test    continue
    Check Url    https://www.saucedemo.com/checkout-step-two.html
    Check price value consistency
    Click On Element    button    data-test    finish
    Check Url    https://www.saucedemo.com/checkout-complete.html
    Assert Element Visible    h2    data-test   complete-header

I check that the products are sorted properly
    [Documentation]    Verify the sorted order of products.
    [Arguments]    ${sorted_by}
    @{list_of_prices}    Create List
    ${number_of_el_displayed}    Get Element Count    //div[contains(@class,'cart_item')]//div[contains(@data-test,'inventory-item-price')]
    FOR    ${counter}    IN RANGE    1    ${number_of_el_displayed}    
        ${price}    Fetch Element and convert String to Float    //div[contains(@class,'cart_item')]//div[contains(@data-test,'inventory-item-price')]    $
        Append To List    @{list_of_prices}    ${price}
    END
    Check List order    ${list_of_prices}    ${sorted_by}

I am able to see the correct details of the choosen product
    [Documentation]    Verify the details of the chosen product.
    [Arguments]    ${product_name}
    Wait Until Keyword Succeeds    10    30ms    Click Element    //div[contains(@class,'inventory_item_name ') and contains(text(),"${product_name}")]
    Check Url    https://www.saucedemo.com/inventory-item.html?id=0
    Assert Element Contains    div    class    inventory_details_name large_size    ${product_name}
    Assert Element Visible    div    class    inventory_details_desc large_size
    Assert Element Visible    img    class    inventory_details_img
    Assert Element Visible    div    class    inventory_details_price
    Assert Element Contains    div    class    inventory_details_price    $9.99
    Assert Element Visible    button    id    add-to-cart
    Element Should Be Enabled    //button[contains(@id, 'add-to-cart')]

I can add the product to the cart
    [Documentation]    Add the product to the cart and verify the cart badge.
    Click On Element    button    id    add-to-cart
    Assert Element Visible    span    class    shopping_cart_badge
    Assert Element Contains    span    class    shopping_cart_badge    1

I can see the choosen product in the cart
    [Documentation]    Verify the chosen product in the cart.
    [Arguments]    ${previously_selected_product}
    Click On Element    a    class    shopping_cart_link
    Check Url    https://www.saucedemo.com/cart.html
    @{products}    Get WebElements    //div[@class='cart_item']
    ${basket_length}    Get Length    ${products}
    @{product_names}    Create List
    FOR    ${index}    IN RANGE    ${basket_length}
        ${element}    Get Text    (//div[contains(@class,'inventory_item_name')])[${index+1}]
        Append To List    ${product_names}    ${element}
    END
    Should Be Equal As Strings    ${previously_selected_product}    ${product_names[0]} 
    Assert Element Contains    span    class    shopping_cart_badge    ${basket_length}

# Helper keywords

Open Url and Maximise    
    [Documentation]    Open a URL and maximize the browser window.
    [Arguments]    ${url_to_open}
    Open Browser    ${url_to_open}    service_log_path=${{os.path.devnull}}
    Maximize Browser Window 

Click On Element
    [Documentation]    Click on an element based on HTML tag and attribute.
    [Arguments]    ${html_tag}    ${attr_name}    ${attr_value}
    Wait Until Element Is Visible    //${html_tag}\[contains(@${attr_name}, "${attr_value}")]    timeout=10
    Element Should Be Visible    //${html_tag}\[contains(@${attr_name}, "${attr_value}")]
    Wait Until Keyword Succeeds    10s    300ms    Click Element   //${html_tag}\[contains(@${attr_name}, "${attr_value}")]  

Enter Data
    [Documentation]    Enter data into an input field and check if the value has been entered correctly
    [Arguments]    ${attr_name}    ${attr_value}    ${text_to_enter}
    Input Text    //input[contains(@${attr_name}, "${attr_value}")]    text=${text_to_enter}
    ${input_value}    Get Value    //input[contains(@${attr_name}, "${attr_value}")]
    Should Be Equal    ${text_to_enter}    ${input_value}

Check Url
    [Documentation]    Check the current URL against an expected one
    [Arguments]    ${expected}
    ${url}=   Get Location
    Should Be Equal    ${url}    ${expected}

Assert Element Visible
    [Documentation]    Assert an element is visible based on HTML tag and attribute.
    [Arguments]    ${html_tag}    ${attr_name}    ${attr_value}
    Wait Until Element Is Visible    //${html_tag}\[contains(@${attr_name}, "${attr_value}")]    timeout=10
    Element Should Be Visible    //${html_tag}\[contains(@${attr_name}, "${attr_value}")]

Assert Element Contains
    [Documentation]    Assert an element contains specific text.
    [Arguments]    ${html_tag}    ${attr_name}    ${attr_value}    ${expected_value}
    Wait Until Element Is Visible    //${html_tag}\[contains(@${attr_name}, "${attr_value}")]    timeout=10
    Element Should Contain   //${html_tag}\[contains(@${attr_name}, "${attr_value}")]    ${expected_value}

Pick option from List
    [Documentation]    Select an option from a list and assert if it has been selected correctly
    [Arguments]    ${html_tag}    ${attr_name}    ${attr_value}    ${option_to_select}
    Wait Until Element Is Visible    //${html_tag}\[contains(@${attr_name}, "${attr_value}")]    timeout=10
    Select From List By Value    //${html_tag}\[contains(@${attr_name}, "${attr_value}")]       ${option_to_select}
    List Selection Should Be    //${html_tag}\[contains(@${attr_name}, "${attr_value}")]       ${option_to_select}

Fetch Element and convert String to Float
    [Documentation]    Fetch element text and convert to float.
    [Arguments]    ${element_xpath}    ${element_to_remove}
    ${string_to_convert}    Get Text    ${element_xpath}
    ${cleaned_string}    Remove String    ${string_to_convert}    ${element_to_remove}    
    ${converted_data}    Convert To Number    ${cleaned_string}
    RETURN    ${converted_data}

Check price value consistency
    [Documentation]    Check the consistency of prices values during checkout.
    ${first_price}    Fetch Element and convert String to Float    (//div[contains(@class,'cart_item')]//div[contains(@data-test,'inventory-item-price')])[1]    $  
    ${second_price}    Fetch Element and convert String to Float    (//div[contains(@class,'cart_item')]//div[contains(@data-test,'inventory-item-price')])[2]    $
    ${total_without_tax}    Fetch Element and convert String to Float    //div[contains(@data-test, "subtotal-label")]    Item total: $
    ${tax}    Fetch Element and convert String to Float    //div[contains(@data-test, 'tax-label')]    Tax: $
    ${total_sum}    Fetch Element and convert String to Float    //div[contains(@class,'summary_total_label')]    Total: $

    ${status_price_products}    Evaluate    ${first_price}+${second_price}==${total_without_tax}
    Run Keyword If    not ${status_price_products}    Fail    The product prices sum is not equal to their anticipated value    
    ${status_checkout_sum}    Evaluate    round(${total_without_tax}+${tax},2)==${total_sum}
    Run Keyword If    not ${status_checkout_sum}    Fail    The final sum is not equal to the sum of the prices plus the tax    

Check List order
    [Documentation]    Check the order of a list.
    [Arguments]    ${list_to_check}    ${sorted}
    ${length}=    Get Length    ${list_to_check}
    FOR     ${i}    IN RANGE    ${length-1}
        ${first}=    Set Variable    ${list_to_check}[${i}]
        ${second}=   Set Variable    ${list_to_check}[${i+1}]
        Run Keyword If    ${sorted}==hilo
        ...   Run Keyword If    ${first} <= ${second}    Fail    Element ${first} is not greater than ${second}.
        ...  ELSE IF    ${sorted}==lohi
        ...    Run Keyword If    ${first} >= ${second}    Fail    Element ${first} is not smaller than ${second}.
        ...  ELSE
        ...      Fail    "The ${sorted} has an unsupported value"
    END

Clean Browser
    [Documentation]    Clean the browser by deleting all cookies and closing all browsers.
    Delete All Cookies
    Close All Browsers
