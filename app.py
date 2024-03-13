import os.path

from flask import Flask, send_from_directory, request, jsonify
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #comment this on deployment
from api.HelloApiHandler import HelloApiHandler
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from datetime import datetime
import json


API_KEY = "AIzaSyDAlrmNP4IydBXFKbj9ry7fZQmrswg1HKk"

import os.path


app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app) #comment this on deployment
api = Api(app)


# Function to format datetime from frontend
# YYYY-MM-DDTHH:MM -> YYYY-MM-DDTHH:MM:SS
def format_datetime(event):
    for time_key in ['start', 'end']:
        dt = datetime.strptime(event[time_key]['dateTime'], "%Y-%m-%dT%H:%M")
        formatted_dt = dt.strftime("%Y-%m-%dT%H:%M:%S")
        event[time_key]['dateTime'] = formatted_dt


@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')

api.add_resource(HelloApiHandler, '/flask/hello')

# If modifying these scopes, delete the file token.json.
SCOPES = ["https://www.googleapis.com/auth/calendar"]

@app.route('/calendar', methods=['POST'])
def create_event():
    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists("token.json"):
        creds = Credentials.from_authorized_user_file("token.json", SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                "credentials.json", SCOPES
            )
            creds = flow.run_local_server(port=8080)
        # Save the credentials for the next run
        with open("token.json", "w") as token:
            token.write(creds.to_json())

    try:
        service = build("calendar", "v3", credentials=creds, developerKey=API_KEY)

        event = request.json

        # format the datetime from frontend
        format_datetime(event)

        # delete recurrence if it's empty
        if not any(event['recurrence']):
            del event['recurrence']


        print(event)
        event = service.events().insert(calendarId='primary', body=event).execute()
        print('Event created: %s' % (event.get('htmlLink')))
        return jsonify({'message': 'Event created successfully'}), 200
    
    except HttpError as error:
        print(f"An error occurred: {error}")
        return jsonify({'error': str(error)}), 500  # Return error response#


if __name__ == '__main__':
    app.run(port=8000)