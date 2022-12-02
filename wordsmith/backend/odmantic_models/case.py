from odmantic import Field, Model, Index, query
from pydantic import ValidationError, root_validator
from typing import List

import pymongo

class Case(Model):
	name: str = Field(unique=True)
	keywords_loaded: bool = True
	keywords: List[str] = []

	class Config:
		@staticmethod
		def indexes():
			yield pymongo.IndexModel([(+Case.name, pymongo.TEXT)])
