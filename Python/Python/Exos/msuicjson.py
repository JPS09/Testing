import json
import os
path = "Exos/music.json"


def write_in_json(path: str, data: dict):
    listel = []
    if os.path.exists(path):
        with open(path, 'r', encoding='utf8') as fichier:
            listel = json.load(fichier)
            listel.append(data)
        with open(path, 'w', encoding='utf8') as fichier:
            json.dump(listel,
                      fichier, indent=4, ensure_ascii=False, separators=(',', ': '))
    else:
        with open(path, 'a+', encoding='utf8') as fichier:
            listel.append(data)
            json.dump(listel,
                      fichier, indent=4, ensure_ascii=False, separators=(',', ': '))
    return True


def read_json(path: str):
    if os.path.exists(path):
        with open(path, 'r', encoding='utf8') as fichier:
            data = json.load(fichier)
            print(data)
        return True
    else:
        print("The file doesn't exist yet")
        return False


def ask_user_for_data():
    new_product = {}
    new_product['song_name'] = input('Enter the song name ')
    new_product['artist'] = input('Enter the artist ')
    new_product['type_of_music'] = input('Enter the type of music ')
    new_product['score'] = int(input('Enter the score '))
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
                if not read_json(path):
                    data = ask_user_for_data()
                    write_in_json(path, data)
            case "2":
                data = ask_user_for_data()
                write_in_json(path, data)
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


if __name__ == '__main__':
    main()
