from fastapi import FastAPI

# Database imports
import database.mongo as mongo

# Model imports
from odmantic_models.case import Case, Recording

# Hardcoded for now
host = "localhost:27017"
user = "rootuser"
password = "rootpass"
database = "cases"

app = FastAPI()

@app.on_event("startup")
async def startup():
    await mongo.init(host, user, password, database)


@app.get("/")
async def get_all_cases():
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
