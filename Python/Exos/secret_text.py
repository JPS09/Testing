import os

path = "Exos/bidule.txt"

def write_file():
    if not os.path.exists(path):
        data = input("what do you want to add ? ")
        with open(path, 'w', encoding='UTF-8') as fichier:
            fichier.write(data)
    else:
        print('You need to add a new entry ')
        data = input("what do you want to add ? ")
        with open(path, 'w', encoding='UTF-8') as fichier:
            fichier.write(data)
    
def read_file():
    if os.path.exists(path):
        with open(path, 'r', encoding='UTF-8') as fichier:
            contenu = fichier.read()
            print(contenu)
    else:
        print('You need to add a new entry ')
        write_file()

def menu():
    while True:
        print("1. Show the biggest secret of the world ")
        print("2. Change that secret since the previous one wasn't a great idea ")
        print("3. Run away from the FBI ")
        choice = input("What do you want to do ? ")
        match choice:
            case "1":
                read_file()
            case "2":
                write_file()
            case '3':
                exit()
            case '_':
                print('This choice is not valid')

menu()