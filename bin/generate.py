import glob
import io
import json
import os
import shutil
import zipfile

import requests
import yaml
from attackcti import attack_client


def flatten(xss):
    return [x for xs in xss for x in xs]


def get_techniques_from_mitre():
    lift = attack_client()
    all_techniques = lift.get_techniques()
    techniques = {}

    for te in all_techniques:
        t = json.loads(te.serialize())
        techniques[t["external_references"][0]["external_id"]] = [x["phase_name"] for x in t["kill_chain_phases"]]
    return techniques


def download_atomics():
    atomics_url = "https://github.com/redcanaryco/atomic-red-team/archive/refs/heads/master.zip"
    r = requests.get(atomics_url)
    z = zipfile.ZipFile(io.BytesIO(r.content))
    z.extractall("")


def create_atomics_json():
    contents = []
    techniques = get_techniques_from_mitre()
    for file in glob.glob(os.path.join("atomic-red-team-master/atomics", "T*/T*.yaml")):
        with open(file, "r") as f:
            content = yaml.safe_load(f.read())
            content["executors"] = sorted(list(set([i["executor"]["name"] for i in content["atomic_tests"]])))
            content["supported_platforms"] = sorted(list(
                set(flatten([i["supported_platforms"] for i in content["atomic_tests"]]))))
            del content["atomic_tests"]
            content["phases"] = sorted(techniques[content["attack_technique"]])
            contents.append(content)

    with open("public/atomics.json", "w") as f:
        f.write(json.dumps(contents, indent=4))


def move_atomics():
    for file in glob.glob(os.path.join("atomic-red-team-master/atomics", "T*/T*.md")):
        new_path = os.path.join("pages/atomic-red-team/atomics", os.path.basename(os.path.normpath(file)))
        os.rename(file, new_path)


if __name__ == "__main__":
    download_atomics()
    create_atomics_json()
    move_atomics()
    os.system("pre-commit run --all-files")
    shutil.rmtree("atomic-red-team-master")
