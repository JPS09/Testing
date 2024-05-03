def soustraire(a: int, b: int):
    if not isinstance(a, int) or not isinstance(b, int):
        print("Ceci ne sont pas des valeurs valables")
        exit()
    print(f"La soustraction de {a} et {b} est {a-b}")
    return a-b
