input1 = int(input("Enter a number between 1 and 3 "))

while input1 not in range(1,4):
    print(f"{input1} is not between 1 and 3, please enter another one")
    input1 = int(input("Enter a number between 1 and 3 "))

print('ok')