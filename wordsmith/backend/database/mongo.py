import asyncio
from odmantic_models.case import Case, Recording

from urllib.parse import quote_plus
from motor.motor_asyncio import AsyncIOMotorClient
from odmantic import AIOEngine, exceptions, ObjectId

engine = None

async def init(host, user, password, database):
	global engine
	uri = "mongodb://%s:%s@%s" % (quote_plus(user), quote_plus(password), host)
	client = AsyncIOMotorClient(uri)
	engine = AIOEngine(client=client, database=database)
	await engine.configure_database([Case]) 

async def getAllCases():
	cases = await engine.find(Case)
	return cases

# This is an 'upsert' operation meaning that if a document already
# exists with the same primary key, it will be overwritten. So this can
# be used to create or update a case
async def createOrUpdateCase(case: Case):
	try:
		await engine.save(case)
	except exceptions.DuplicateKeyError:
		print("Case could not be added as a case with the same name exists.")

async def getCase(case_id: str):
	case = await engine.find_one(Case, Case.id == case_id)
	return(case)

async def deleteCase(case_id: ObjectId):
	await engine.remove(Case, Case.id == case_id)