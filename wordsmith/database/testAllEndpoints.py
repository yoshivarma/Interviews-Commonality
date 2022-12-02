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

	# Add cases
	print("Adding cases: ")

	case1 = mongo.Case(name="New York Abduction", recordings=[
            mongo.Recording(
            	name="Anna Statement", recording_link="https://docs.google.com/document/case1rec1dummyURL")
        ])
	print("Adding to DB: {0}".format(case1))
	await mongo.createOrUpdateCase(case1)

	case2 = mongo.Case(name="LA Murder", recordings=[
            mongo.Recording(name="Witness A Statement",
                            recording_link="https://docs.google.com/document/case2rec1dummyURL"),
            mongo.Recording(name="Witness B Statement",
                            recording_link="https://docs.google.com/document/case2rec2dummyURL")
        ])
	print("\nAdding to DB: {0}".format(case2))
	await mongo.createOrUpdateCase(case2)

	# Reading all cases
	print("\nReading all cases")
	cases = await mongo.getAllCases()
	print(cases)

	# Deleting a case
	print("\nDeleting NY Abduction case using case ID")
	case_to_delete = list(filter(lambda case: case.name ==
	                      "New York Abduction", cases))[0]
	await(mongo.deleteCase(case_to_delete.id))

	# Reading cases post deletion
	print("\nReading cases post deletion")
	cases = await mongo.getAllCases()
	print(cases)

	print("\nRe-adding NY Abduction case")
	await mongo.createOrUpdateCase(
		mongo.Case(name="New York Abduction", recordings=[
			mongo.Recording(name="Anna Statement",
			                recording_link="https://docs.google.com/document/case1rec1dummyURL")
		])
	)

	# Retrieving a case by case ID
	print("\nRetrieving a case by case ID")
	cases = await mongo.getAllCases()
	case_to_retrieve = list(
		filter(lambda case: case.name == "LA Murder", cases))[0]
	case = await mongo.getCase(case_to_retrieve.id)
	print(case)

	# Updating a case by case ID
	print("\nUpdating a case by case ID")

	# 1. Add a recording to LA murder
	print("\nAdding a recording to LA murder")
	new_recording = mongo.Recording(
		name="Witness C Statement", recording_link="https://docs.google.com/document/case2rec3dummyURL")
	case.recordings.append(new_recording)
	await mongo.createOrUpdateCase(case)

	print("\nRetrive all cases to check if new recording was added")
	cases = await mongo.getAllCases()
	print(cases)

	# 2. Delete a recording
	print("\nDeleting a recording from LA murder")
	recording_to_delete = list(filter(
		lambda recording: recording.name == "Witness C Statement", case.recordings))[0]
	case.recordings.remove(recording_to_delete)
	await mongo.createOrUpdateCase(case)

	print("\nRetrive all cases to check if new recording was deleted")
	cases = await mongo.getAllCases()
	print(cases)

asyncio.run(test())
