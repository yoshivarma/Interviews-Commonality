import asyncio
from models.case import Case, Recording

from urllib.parse import quote_plus
from motor.motor_asyncio import AsyncIOMotorClient
from odmantic import AIOEngine

engine = None

def init(host, user, password, database):
	global engine
	uri = "mongodb://%s:%s@%s" % (quote_plus(user), quote_plus(password), host)
	client = AsyncIOMotorClient(uri)
	engine = AIOEngine(client=client, database=database)
	return engine.configure_database([Case])

def getAllCases():
	pass

def createCase(case: Case):
	return engine.save(case)

def getCase():
	pass

def updateCase():
	pass

def deleteCase():
	pass

def createRecording():
	pass

def getRecording():
	pass

def updateRecording():
	pass

def deleteRecording():
	pass
