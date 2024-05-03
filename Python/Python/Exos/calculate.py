def calculate(nb1: float, nb2: float):
    sum = nb1 + nb2
    substract = nb1 - nb2
    divide_and_conquer = nb1/nb2
    multiply = nb1 * nb2
    return sum, substract, divide_and_conquer, multiply


def menu():
    number_1 = float(input("Enter your first number "))
    number_2 = float(input("Enter your second number "))

    sum, substraction, divide, multiply = calculate(number_1, number_2)

    print("-----Welcome to the math menu -----")
    print("Press 1 To show the results")
    print("Press 2 to exit")

    choice = input("Please choice between 1 and 2 ")

    while True:
        match choice:
            case "1":
                print(f"The sum is {sum}, the substraction resulted in {
                      substraction} the division returned {divide} and multiplying gives {multiply}")
            case "2":
                print("You have now chosen to exit, please take the door with you")
                break
            case _:
                print("This is not a valid choice")
        choice = input("Please choice between 1 and 2 ")

menu()