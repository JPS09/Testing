*** Settings ***
Library     SeleniumLibrary
Library     Collections
Resource    Variables.robot


*** Keywords ***
Open and Maximise
    [Arguments]    ${url_to_open}
    Open Browser    ${url_to_open}    service_log_path=${{os.path.devnull}}
    Maximize Browser Window

Search
    [Arguments]    ${searchData}
    Input Text    //input[contains(@id, "search")]    "${searchData}"
    Wait Until Keyword Succeeds
    ...    10s
    ...    300ms
    ...    Click Element
    ...    //button[contains(@class, "btn btn--reset form-icon js-search__icon")]

Click On Element
    [Arguments]    ${html_tag}    ${attr_name}    ${attr_value}
    Wait Until Element Is Visible    //${html_tag}\[contains(@${attr_name}, "${attr_value}")]    timeout=10
    Wait Until Keyword Succeeds
    ...    10s
    ...    300ms
    ...    Click Element
    ...    //${html_tag}\[contains(@${attr_name}, "${attr_value}")]

Enter Data
    [Arguments]    ${attr_name}    ${attr_value}    ${text_to_enter}
    Input Text    //input[contains(@${attr_name}, "${attr_value}")]    text=${text_to_enter}
    ${input_value}    Get Value    //input[contains(@${attr_name}, "${attr_value}")]
    Should Be Equal    ${text_to_enter}    ${input_value}

Get First Visible WebElement
    [Arguments]    ${xpath_of_the_elements}
    @{elements}    Get WebElements    ${xpath_of_the_elements}
    ${visible_element}    Set Variable
    FOR    ${element}    IN    @{elements}
        Log    ${element}
        ${disp_attr}    Get Element Attribute    ${element}    css:display
        IF    '${disp_attr}' != 'none'
            ${visible_element}    Set Variable    ${element}
            BREAK
        END
    END
    RETURN    ${visible_element}

Click on Element with Ratings
    ${visible_element}    Get First Visible WebElement    ${xpath_select_first_element_with_rating}
    ${status}    Run Keyword And Return Status    Wait Until Element Is Visible    ${visible_element}    15

    IF    '${status}'=='True'
        Click Element    ${xpath_select_first_element_with_rating}
    ELSE
        Fail    "Couldn't proceed, status: ${status}"
    END

Get Product Name
    ${product_name}    Get Text    //h1[contains(@itemprop,"name")]
    RETURN    ${product_name}

Add Product from Detail Page
    [Documentation]    Add a product that has a rating and fetch it's title for later use
    [Arguments]    ${list_of_products_to_search}

    @{fetched_product_names_list}    Create List

    FOR    ${element}    IN    @{list_of_products_to_search}
        Enter Data    id    search    ${element}
        ${search_button}    Get WebElement    //button[contains(@class,"js-search__icon")]
        Execute Javascript    arguments[0].click();    ARGUMENTS    ${search_button}
        Click on Element with Ratings
        ${product_name}    Get Product Name
        Append To List    ${fetched_product_names_list}    ${product_name}
        Click On Element    input    id    fpAddBsk
    END
    RETURN    ${fetched_product_names_list}

Fetch Basket Product Names
    [Documentation]    Fetch the product name for comparison
    [Arguments]    ${basket_url}

    Go To    ${basket_url}
    Wait Until Element Is Visible    //div[contains(@class,'bProductLineDescTitle')]/a
    @{products}    Get WebElements    //div[contains(@class,'bProductLineDescTitle')]/a
    ${basket_length}    Get Length    ${products}
    @{products_names}    Create List

    FOR    ${index}    IN RANGE    ${basket_length}
        ${element}    Get Text    (//div[contains(@class,'bProductLineDescTitle')]/a)[${index+1}]
        Append To List    ${products}    ${element}
    END

    RETURN    ${products_names}

Compare Lists
    [Arguments]    ${first_list}    ${second_list}
    FOR    ${element_first_list}    IN    @{first_list}
        FOR    ${element_second_list}    IN    @{second_list}
            Should Be True
            ...    '${element_first_list}'=='${element_second_list}'
            ...    "${element_first_list}" is not equal to "${element_second_list}"
        END
    END

Product list should be X element long
    [Arguments]    ${element_to_search_xpath}
    @{fetched_elements}    Create List
    # ${int_nbr}    Convert To Integer    ${nbr_of_element}
    # ${int_nbr}    Set Variable    ${int_nbr}+1
    # ${int_nbr_rng}    Convert To String    ${int_nbr}
    # //div[contains(@role, "list")]//span[contains(@class, "c-filter__label")]
    FOR    ${index}    IN RANGE    1    11
        ${element}    Get Text    (//h2[contains(@class,'alt-h4 u-line-clamp--2')])[${index}]
        Append To List    ${fetched_elements}    ${element}
    END
    Length Should Be    ${fetched_elements}    10

Log-In
    [Arguments]    ${user_name}    ${user_password}
    Click On Element    div    class    c-access__compte js-access__compte
    Wait Until Keyword Succeeds
    ...    10s
    ...    300ms
    ...    Enter Data
    ...    id
    ...    CustomerLogin_CustomerLoginFormData_Email
    ...    ${cdiscount_email}
    Wait Until Keyword Succeeds
    ...    10s
    ...    300ms
    ...    Enter Data
    ...    id
    ...    CustomerLogin_CustomerLoginFormData_Password
    ...    ${cdiscount_pwd}
    Click On Element    input    value    Se connecter

Check if Logged In
    ${is_connected?}    Run Keyword And Return Status
    ...    Wait Until Element Is Visible
    ...    //span[contains(@class, "btn-access__label") and contains(text(),"Mon compte")]
    IF    ${is_connected?}
        Click On Element    div    class    c-access__compte js-access__compte
        Wait Until Element Is Visible    //span[contains(@class, "welcomeclientFont welcomeclientBold")]
        Element Should Contain
        ...    //span[contains(@class, "welcomeclientFont welcomeclientBold")]
        ...    ${cdiscount_usrname}
    ELSE
        RETURN    ${False}
    END

Clean Browser
    Delete All Cookies
    Close All Browsers
