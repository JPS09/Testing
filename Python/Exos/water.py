def state_of_water():
    temp_water = int(input("Quelle est la température de l'eau ?"))
    match temp_water:
        case _ if temp_water < 0:
            print("L'eau est SOLIDE")
        case _ if 0 >= temp_water <= 100:
            print("L'eau est LIQUIDE")
        case _ if temp_water > 100:
            print("L'eau est GAZEUSE")


state_of_water()
