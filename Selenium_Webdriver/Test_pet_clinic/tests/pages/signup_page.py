from selenium.webdriver.common.by import By

def search_link_by_href(browser, href_link):
    return browser.find_element(By.XPATH, f"//a[contains(@href,'{href_link}')]")

def search_input_by_id(browser,input_id):
    return browser.find_element(By.XPATH, f"//input[contains(@id,'{input_id}')]")

def enter_data_into_input(browser, input_id, data):
    element = browser.find_element(By.XPATH, f"//input[contains(@id,'{input_id}')]")
    element.send_keys(data)

