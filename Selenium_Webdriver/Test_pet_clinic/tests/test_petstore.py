import pytest
import pytest_bdd
from pytest_bdd import parsers
import time
from selenium import webdriver 
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from pytest_bdd import scenario, given, then, when

from pages import signup_page


@pytest.fixture
def browser():
    driver = webdriver.Firefox()
    yield driver
    driver.quit()


@scenario('../features/add_user.feature', 'Adding a new user')
def test_add_user():
    pass


@given('I am on the homepage')
def open_home_page(browser):
    browser.get('https://spring-framework-petclinic-qctjpkmzuq-od.a.run.app/')
    url = browser.current_url
    assert url == "https://spring-framework-petclinic-qctjpkmzuq-od.a.run.app/"

@when('I click on the find user')
def click_on_button(browser):
    element = signup_page.search_link_by_href(browser, '/owners/find')
    #element = browser.find_element(By.XPATH, c" )
    assert element
    element.click()
    time.sleep(5)
    

@when('I click on the Add Owner')
def click_on_button(browser):
    input = signup_page.search_link_by_href(browser, '/owners/new')
    input.click()


@then("I am on the Add Owner Page")
def check_page(browser):
    url = browser.current_url
    assert "https://spring-framework-petclinic-qctjpkmzuq-od.a.run.app/owners/new" in url

@then(parsers.parse('I Enter {firstName} into the {input_id} input {input_type}'))
def search_element(browser, firstName, input_id, input_type):
    input = signup_page.search_input_by_id(browser, input_id)
    assert input.get_attributes("type") == input_type
    input.send_keys(firstName)
    assert input.get_attributes("value") == firstName

@then(parsers.parse('I Enter "{Petlover}" into the {lastName} input {text}'))
def search_element(browser, firstName, input_id, input_type):
    input = signup_page.search_input_by_id(browser, input_id)
    assert input.get_attributes("type") == input_type
    input.send_keys(firstName)
    assert input.get_attributes("value") == firstName

@then(parsers.parse("I Enter {1 rue de Lyon} into the {address} input {text}"))
def search_element(browser, firstName, input_id, input_type):
    input = signup_page.search_input_by_id(browser, input_id)
    assert input.get_attributes("type") == input_type
    input.send_keys(firstName)
    assert input.get_attributes("value") == firstName

@then(parsers.parse('I Enter {Toulouse} into the {city} input {text}'))
def search_element(browser, firstName, input_id, input_type):
    input = signup_page.search_input_by_id(browser, input_id)
    assert input.get_attributes("type") == input_type
    input.send_keys(firstName)
    assert input.get_attributes("value") == firstName

@then(parsers.parse('I Enter {0600000000} into the {telephone} input {text}'))
def search_element(browser, firstName, input_id, input_type):
    input = signup_page.search_input_by_id(browser, input_id)
    assert input.get_attributes("type") == input_type
    input.send_keys(firstName)
    assert input.get_attributes("value") == firstName