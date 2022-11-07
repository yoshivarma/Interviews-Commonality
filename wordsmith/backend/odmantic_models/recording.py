from odmantic import Field, EmbeddedModel
import pymongo
from pydantic import AnyUrl
from typing import Optional, Union
from fastapi import UploadFile


class Recording(EmbeddedModel):
	name: str = Field(unique=True)
	recording: Union[AnyUrl, UploadFile]
	transcript_link: Optional[AnyUrl] = None