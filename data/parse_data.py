import os, json, csv
from pprint import pprint


def get_file_contents(file_name):
    with open(file_name, "r") as f:
        json_str = f.read().replace("\n", "")
        pass

    return json.loads(json_str)


def get_aud_data(json):
    obj = {}
    key_val = [[x, y] for x, y in json.items()]
    
    count_aud, count_vis = 0, 0
    for pair in key_val:
        # pprint(list(pair[1].values())[0]["session"])
        
        if list(pair[1].values())[0]["session"] == "g0-train-aud":
            count_aud += 1
            obj[pair[0]] = pair[1]
        else:
            count_vis += 1

    return obj


def get_vis_data(json):
    obj = {}
    key_val = [[x, y] for x, y in json.items()]

    count_aud, count_vis = 0, 0
    for pair in key_val:
        # pprint(list(pair[1].values())[0]["session"])
        
        if list(pair[1].values())[0]["session"] == "g0-train-aud":
            count_aud += 1
        else:
            count_vis += 1
            obj[pair[0]] = pair[1]

    return obj


def write_json(dict_obj, file_name):
    with open(file_name, "w") as out:
        json.dump(dict_obj, out)


def create_csv_aud_train(dict_obj):

    session_names = ["g0-train-aud", "g0-auth-aud", "g0-auth-two-aud"]

    with open("data_aud.csv", "w", newline="") as file:
        csv_writer = csv.writer(file)

        rows = [
                "user_id",
                "pass_seq",
                "hit_rate",
            ]
        
        for i in range(7):
            rows.append(f"block_{i + 1}_pass_hit_rate")
            rows.append(f"block_{i + 1}_noise_hit_rate")
            rows.append(f"block_{i + 1}_total_hit_rate")

        pprint(len(rows))
        csv_writer.writerow(rows)

        for user in list(dict_obj.items()):
            row = []        
            pass_seq = ""

            for item in list(user[1].items()):
                if item[0] == "passSeq":
                    pass_seq = " ".join(item[1])

                if (item[0] not in ["noteGenerateLag", "noteSpeed", "passSeq"]) and (item[1].get("session") == session_names[0]):
                    row.append(item[1].get("hitRate"))
                    for block in item[1].get("block"):
                        row.append(block.get("passMetrics").get("hitRate"))
                        row.append(block.get("noiseMetrics").get("hitRate"))
                        row.append(block.get("subBlockMetrics").get("hitRate"))


            row = [user[0],pass_seq, *row]
            csv_writer.writerow(row)



if __name__ == "__main__":
    json_data = get_file_contents("data_aud.json")

    # write_json(get_aud_data(json_data), "data_aud.json")
    # write_json(get_vis_data(json_data), "data_vis.json")

    create_csv_aud_train(json_data)
