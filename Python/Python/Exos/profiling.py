def profiling():
    age = int(input("How old are you ?"))
    money = int(input("What do you expect in money terms ?"))
    exp = int(input("How many year have you spent in this job ?"))
    
    if age < 30:
        print("Sorry, you're too young for this job")
    elif money > 40000:
        print("We don't have that much money for you")
    elif exp < 5:
        print('Go make some exp elsewhere')
    else:
        print("CONGRAAAAAAAAAAAAAAATUUUUUUUULATIONS, You have job")
        
profiling()