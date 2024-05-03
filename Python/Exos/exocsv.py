import csv
path = 'Exos/csvwrite.csv'


def read_csv():
    with open(path, mode='r', encoding='UTF-8') as fichier:
        reader = csv.reader(fichier, delimiter=";")
        for row in reader:
            print(row)


def write_csv(data: list):
    with open(path, mode='a', encoding='UTF-8', newline='') as fichier:
        writer = csv.writer(fichier, delimiter=';')
        writer.writerow(data)


def ask_user_for_data():
    new_product = []
    title = input('Enter the product name ')
    price = float(input('Enter the product Price '))
    Stock = float(input('Enter how many element are available '))
    new_product.extend([title,price,Stock])
    return new_product


def main():
    print("-----Welcome to the Product menu -----")
    print("Press 1 To show data")
    print("Press 2 to enter new data")
    print("Press 0 to exit")

    choice = input("Please choice between 1 and 2 ")

    while True:
        match choice:
            case "1":
                read_csv()
            case "2":
                data = ask_user_for_data()
                write_csv(data)
            case "0":
                print("You have now chosen to exit, please take the door with you")
                break
            case _:
                print("This is not a valid choice")
        print("-----Welcome to the Product menu -----")
        print("Press 1 To show data")
        print("Press 2 to enter new data")
        print("Press 0 to exit")
        choice = input("Please choice between 1,2 and 0 ")

main()