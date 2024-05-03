import pytest
import pytest_bdd
from pytest_bdd import parsers

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from pytest_bdd import scenario, given, then, when

@pytest.fixture
def browser():
    driver = webdriver.Firefox()
    yield driver
    driver.quit()

@scenario("../features/standard_account.feature",'Verify the presence of logIn inputs')
def test_check_standard_account():
    pass

@given('I am on the login page')
def open_browser(browser):
    url = browser.get('https://www.saucedemo.com/')
    url = browser.current_url
    assert "https://www.saucedemo.com/" in url

@then('I should see the "username" input "text" is present and enabled')
def check_input(browser):
    assert browser.find_element(By.XPATH, f"//input[contains(@id,'user-name')]")

@then('I should see the "password" input "text" is present and enabled')
def check_input(browser):
    assert browser.find_element(By.XPATH, f"//input[contains(@id,'password')]")

@then('I should see the enabled "log-in button" de type "submit"')
def check_button(browser):
    assert browser.find_element(By.XPATH, f"//input[contains(@id,'login-button')]").is_enabled()

@scenario("../features/standard_account.feature",'The user is able to enter data in the fields')
def test_check_enter_data():
    pass

@then('I should be able to type "standard_user" into the "username" input "text"')
def enter_data_input(browser):
    input = browser.find_element(By.XPATH, f"//input[contains(@id,'user-name')]")
    input.send_keys("standard_user")
    assert input.get_attribute("value") == "standard_user"

@then('I should be able to type "secret_sauce" into the "password" input "text"')
def enter_data_input(browser):
    input = browser.find_element(By.XPATH, f"//input[contains(@id,'password')]")
    input.send_keys("secret_sauce")
    assert input.get_attribute("value") == "secret_sauce"

@scenario("../features/standard_account.feature",'The user should be redirected to the product page after connection')
def test_check_user_redirected():
    pass

@then('I should be able to click on the "log-in button" de type "submit"')
def click_on_login_button(browser):
    browser.find_element(By.XPATH, f"//input[contains(@id,'login-button')]").click()

@then('I should be redirected to the "product" page')
def redirected_after_click(browser):
    url = browser.current_url
    assert "https://www.saucedemo.com/inventory.html" in url

@then('I should be able to click on the burger menu')
def click_on_burger_menu(browser):
    burger = browser.find_element(By.ID, 'react-burger-menu-btn')
    assert burger
    burger.click()

@then('I should see the *logOut* button')
def check_logout_button(browser):
    button = browser.find_element(By.ID, 'logout_sidebar_link')
    assert button

@scenario("../features/standard_account.feature",'The user should be able to disconnect')
def test_check_user_disconnected():
    pass


@given('I am on the product page')
def log_in_user(browser):
    browser.get('https://www.saucedemo.com/')
    input1 = browser.find_element(By.XPATH, f"//input[contains(@id,'user-name')]")
    input1.send_keys("standard_user")
    input2 = browser.find_element(By.XPATH, f"//input[contains(@id,'password')]")
    input2.send_keys("secret_sauce")
    browser.find_element(By.XPATH, f"//input[contains(@id,'login-button')]").click()
    url = browser.current_url
    assert "https://www.saucedemo.com/inventory.html" in url

@then('I should see be able to click the *logOut* button')
def click_on_logout_button(browser):
    button = browser.find_element(By.ID, 'logout_sidebar_link')
    assert button
    button.click()

@then('i should be redirected to the logIn page')
def redirected_to_login(browser):
    url = browser.current_url
    assert "https://www.saucedemo.com/" in url