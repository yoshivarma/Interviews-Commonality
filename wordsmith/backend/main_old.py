from typing import Union, List
from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
# from model.model import find_keywords_model
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000/",
    "http://localhost:8080/",
]

origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Recording(BaseModel):
    id: int
    name: str
    link: str

# class Case(BaseModel):
#     id: int
#     name: str
#     recordings: list(Recordings)


DB: List[Recording] = [
    Recording(id=1, name="Recording 1", link="abcdef"),
    Recording(id=2, name="Recording 2", link="abcefsdf")
]

# @app.get("/api")
# def read_root():
#     keywords = find_keywords_model()
#     return keywords

# @app.post("/keywords")
# def find_keywords():
#  keywords = find_keywords_model()
#   return {"keywords": keywords}


@app.get("/")
def get_all_cases():
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


@app.get("/getCase")
def get_case_by_id(id):
    return {name: "dsfdsf", id: "dfsdfsd", recordings: [12, 23, 34, 34, 23, 42, 34, 2], keywords: [12, 23, 34, 34, 23, 42, 34, 2]}

@app.post("/findkeywords")
async def find_keywords(audios=List[UploadFile]):
    # for files in audios:
    #     print('Help')
    return [a for a in ["apple", "banana", "chickoo"]]
    # return {"filenames": audios}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}