def papers_please():
    nbr_paper = input('How many paper do you need ? ')
    try:
        nbr_paper2 = int(nbr_paper)
        if nbr_paper2 < 0:
            raise ArithmeticError
    except ValueError:
        print(f"{nbr_paper} is not a valid number ")
        exit()
    except ArithmeticError:
        print('The number must be positive')
        exit()
    except:
        print("An unknown error occured")
        exit()

    if nbr_paper2.is_integer() & nbr_paper2 > 20:
        price = nbr_paper2 * 0.3
    elif 10 == nbr_paper2 <= 20:
        price = nbr_paper2 * 0.4
    elif nbr_paper2 > 0 & nbr_paper2 < 10:
        price = nbr_paper2 * 0.5

    print(f"The price for {nbr_paper} papers is {price} poneys")


papers_please()
