annuaire = [{"id": 1,
             "num_voie": 14,
             "complement": "mdr",
             'intitule_voie': "ruething",
             "commune": "ommune",
             "code_postal": 59632}]


def insert_data(annuaire: list, num_voie, intitule_voie, complement, commune, code_postal):
    template = {"id": 1,
                "num_voie": num_voie,
                "complement": complement,
                'intitule_voie': intitule_voie,
                "commune": commune,
                "code_postal": code_postal}
    if annuaire != []:
        last_id = annuaire[-1]["id"]
        last_id += 1
        template["id"] = last_id
    annuaire.append(template)
    return template


def ask_user_for_data():
    num_voie = int(input("Quelle est le numéro de la voie? "))
    intitule_voie = input("quel est la rue ? ")
    complement = input("quel est le complément d'adresse? ")
    commune = input("Dans quel commune logez-vous ? ")
    code_postal = int(input("quel est le code postal"))
    return num_voie, intitule_voie, complement, commune, code_postal


def show_annuaire(annuaire: list):
    for e in annuaire:
        print(f"id:{e["id"]}, Numéro de voie: {e['num_voie']}, Complément d'adresse {e['complement']}, Intitulé de la voie : {
            e['intitule_voie']}, Commune:  {e['commune']}, Code ostal: {e['code_postal']}")


def delete_data(annuaire: list):
    if annuaire == []:
        print('The annuaire is empty')
        exit()
    for person in annuaire:
        print(person['id'])
        print(f"id:{person["id"]}, num_voie: {person['num_voie']},complement: {person['complement']}, intitule_voie: {
            person['intitule_voie']}, commune: {person['commune']}, code_postal: {person['code_postal']}")
        choose = int(input("Select the id of the adresse you want to delete"))
        annuaire.pop(choose-1)


def user_interface(annuaire: list):
    print("----- Bienvenue dans le menu du meilleur annuaire du monde -----")
    print("Appuyez sur 1 pour ajouter une nouvelle entrée")
    print("Appuyez sur 2 pour editer une entrée")
    print("Appuyez sur 3 pour supprimer une entrée existante")
    print("Appuyez sur 4 visualiser les entrées existantes")

    choice = input("Please choice between 1, 2 ,3 and 4 ")

    while True:
        match choice:
            case "1":
                num_voie, intitule_voie, complement, commune, code_postal = ask_user_for_data()
                insert_data(annuaire, num_voie, intitule_voie,
                            complement, commune, code_postal)
            case "2":
                pass
            case "3":
                delete_data(annuaire)
            case "4":
                show_annuaire(annuaire)
            case"5":
                print("You have now chosen to exit, please take the door with you")
                break
            case _:
                print("This is not a valid choice")
        choice = input("Please choice between 1, 2 ,3 and 4 ")


user_interface(annuaire)

for choice in ("12345"):
    print(choice)