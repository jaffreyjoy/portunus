import os
import shutil

folder_names = [
    "EpochSepData",
    "FeatureVector",
    "TrainedParameters",
    "Uploads",
    "UserEEGData"
]

server_path = os.path.join(os.getcwd(), 'server')

# scripts_path = os.path.join(os.getcwd(), 'scripts')

folders = map(lambda folder_name: os.path.join(server_path,folder_name), folder_names)
for folder in folders:
    print(folder)
    # print(os.listdir(folder))
    files = list(map(lambda file_name : os.path.join(folder,file_name), os.listdir(folder)))
    print(files)
    for file in files:
        print(file)
        os.remove(file) if os.path.isfile(file) else shutil.rmtree(file)

from pymongo import MongoClient

mc = MongoClient("mongodb://localhost:27017")

db = mc.portunus_db

# print(dir(db))

collections_to_remove = ["file", "user"]
for collection_name in db.collection_names():
    if(collection_name in collections_to_remove)
        print(collection_name)
        col = db.get_collection(collection_name)
        # print(dir(col))
        col.delete_many({})

mc.close()