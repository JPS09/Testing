user_identity = input("Quel est votre nom?")
user_prenom= input("quel est votre prénom ?")
user_gender = input("Quel est votre genre? M ou Mme ou non binaire")

while (user_gender != ("m" or "mme" or 'non binaire')):
    print("please enter a valid gender")
    user_gender = input("Quel est votre genre? M ou Mme ou non binaire")


print(f"Bonjour {user_gender.upper()} {user_prenom.capitalize()} {user_identity.capitalize()}")


