# list = list(range(1, 11))
# print(list)

# list_of_things = []
# for iter in range(1, 16):
#     usr_input = input(f"What do you want to remember, question {iter} ")
#     list_of_things.append(usr_input)

# print(f" Here is your list {list_of_things}")


def calcul_moyenne():
    usr_finished = False
    array_of_grades = []
    while usr_finished == False:
        try:
            usr_input = input(f"What grade do you want to add ? ")
            if len(usr_input) > 0:
                converted_input = float(usr_input)
            elif len(usr_input) == 0:
                raise ValueError("You can't enter nothing! Please enter a value!")
            if (0 <= converted_input <= 20):
                array_of_grades.append(converted_input)
            if converted_input > 20:
                raise ValueError(
                    "What do you plan to do ? Nobody can go above 20 in this world")
        except ValueError as e:
            print(e)
        if converted_input < 0:
            print(
                "You have entered a negative value, the program will now start calculating")
            usr_finished = True
            continue
    menu(array_of_grades)


def menu(array_of_grades: list):

    if (array_of_grades == []):
        print("There is no grade to process, end of program")
        exit()
    sorted_grades = sorted(array_of_grades)
    print("-----Welcome to the grade menu -----")
    print("Press 1 To show the Maximum grade")
    print("Press 2 to show the Minimum grade")
    print("Press 3 to show the computed Average")
    print("Press 4 to exit the program")

    choice = input("Please choice between 1, 2 ,3 and 4 ")

    while True:
        match choice:
            case "1":
                print(f"The maximum grade is {sorted_grades[-1]}/20")
            case "2":
                print(f"The minimum grade is {sorted_grades[0]}/20")
            case "3":
                print(f"The average is {sum(sorted_grades)/len(sorted_grades)}")
            case "4":
                print("You have now chosen to exit, please take the door with you")
                break
            case _:
                print("This is not a valid choice")
        choice = input("Please choice between 1, 2 ,3 and 4 ")


calcul_moyenne()

