from datetime import datetime


def quelle_heure(heure: str):
    print(datetime.strptime(heure, "%H"))


quelle_heure('12h00')
