def hello_world():
    print("Hello World")


hello_world()


def bonjour_poto_t(name: str, prenom: str):
    if not isinstance(name, str) or not isinstance(prenom, str):
        print("Ceci n'est pas valable")
        exit()
    print(f"Bien {name}, ton prénom est validé {prenom}")


bonjour_poto_t(54, 4)
