mon_dic = {}

dict_2 = {
    "clé 1 ": "incredible",
    True: False,
    2: 1
}

person = {
    "Prénom": "JP",
    "Nom": "Sym",
    "âge": "OLD"
}


print(f'prénom {person["Prénom"]}')

person["âge"] = 95

person["argent"] = 0


del person["Nom"]
person.popitem()

person1 = {
    "Prénom": "Luffy",
    "Nom": "Chapo",
    "âge": 23
}

person2 = {
    "Prénom": "Bidule",
    "Nom": "Teubé",
    "âge": 3
}


person3 = {
    "Prénom": "PJ",
    "Nom": "Mail",
    "âge": 19564
}

for cle, valeur in person.items():
    print(cle, valeur)
