import re
import traceback


def is_adn_valid(adn_chain: str):
    if (re.match('[atcg]', adn_chain) == None):
        raise ValueError(
            "Cannot process this ADN since it contains non valid DNA proteins")
    if len(adn_chain) < 4:
        raise ValueError(
            "Cannot process this ADN since too short")
    return True


def enter_adn(adn_chain: str):
    try:
        is_adn_valid(adn_chain)
    except ValueError as error:
        print(str(error))
        traceback.print_exc()
        exit()
    return adn_chain


def process_adn(adn_chain: str, adn_sequence: str):
    try:
        enter_adn(adn_chain)
        enter_adn(adn_sequence)
    except ValueError as error:
        print(str(error))
        traceback.print_exc()
        exit()
    adn_analysis = adn_chain.count(adn_sequence)
    percent= occurence_pattern_adn(adn_chain, adn_sequence, adn_analysis)
    print(f"There is {adn_analysis} occurences of {adn_sequence} in the given {
          adn_chain} for a total of {percent}% of {adn_chain}")
    return adn_analysis


def occurence_pattern_adn(chaine, sequence, occurence):
    return round(occurence * len(sequence) * 100 / len(chaine), 2)


if __name__ == '__main__':
    print("Gloubiboulga")


