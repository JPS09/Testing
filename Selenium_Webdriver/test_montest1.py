import pytest


def test_test1():
    assert 1==2

moment_to_sixties = lambda age: 60 - age
def test_age_to_sixties():
    age = 26
    assert moment_to_sixties(age) == 34