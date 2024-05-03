numbers_to_hundred = range(1,101)

for i in numbers_to_hundred:
    if i % 3== 0 & i % 3 == 0:
        print("Fizzbuzz")
    elif i % 5 == 0:
        print('Buzz')
    elif i % 3 == 0:
        print('Fizz')
    else:
        print(i)