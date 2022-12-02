import asyncio
from odmantic_models.case import Case
from odmantic_models.recording import Recording

from urllib.parse import quote_plus
from motor.motor_asyncio import AsyncIOMotorClient
from odmantic import AIOEngine, exceptions, ObjectId

engine = None


async def init(host, user, password, database):
	global engine
	uri = "mongodb://%s:%s@%s" % (quote_plus(user), quote_plus(password), host)
	client = AsyncIOMotorClient(uri)
	engine = AIOEngine(client=client, database=database)
	await engine.configure_database([Case, Recording])


async def getAllCases():
	cases = await engine.find(Case)
	return cases


# This is an 'upsert' operation meaning that if a document already
# exists with the same primary key, it will be overwritten. So this can
# be used to create or update a case
async def createOrUpdateCase(case: Case):
	try:
		case = await engine.save(case)
		return case
	except exceptions.DuplicateKeyError:
		print("Case could not be added as a case with the same name exists.")


async def getCase(case_id: str):
	case = await engine.find_one(Case, Case.id == case_id)
	return (case)


# Deletes a case and all recordings associated with it
async def deleteCase(case_id: ObjectId):
	await engine.remove(Case, Case.id == case_id)
	await engine.remove(Recording, Recording.case_id == case_id)


async def getAllRecordingsForCase(case_id: str):
	recordings = await engine.find(Recording, Recording.case_id == case_id)
	return recordings


async def createOrUpdateRecording(recording: Recording):
	try:
		recording = await engine.save(recording)
		return recording
	except exceptions.DuplicateKeyError:
		print("Recording could not be added as a recording with the same name exists for given case.")


async def deleteRecording(recording_id: ObjectId):
	await engine.remove(Recording, Recording.id == recording_id)
