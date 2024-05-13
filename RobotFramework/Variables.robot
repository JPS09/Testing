*** Variables ***
${user_email}                                   user@user.com
${user_pswd}                                    useruser
@{list_of_products_to_search}                   ${product1}    ${product2}
${product1}                                     ecran pc incurvé
${product2}                                     clavier
${sort_by_value}                                4
${option_displayed}                             Les plus utiles
${xpath_select_first_element_with_rating}       (//ul[contains(@id,"lpBloc")]//li[not(contains(@style,'display:'))]//span[contains(@class, 'c-stars-rating c-stars-rating--small')]/../..//h2)
${cdiscount_email}                              qamha.automatisation@gmail.com
${cdiscount_pwd}                                Aa123456!
${cdiscount_usrname}                            MHA
