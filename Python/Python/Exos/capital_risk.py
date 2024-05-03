def test():
    c = float(input("What do you want to invest, money only ? "))
    t = float(input('At what rate do you want your money to grow ? '))
    double_c = c * 2
    money_on_trees = 0
    nb_year = 1

    while money_on_trees < double_c:
        nb_year += 1
        print(f"{nb_year} year")
        money_on_trees = c * (1+(t/100)) ** nb_year

    print(f"it took {nb_year} to double that capital to end up with {
          money_on_trees}")


test()
