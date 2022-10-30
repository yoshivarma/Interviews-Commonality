from odmantic import Field, EmbeddedModel
import pymongo
from pydantic import AnyUrl
from typing import Optional

class Recording(EmbeddedModel):
	name: str = Field(unique=True)
	recording_link: AnyUrl
	transcript_link: Optional[AnyUrl] = None