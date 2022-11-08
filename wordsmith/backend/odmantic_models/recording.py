from odmantic import Field, Model, ObjectId, Index
import pymongo
from pydantic import AnyUrl
from typing import Optional


class Recording(Model):
	name: str #= Field(unique=True)
	case_id: ObjectId
	recording_link: Optional[AnyUrl] = None
	transcript_link: Optional[AnyUrl] = None

	class Config:
		def indexes():
			yield Index(Recording.case_id, Recording.name, unique=True, name="case_recording_unique") 