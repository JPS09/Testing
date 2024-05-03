import pytest
from mes_fonctions import *


def test_checkAge():
    nom = "Monkey D."
    prenom = 'Luffy'

    # Test pour age > 35
    age = 688498465846584514545414514514514520215413247984
    assert checkAge(prenom, nom, age) == [prenom, nom, moment_to_sixties(age)]

    # Test pour age == 35
    age = 35
    assert checkAge(prenom, nom, age) == [prenom, nom, moment_to_sixties(age)]

    # Test pour age < 35
    age = 9
    assert checkAge(prenom, nom, age) == [prenom, nom, moment_to_sixties(age)]


