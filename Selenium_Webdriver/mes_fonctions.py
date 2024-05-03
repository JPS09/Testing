moment_to_sixties = lambda age: 60 - age

def sayGoodBye(prenom, nom):
    print(f'Well good bye {prenom} {nom}')

def checkAge(prenom, nom, age):
    if age > 35 :
        time_to_sixtie = moment_to_sixties(age)
        donnees = [prenom, nom, time_to_sixtie]
        return donnees
    elif age == 35:
        time_to_sixtie = moment_to_sixties(age)
        donnees = [prenom, nom, time_to_sixtie]
        return donnees
    else:
        time_to_sixtie = moment_to_sixties(age)
        donnees = [prenom, nom, time_to_sixtie]
        return donnees

def continuer(rep):
    while rep:
        saisie = input("Continuer? Y/N ")
        if saisie == 'Y' or 'y':
            continue
        elif saisie == 'N' or 'n':
            rep = False
        else:
            print('What you are saying? ')
