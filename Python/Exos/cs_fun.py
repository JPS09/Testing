import os

path = "démos/text.txt"

if not os.path.exists(path):
    fichier = open(path,'w', encoding='UTF-8')
    fichier.write("You're simply the best")
    fichier.close()
else:
    fichier = open(path,'r')
    contenu = fichier.read()
    print(f"{contenu}")
    fichier.close()

    
if not os.path.exists(path):
    with open(path,'w') as fichier:
        fichier.write("You're simply the best")
else:
    # with open(path,'r') as fichier:
    #     contenu = fichier.read()
    #     print(f"{contenu}")
    #     fichier.close()
    with open(path,'a', encoding='UTF-8') as fichier:
        fichier.write("\nIn fact, you need to workout")
        print(f"{fichier}")

