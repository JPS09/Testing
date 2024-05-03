def age_test():
    age = int(input("Quel est ton âge ?"))

    if age <= 0:
        print("Tu n'existe pas")
        return

    if age >= 21:
        print('Adult from the USA')
    elif age >= 18:
        print('Adulte de France')
    else:
        print('Tu es un enfant, tu auras un soda')


age_test()
