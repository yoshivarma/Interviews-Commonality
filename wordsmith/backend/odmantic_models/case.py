from odmantic_models.recording import Recording
from odmantic import Field, Model
from typing import List
import pymongo

class Case(Model):
	name: str = Field(unique=True)
	keywords_loaded: bool = False
	keywords: List[str] = []
	recordings: List[Recording] = []

	class Config:
	    @staticmethod
	    def indexes():
	        yield pymongo.IndexModel([(+Case.name, pymongo.TEXT)])
