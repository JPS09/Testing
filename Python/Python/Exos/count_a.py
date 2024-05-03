def compter_lettre_a(caract_chain):
    count = 0
    cract_minus = caract_chain.lower()
    for c in cract_minus:
        if c == 'a':
            count += 1
    print(count)
    return count


compter_lettre_a('abba')

print('abba'.count('a'))
