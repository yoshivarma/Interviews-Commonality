from fastapi import FastAPI
from typing import List
from starlette.middleware.cors import CORSMiddleware
from odmantic import ObjectId

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

origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    await mongo.init(host, user, password, database)


@app.get("/api", response_model=List[Case])
async def get_all_cases():
    cases = await mongo.getAllCases()
    print(type(cases[0].id))
    return cases

@app.post("/api/cases")
async def create_or_update_case(case: Case):
    await mongo.createOrUpdateCase(case)

@app.delete("/api/cases/{case_id}")
async def delete_case(case_id: ObjectId):
    await mongo.deleteCase(case_id)
