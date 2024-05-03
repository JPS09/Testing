array_of_participants = [1,2,3]
print(array_of_participants)

def panne_moteur(list_of_participants:list):
    looser = list_of_participants.pop(0)
    list_of_participants.append(looser)
    print(f" Someone didn't check their gear ! Here is the new score : {list_of_participants}")
    return list_of_participants

def passe_en_tete(list_of_participants:list):
    list_of_participants[0], list_of_participants[1] = list_of_participants[1], list_of_participants[0]
    print(f"He got at the first place{list_of_participants[0]}, here is the new score {list_of_participants}")
    return list_of_participants

def not_last(list_of_participants:list):
    list_of_participants[-2], list_of_participants[-1] = list_of_participants[-1], list_of_participants[-2]
    print(f"He is not at the last place anymore {list_of_participants[-2]}, \n here is the new score {list_of_participants}")
    return list_of_participants

def blaster_blast(list_of_participants: list):
   eliminated = list_of_participants.pop(0)
   print(f"He was eliminated {eliminated}")
   return eliminated

def miraculous_comeback(he_who_will_be_back, list_of_participants: list):
    list_of_participants.append(he_who_will_be_back)
    print(f"He is back from the dead {array_of_participants[-1]}, here is the new score {array_of_participants}")
    return list_of_participants

def race(people_who_run_in_the_pod_race: list):
    panne_moteur(people_who_run_in_the_pod_race)
    passe_en_tete(people_who_run_in_the_pod_race)
    not_last(people_who_run_in_the_pod_race)
    deleted = blaster_blast(people_who_run_in_the_pod_race)
    miraculous_comeback(deleted, people_who_run_in_the_pod_race)
    print(f"The race is finished, here are what remains {people_who_run_in_the_pod_race}")

race(array_of_participants)



