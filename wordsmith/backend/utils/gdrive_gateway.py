# Do a pip install pydrive
from pydrive.drive import GoogleDrive
from pydrive.auth import GoogleAuth
from oauth2client.service_account import ServiceAccountCredentials
import logging
import os

# Authentication and Authorization
gauth = GoogleAuth()
scope = ['https://www.googleapis.com/auth/drive']
# Not using secret manager to store keys as it requires a billing account
json_keyfile_dict = {
    "type": "service_account",
    "project_id": "interviews-commonality",
    "private_key_id": "84a2b392a3496b4a5f71a0a783d3cb8199dc37a0",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC0KHgPoRnylwci\nq3SPXoLlSGVt7zvMYkZW1CtmAtyI38GdO+MuySZ/rL9ExEs5yT+73t7/lm5T4Zmy\nhjRkdEQNlgPmOLZSn08rMAmo5p4ceNwQQzgFFrY+jcgJhqJO/rbj4+AnljvRifQC\nSdHl1w97SLFbmvReXxvZYIMNuN24jpC2pzcKZdtBT3hKjnXdpBjpODJVbFusdDcW\nfq9dg15f79zHBEYyqUH/jT9WzSStHrtJd8JDEZCUPeNHb/8A0awFTr1NZbMtT8ZO\nARL4HfsxZxdjb0uBkg49viMvfUyxHc60HdkNrW6Ye1AAYsRRVvXx8CDNOb1gVfTX\n4XSZltb5AgMBAAECggEABIrqsBYzVcsaGnUxTLYo3cgsCpAYNWia9nCGIZ3b2rWt\np53Ndi4LQvfjoMPEU9Ivwbh2bgJoiMPtALPimU/XMXKBaaovarjqoZ+l9rTN8tDX\nV6+iN3qhoMUpcJgM+qnwiaGC0uy2WGu+k9oxqTZ5hPXJxxIKrGCAjsQgudVZ/d/L\nfiNvDWZp2dMGNzpvHpAqKTiX26F/m3Lntxwfe/TXGXxIRn1ZoOsK3AJxZbqrZ80B\nnKX8Juo0p7SW4WQQUZUaVsH/oXRRy32lZV6y+LdreG3E2UVU8Stv3z5zCjxIZnYB\nCiDN4yCb/HO5JYVJFgWLUuvxi2nVaBJhjhKGWB2aowKBgQDxKP/ATjF0r3QH11UA\nFHFx2o92pFga6aA9IKrfqSBt6Rbdj/lVbIITjyjGJ9lQafXLaQYW+EL9x2/r7MAF\nrXL3SubfkjTClAUMz2nwgM2xb8T6TSa6TZKVtf4r931T/WKZjfWf9hq/RoYPFggU\nFf+N4sho7cSpVK3LVvnVc9fMEwKBgQC/PoDIUxlULN7rLrpf3ZpVqoshv0a4Dh2d\nKawPhJ8xepV9gezyIHFrxy0uuB7z3rXFGIJGsHRS1Ul/wvR9/T+Ucxd7SfRn/deP\nve/Fh3EZ/O3nA9IF2vCDz6ivJ1+wZUffOipjtG1BPgTOtDiq6sO3nT/3zFgPLiil\nXeGXxGOaQwKBgA7tw89Kx+L6TYuCt/9WRKOQrRriF5Yq6kF+eTV5ScmkCUdT91Jj\ncjX1wcdqhhhlRtL9wGPBoJwHMZWARW7Uiu5mE565dUyqTxm46Uz7HECks6PvDLux\nu6ZK6t4b5wVBBU6OLCtn18YJfpkGex+LMRO+ezuLpIX6+PtCehrNnglDAoGAJ+b4\no9OC02dRU6y6QkpQa1NcGDx6muiHEUWimtJHDOHQ0xEKyTIvuBckvDy6aJOtRWRp\nuioS+z15Smj47liqrWSeH6E8l34FPf6ZSpOJ66w0TyEi7wnRaQ8o2PLUKk/XgSH3\nujnpGdXA1wgPUsoM8AClWiSOswwkeuxtp2bYiVUCgYEA6sxxftBz10b5vIvlE8Tq\ncJmwBNdV5erXGTi/WfEYxKcpTKtMKdhjR9mxyOqDQDBedSBwi/rQBnWk/+/vdqAd\n4/Zf3TIppIZgPTJGIqzv3viIv59csQcL65b/RngrgOSb6WVqTiP8K8IpTv/jVG/X\n437or5T/+BQsloy24z1ytiE=\n-----END PRIVATE KEY-----\n",
    "client_email": "icdriveuploader@interviews-commonality.iam.gserviceaccount.com",
    "client_id": "115193631822310470913",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/icdriveuploader%40interviews-commonality.iam.gserviceaccount.com"
}

gauth.credentials = ServiceAccountCredentials.from_json_keyfile_dict(
	json_keyfile_dict, scope)

drive = GoogleDrive(gauth)

# Using a URL of this format helps prevent CORB errors from frontend
GDRIVE_FILE_PREFIX = "https://drive.google.com/uc?id="

# This is the id of the folder in gdrive that we will be uploading to
FOLDER_ID = "1aOaC7ZAs_wwlgSb_kf3s5hTJzOVNC-3H"

# Uploads audio file to given gdrive account and returns its URL
# The files are uploaded to a folder that has view
# access for everyone with a link. This is more
# permissible than it needs to be and can be updated
# by granting the frontend permissions
def upload_audio_file(file_name, file_content, file_type):
	try:

		# This is the name of the temporary folder on the server
		# to which files are uploaded before uploading to GDrive
		TEMP_FOLDER_NAME = "temp"

		# 1. First temporarily store the file on the server since pydrive
		# doesn't seem to have a way to directly upload file contents
		# for non-text files
		relative_file_path = "%s/%s" % (TEMP_FOLDER_NAME, file_name)
		os.makedirs(os.path.dirname(relative_file_path), exist_ok=True)
		file_location = os.path.join(os.path.abspath(os.curdir), relative_file_path)

		if not os.path.exists(file_location):
			with open(file_location, "wb+") as file_object:
				file_object.write(file_content.read())

		# 2. Then upload the file to gdrive using the temporary location
		gdrive_file = drive.CreateFile(
			{
				'parents': [{'id': FOLDER_ID}],
				'title': file_name,
				'mimeType': file_type
			}
		)
		gdrive_file.SetContentFile(file_location)
		gdrive_file.Upload()
		gdrive_file_url = GDRIVE_FILE_PREFIX + gdrive_file['id']
		
		# 3. Now delete the file from the server
		if os.path.exists(file_location):
			os.remove(file_location)
		return (gdrive_file_url)

	except BaseException:
		logging.exception("An exception was thrown!")


# Uploads text file to given gdrive account and returns its URL
# The files are uploaded to a folder that has view
# access for everyone with a link. This is more
# permissible than it needs to be and can be updated
# by granting the frontend permissions
def upload_text_file(file_name, file_content):
	try:

		gdrive_file = drive.CreateFile(
			{
				'parents': [{'id': FOLDER_ID}],
				'title': file_name
			}
		)
		gdrive_file.SetContentString(file_content)
		gdrive_file.Upload()
		gdrive_file_url = GDRIVE_FILE_PREFIX + gdrive_file['id']
		return (gdrive_file_url)

	except BaseException:
		logging.exception("An exception was thrown!")


# Takes as input a URL similar to
# 'https://drive.google.com/uc?id=1zBmBTQTJumz7xu6non6iH2qLw3Veh1wb'
# and outputs its id as string
def obtain_file_id(file_url):
	# Returns id=1zBmBTQTJumz7xu6non6iH2qLw3Veh1wb
	id_query_param = file_url.split('?')[1]
	file_id = id_query_param.split('=')[1]
	return file_id


# Reads from a text file at the given link
# and returns a string that contains all the contents
# of the file
def read_text_file(text_file_link):
	try:
		file_id = obtain_file_id(text_file_link)
		gdrive_file = drive.CreateFile({'id': file_id})
		file_content = gdrive_file.GetContentString()
		return file_content
	except BaseException:
		logging.exception("An exception was thrown!")
