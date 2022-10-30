import asyncio
from models.case import Case, Recording

from urllib.parse import quote_plus
from motor.motor_asyncio import AsyncIOMotorClient
from odmantic import AIOEngine

host = "localhost:27017"
user = "rootuser"
password = "rootpass"
uri = "mongodb://%s:%s@%s" % (quote_plus(user), quote_plus(password), host)
client = AsyncIOMotorClient(uri)
engine = AIOEngine(client=client, database="cases")

async def save_instances():
	instances = [
	    Case(name="Ronnie Abduction", recordings=[Recording(name="Anna Statement", recording_link="https://www.google.com")])#,
	    # Case(name="Hachette Livre", founded=1826, location="FR"),
	]
	await engine.save_all(instances)

async def execute():
	await engine.configure_database([Case])
	await save_instances()

asyncio.run(execute())

