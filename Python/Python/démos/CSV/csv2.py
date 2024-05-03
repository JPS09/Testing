import csv
import pandas as pd

path = "démos/CSV/test.csv"

# with open(path, mode='r') as fichier : 
#     reader = csv.reader(fichier, delimiter=";")
#     for row in reader:
#             print(row)

# with open(path, mode='', encoding='UTF-8', newline='') as fichier:
#       writer = csv.writer(fichier, delimiter=';')
#       writer.writerow(['GregMotiv', 0,'Not found'])


file = pd.read_csv(path)
print(file)

