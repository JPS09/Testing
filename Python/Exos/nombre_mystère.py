import random


def generate_number():
    return random.randint(1, 2)


def check_user_prop(generated_number: int, proposed_number: int):
    if generated_number == proposed_number:
        print(f"You have sucessfully found the number which was {
              generated_number}")
        return True
    print(f"{proposed_number} is not equal to the generated one, try again")
    return False
    # help the user to show if far or close maybe with a delta


def main():
    number_of_tries = int(input("How many times do you want to try ? "))
    number_generated = generate_number()
    nb_of_loops = 0
    while nb_of_loops < number_of_tries:
        user_choice = int(input("What is your guess? "))
        user_found = False
        if check_user_prop(number_generated, user_choice):
            user_found = True
            break
        nb_of_loops += 1
    if not user_found:
        print(f"The correct guess is {number_generated}")


main()
