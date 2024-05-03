def divisible_three():
    usr_input= input("Enter usr_input number ")
    try:
        usr_input2 = int(usr_input)
    except ValueError:
        print(f"{usr_input} is not a valid number ")
        exit()
    except:
        print('An error Occured')
        exit()
        
       
    if usr_input2.is_integer() & (usr_input2 % 3 == 0):
        print(f"{usr_input2} is divisible by 3")
    else:
        print(f"{usr_input2} is not divisible by 3")
        
divisible_three()