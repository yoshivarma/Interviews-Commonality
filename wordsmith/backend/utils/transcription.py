# Do -
# 1. pip install git+https://github.com/openai/whisper.git -q
# 2. brew install ffmpeg (on mac)

import whisper

model = whisper.load_model("base")

# Accepts an recording link and
# returns the transcription for it
def transcribe(recording_link):
        result = model.transcribe(recording_link)
        transcript = result['text']
        return transcript