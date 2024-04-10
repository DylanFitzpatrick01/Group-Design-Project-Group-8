# Group-Design-Project-Group-8
The repository for CSU44098 Group 8

## Step By Step:
1. Have Python installed, and Node.js.
2. In a terminal, clone the repository: ```git clone https://github.com/DylanFitzpatrick01/Group-Design-Project-Group-8.git```
3. Cd into the directory: ```cd Group-Design-Project-Group-8```
4. To run our project inside a python virtual environment:
   
     - ```python3 -m venv env``` (or ```python -m venv env``` depending on your version of python)
     - Activate for Windows:
         - ```env\Scripts\activate```
     - Activate for Unix or MacOS:
         - ```source env/bin/activate```

5. Install all requirements to the virtual environment: ```pip3 install -r requirements.txt``` (or ```pip install -r requirements.txt``` depending on your version of python)
6. Start the flask server: ```flask run -p 8000```
7. In another terminal, cd into the frontend directory inside the root of the project: ```cd frontend```
8. Install the dependencies: ```npm install```

    -   npm with some versions may give errors when installing, please use `npm install --save --legacy-peer-deps` in such case.
9. Add the secrets that we sent you by email:
     -   create a file in the root of the project folder and name it ```.env``` and add the contents from the google doc sent to you (flask mail set up and an api key)
     -   create a second file, this time inside the frontend folder and also name it ```.env``` but add the contents from the second box in the google doc sent to you (rapidapi key and host)
10. Run the project locally: ```npm start```
11. If it doesn't open automatically, open [localhost:3000/](http://localhost:3000/)
12. Use your tcd email to create an account and log in (for testing purposes, you can also use Gmail)

## Backends

Firebase: [Link to Firestore database](https://console.firebase.google.com/project/group-8---college-social-media/firestore/data/~2F)
      - You must be a member of our Firebase project to access this link.
