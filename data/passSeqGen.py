import random
import json
# from pprint import pprint


EULER_GRAPH = [
   # s  d  f  j  k  l 
    [0, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1, 1],
    [1, 1, 0, 1, 1, 1],
    [1, 1, 1, 0, 1, 1],
    [1, 1, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 0],
]

KEYS = [ "S", "D", "F", "J", "K", "L"]

def gen_passes():
    pass_seqs = {}
    for i in range(0, 3):
        string = ""
        while (len(string) < 30):
            x = random.randint(0, 5)
            y = random.randint(1, 5)

            if EULER_GRAPH[x][y] and x != y and (KEYS[x] + KEYS[y] not in string):
                string += (KEYS[x] + KEYS[y])

        pass_seqs.update({f"k{i}" :[char for char in string] })

    # pprint(pass_seqs)
    return pass_seqs

def arr_to_json(pass_seqs):
    with open("passSeq.json", "w") as json_file:
        json.dump(pass_seqs, json_file)


def main():
    arr_to_json(gen_passes())


if __name__ == "__main__":
    main()
