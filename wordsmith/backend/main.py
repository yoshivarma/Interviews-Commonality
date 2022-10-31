from typing import Union, List
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


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
    return DB

# @app.post("/keywords")
# def find_keywords():


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
