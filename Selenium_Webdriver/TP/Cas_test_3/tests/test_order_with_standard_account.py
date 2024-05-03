import pytest
import pytest_bdd
from pytest_bdd import parsers
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from pytest_bdd import scenario, given, then, when


@pytest.fixture
def browser():
    driver = webdriver.Firefox()
    yield driver
    driver.quit()


@scenario("../features/order_products_with_standard_account.feature", 'Connect and add products to cart')
def test_connect_with_standard_account():
    pass


@given('I am on the login page')
def open_browser(browser):
    url = browser.get('https://www.saucedemo.com/')
    url = browser.current_url
    assert "https://www.saucedemo.com/" in url


@given(parsers.parse('I enter "{standard_user}" as a user-name and "{secret_sauce}" as a password'))
def enter_data_input(browser, standard_user, secret_sauce):
    input = browser.find_element(
        By.XPATH, f"//input[contains(@id,'user-name')]")
    input.send_keys(standard_user)
    assert input.get_attribute("value") == standard_user
    input = browser.find_element(
        By.XPATH, f"//input[contains(@id,'password')]")
    input.send_keys(secret_sauce)
    assert input.get_attribute("value") == secret_sauce
    browser.find_element(
        By.XPATH, f"//input[contains(@id,'login-button')]").click()


@then('I should be redirected to the product page')
def redirected_to_product_page(browser):
    url = browser.current_url
    assert "https://www.saucedemo.com/inventory.html" in url


@then('I should be able to sort the products from most expensive to cheapest')
def sort_products(browser):
    element = browser.find_element(
        By.XPATH, "//select[contains(@data-test, 'product-sort-container')]")
    select = Select(element)
    assert select
    select.select_by_value('hilo')
    hilo = browser.find_element(By.XPATH, "//option[contains(@value,'hilo')]")
    assert hilo.is_selected()


@then('Add the two first product to the cart')
def add_products(browser):
    first_element = browser.find_element(
        By.XPATH, "//button[contains(@data-test,'add-to-cart-sauce-labs-fleece-jacket')]")
    second_element = browser.find_element(
        By.XPATH, "//button[contains(@data-test,'add-to-cart-sauce-labs-backpack')]")
    assert first_element
    assert second_element
    first_element.click()
    second_element.click()

    added_element1 = browser.find_element(
        By.XPATH, "//button[contains(@data-test, 'remove-sauce-labs-fleece-jacket')]")
    added_element2 = browser.find_element(
        By.XPATH, "//button[contains(@data-test, 'remove-sauce-labs-backpack')]")
    assert added_element1
    assert added_element2
    # elements= browser.find_elements(By.XPATH, "//div[contains(@data-test,'inventory-list')]")
    # assert elements
    # first_element = elements.find_element(By.XPATH, "//a[contains(@data-test,'add-to-cart')]")
    # first_element.click()
    # second_element = elements.find_element(By.XPATH, "//a[contains(@data-test,'add-to-cart')]")
    # second_element.click()

    # first_element_remove = elements[0].find_element(By.XPATH, "//a[contains(@data-test, 'remove-sauce')]")
    # assert first_element_remove
    # second_element_remove = elements[1].find_element(By.XPATH, "//a[contains(@data-test, 'remove-sauce')]")
    # assert second_element_remove


@then('Check that the products are added to the cart')
def check_if_product_added(browser):
    cart = browser.find_element(
        By.XPATH, "//a[contains(@data-test,'shopping-cart-link')]")
    assert cart
    cart.click()

    first_element = browser.find_elements(By.ID, "item_5_title_link")
    second_element = browser.find_elements(By.ID, "item_4_title_link")
    assert first_element
    assert second_element
    # browser.implicitly_wait(10)
    # two_elements = browser.find_elements(By.XPATH, "//div[contains(@class,'cart-item')]")

    # assert len(two_elements) == 2


@scenario("../features/order_products_with_standard_account.feature", 'Enter client data and checkout 2 products')
def test_finish_order():
    pass


@given("I am logged in as a standard_user")
def log_as_standard_user(browser):
    browser.get('https://www.saucedemo.com/')
    input = browser.find_element(
        By.XPATH, f"//input[contains(@id,'user-name')]")
    input.send_keys('standard_user')
    assert input.get_attribute("value") == 'standard_user'
    input = browser.find_element(
        By.XPATH, f"//input[contains(@id,'password')]")
    input.send_keys('secret_sauce')
    assert input.get_attribute("value") == 'secret_sauce'
    browser.find_element(
        By.XPATH, f"//input[contains(@id,'login-button')]").click()


@given('I have products in my cart')
def add_products(browser):
    first_element = browser.find_element(
        By.XPATH, "//button[contains(@data-test,'add-to-cart-sauce-labs-fleece-jacket')]")
    second_element = browser.find_element(
        By.XPATH, "//button[contains(@data-test,'add-to-cart-sauce-labs-backpack')]")
    assert first_element
    assert second_element
    first_element.click()
    second_element.click()
    cart = browser.find_element(
        By.XPATH, "//a[contains(@data-test,'shopping-cart-link')]")
    assert cart
    cart.click()
    assert browser.current_url == 'https://www.saucedemo.com/cart.html'
    checkout = browser.find_element(By.ID, "checkout")
    checkout.click()


@then('I should be able to enter the user data')
def enter_user_data(browser):
    assert browser.current_url == 'https://www.saucedemo.com/checkout-step-one.html'
    input_first = browser.find_element(By.ID, 'first-name')
    input_first.send_keys('Toto')
    input_last = browser.find_element(By.ID, 'last-name')
    input_last.send_keys('Bobby')
    input_code = browser.find_element(By.ID, 'postal-code')
    input_code.send_keys('46787')
    assert input_first.get_attribute("value") == 'Toto'
    assert input_last.get_attribute("value") == 'Bobby'
    assert input_code.get_attribute("value") == '46787'
    continue_button = browser.find_element(By.ID, "continue")
    assert continue_button
    continue_button.click()


@then('Validate the order')
def validate_order(browser):
    assert browser.current_url == 'https://www.saucedemo.com/checkout-step-two.html'
    finish_button = browser.find_element(By.ID, "finish")
    assert finish_button
    finish_button.click()
    assert browser.current_url == 'https://www.saucedemo.com/checkout-complete.html'
    ending_element = browser.find_element(By.CLASS_NAME, "complete-header")
    assert ending_element
