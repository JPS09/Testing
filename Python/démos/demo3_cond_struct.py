def age_test():
    age = int(input("Ta kel age poto ?"))

    if age <= 0:
        print("Tu n'existe pas")
        return

    if age >= 21:
        print('Vieux des USA')
    elif age >= 18:
        print('Vieux Français')
    else:
        print('Spèce de gosse')


age_test()
