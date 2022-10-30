# We assume that we will be getting pydantic objects in the request to FastAPI and directly pass it
# on to the mongo endpoint. For now, we are creating these objects solely for testing.
import mongo
import asyncio

host = "localhost:27017"
user = "rootuser"
password = "rootpass"
database = "cases"

async def test():
	await mongo.init(host, user, password, database)
	case = mongo.Case(name="Ronnie Abduction", recordings=[mongo.Recording(name="Anna Statement", recording_link="https://www.google.com")])
	await mongo.createCase(case)

asyncio.run(test())