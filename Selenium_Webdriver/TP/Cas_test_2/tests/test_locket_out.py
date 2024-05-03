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

@scenario("../features/locked_out_account.feature",'Try login as Locked out user')
def test_check_locked_out_account():
    pass

@given('I am on the login page')
def open_browser(browser):
    url = browser.get('https://www.saucedemo.com/')
    url = browser.current_url
    assert "https://www.saucedemo.com/" in url

@when('I type "locked_out_user" in the "user-name" input')
def enter_data_input(browser, ):
    input = browser.find_element(By.XPATH, "//input[contains(@id, 'user-name')]")
    input.send_keys("locked_out_user")
    assert input.get_attribute("value") =='locked_out_user'

@when(parsers.parse('I type "secret_sauce" in the "password" input'))
def enter_data_input(browser):
    input = browser.find_element(By.XPATH, f"//input[contains(@id,'password')]")
    input.send_keys('secret_sauce')
    assert input.get_attribute("value") == 'secret_sauce'

@when('I click on the logIn button')
def click_on_login_button(browser):
    browser.find_element(By.XPATH, f"//input[contains(@id,'login-button')]").click()

@then('I should see an error message')
def check_error_message(browser):
    url = browser.current_url
    assert "https://www.saucedemo.com/" in url
    error = browser.find_element(By.XPATH, "//div[contains(@class, 'error')]")
    assert error.text == "Epic sadface: Sorry, this user has been locked out."