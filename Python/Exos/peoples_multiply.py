pop = int(input("How many people is there at first "))
pop_final = int(input('how many do you want at time ? '))
rate = int(input('At which rate?'))

time = 0

while pop < pop_final:
    time += 1
    pop *= (1+rate/100)

print(f"We need {time} years to have that much people")
