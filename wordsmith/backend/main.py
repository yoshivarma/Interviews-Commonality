from fastapi import Body, FastAPI, UploadFile, File
from typing import List, Union, Optional
from odmantic import ObjectId
from starlette.middleware.cors import CORSMiddleware

# Database imports
import database.mongo as mongo

# Model imports
from odmantic_models.case import Case
from odmantic_models.recording import Recording

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
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    await mongo.init(host, user, password, database)


@app.get("/api", response_model=List[Case])
async def get_all_cases():
    cases = await mongo.getAllCases()
    return cases


@app.post("/api/cases")
async def create_or_update_case(case: Case):
    await mongo.createOrUpdateCase(case)


@app.delete("/api/cases/{case_id}")
async def delete_case(case_id: ObjectId):
    await mongo.deleteCase(case_id)


@app.get("/api/cases/{case_id}")
async def get_case(case_id: ObjectId):
    case = await mongo.getCase(case_id)
    recordings = await mongo.getAllRecordingsForCase(case_id)
    return {"case_data": case, "recordings": recordings} 


@app.get("/api/cases/{case_id}/recordings", response_model=List[Recording])
async def get_recordings_for_case(case_id: ObjectId):
    recordings = await mongo.getAllRecordingsForCase(case_id)
    return recordings



@app.post("/api/cases/{case_id}/recordings")
# async def add_recording_to_case(case_id: ObjectId, recording_file: UploadFile, recording_name: str = Body()):
# async def add_recording_to_case(case_id: ObjectId, recording_file = UploadFile(), recording_name = Body()):
# async def add_recording_to_case(case_id: ObjectId, recording_file: Union[UploadFile, None] = None):
async def add_recording_to_case(case_id: ObjectId, recording_file: Optional[UploadFile] = None):
    
    # print(case_id)
    # print(recording_file.filename)

    if not recording_file:
        return {"message": "No upload file sent"}
    else:
        # return {"filename": recording_file.filename}
        recording_name = recording_file.filename

        # 1. Get case to which recording is to be added
        case = await mongo.getCase(case_id)

        #2. Create new recording pydantic object with empty recording link and transcript link and save it in the database
        recording = mongo.Recording(name=recording_name, case_id=case_id)
        recording = await mongo.createOrUpdateRecording(recording)

        ## Beginning of async block

        #3. For that case, set keywords_loaded to false (since we need to recompute keywords) in the database
        case.keywords_loaded = False
        case = await mongo.createOrUpdateCase(case)

        #4. Upload the passed file to google drive and retrieve a link, save this link in database for recording
        # TODO - Add code
        recording.recording_link = "https://docs.google.com/document/dummyrecordingURL" #dummy for now
        recording = await mongo.createOrUpdateRecording(recording)

        #5. Pass the link to transcribe the audio (Mehul's code - accepts gdrive URL, returns transcription)
        # TODO - Add call to Mehul's code

        # 6. Upload transcription to google drive and retrieve link
        recording.transcript_link = "https://docs.google.com/document/dummytranscriptURL" #dummy for now

        # 7. Save transcript link for the recording in the database
        recording = await mongo.createOrUpdateRecording(recording)

        # 8. Retrieve all common phrases for a given case - call to Yoshita's code
        # TODO - Add code for call (accepts list of google drive URLs and returns list of common words)

        # 9. Save the retrieved common phrases in the database
        
        # 10. Set keywords_loaded to True
        case.keywords_loaded = True
        case = await mongo.createOrUpdateCase(case)
        return {"filename" : recording_file.filename}

    ## End of async block

@app.delete("/api/cases/{case_id}/recordings/{recording_id}")
async def delete_recording(recording_id: ObjectId):
    await mongo.deleteRecording(recording_id)