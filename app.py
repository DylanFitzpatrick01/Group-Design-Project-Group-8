import os.path

from flask import Flask, send_from_directory, request, jsonify
from flask_restful import Api
from flask_cors import CORS #comment this on deployment
from api.HelloApiHandler import HelloApiHandler
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from datetime import datetime
from flask_mail import Mail, Message 
import os.path
import os
from dotenv import load_dotenv
load_dotenv()

apiKey = os.getenv('API_KEY')

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app) #comment this on deployment
api = Api(app)

app.config['MAIL_SERVER'] = os.getenv('MAIL_SMTP')
app.config['MAIL_PORT'] = os.getenv('MAIL_PORT')
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)  


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

@app.route('/societies/:name/info', methods=['POST'])
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
        service = build("calendar", "v3", credentials=creds, developerKey=apiKey)

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


@app.route("/send_mail/<user_email>")
def send_mail(user_email):
    print(f"Mail server: {app.config['MAIL_SERVER']}")
    print(f"Mail port: {app.config['MAIL_PORT']}")

    sender_email = request.args.get('sender')
    module_code = request.args.get('module')
    mail_message = Message(
        'New notifications waiting for you on Campus!', 
        sender = os.getenv('MAIL_USERNAME'), 
        recipients = [user_email])
    mail_message.body = f"{sender_email} has mentioned you in {module_code}!"
    mail.send(mail_message)
    return "Mail has been sent"

if __name__ == '__main__':
    app.run(port=8000)