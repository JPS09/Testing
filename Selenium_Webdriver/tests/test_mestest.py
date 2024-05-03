import pytest
import pytest_bdd
from pytest_bdd import parsers

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from pytest_bdd import scenario, given, then, when

global compare_value


@pytest.fixture
def browser():
    driver = webdriver.Firefox()
    yield driver
    driver.quit()


@scenario('features/contact_form.feature', "Verify the presence of the input field")
def test_input_field_presence():
    pass

# Si même given sur plusieurs scénario, pas besoin de le répéter


@given('I am on the contact page')
def open_contact_page(browser):
    browser.get(
        'file:///C:/Users/Administrateur/Downloads/Code_is_good_code_is_life/Tests/Selenium_Webdriver/html/contact.html')


@then(parsers.parse('I should see the "{field_name}" input field "{field_type}"'))
def see_input_field(browser, field_name, field_type):
    assert browser.find_element(
        By.NAME, field_name).get_attribute('type') == field_type


@scenario('features/contact_form.feature', "Verify input field is disabled")
def test_input_field_disabled():
    pass


@then('I should see the "id_nom_user" is disabled')
def see_input_field_disabled(browser):
    assert browser.find_element(
        By.NAME, "id_nom_user").get_property("disabled")


@then('I should see the "id_prenom_user" is enabled')
def see_prenom_field_enabled(browser):
    assert browser.find_element(By.NAME, "id_prenom_user").is_enabled()
# @then('I should see the "id_prenom_user" input field "text"')
# def see_input_field(browser):
#     assert browser.find_element(By.ID, "id_prenom_user").is_displayed()

# @then('I should see the "id_subject" input field "text"')
# def see_input_field(browser):
#     assert browser.find_element(By.ID, "id_subject").is_displayed()


@scenario('features/contact_form.feature', "Verify label text")
def test_label_text():
    pass


@then('I should see the "id_nom_user" label is equal to "Votre Nom"')
def see_label_content(browser):
    assert browser.find_element(
        By.XPATH, "//label[@for='id_nom_user']").text == "Votre Nom"


@scenario('features/contact_form.feature', "Write in a field")
def test_message_field():
    pass


@then('I can write "Writing things" in the field "message"')
def write_in_message_field(browser):
    element = browser.find_element(By.XPATH, "//textarea[@id='message']")
    element.send_keys("writing Things")
    assert element.get_attribute('value') == "writing Things"


@scenario('features/contact_form.feature', "I can change page")
def test_page_switch():
    pass


@given('I am on the index page')
def open_index_page(browser):
    browser.get(
        'file:///C:/Users/Administrateur/Downloads/Code_is_good_code_is_life/Tests/Selenium_Webdriver/html/index.html')


@when('I click on the contact link')
def click_on_contact_link(browser):
    element = browser.find_element(
        By.XPATH, "//a[contains(@href,'contact.html')]")
    assert element
    element.click()


@then("I am redirected on the contact page")
def redirected_on_contact_page(browser):
    url = browser.current_url
    assert "contact.html" in url


@scenario('features/contact_form.feature', "Compare values on two pages")
def test_compare_values():
    pass


@given('I am on the index page with a value to Compare')
def open_index_page(browser):
    browser.get(
        'file:///C:/Users/Administrateur/Downloads/Code_is_good_code_is_life/Tests/Selenium_Webdriver/html/index.html')
    global compare_value
    compare_value = browser.find_element(By.TAG_NAME, 'h2').text


@then('The values are equal')
def check_values(browser):
    second_value = browser.find_element(By.TAG_NAME, 'h2').text
    assert compare_value == second_value


@scenario('./features/contact_form.feature', "I can select a fruit")
def test_select_fruit(): 
    pass 

@then('I can select mango on the fruits dropdown')
def select_from_dropdown(browser):    
    fruitsSelection = Select(browser.find_element(By.ID, 'fruits'))    
    fruitsSelection.select_by_value('mango')
