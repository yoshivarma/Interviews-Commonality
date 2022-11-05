from typing import Union, List
from fastapi import FastAPI
from pydantic import BaseModel
from model.model import find_keywords_model
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

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
    keywords: list

# class Case(BaseModel):
#     id: int
#     name: str
#     recordings: list(Recordings)

DB: List[Recording] = [
    Recording(id=1, name="Recording 1", keywords=['word 1', 'word 2']),
    Recording(id=2, name="Recording 2", keywords=['word 1', 'word 2' , 'word3'])
]

@app.get("/api")
def read_root():
    keywords = find_keywords_model()
    return keywords

#@app.post("/keywords")
#def find_keywords():
  #  keywords = find_keywords_model()
 #   return {"keywords": keywords}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
