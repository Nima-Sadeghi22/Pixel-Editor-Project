# Pixel-Editor-Project

I generally followed this guide in order to set up the initial backend and frontend: https://dev.to/nagatodev/how-to-connect-flask-to-reactjs-1k8i

Steps on how to use:

1. First, clone the file from repo.

2. cd into the "frontend" directory and run "npm install" to install any necessary packages needed.

3. cd into the backend directory and run the commands:
    1. py -m venv env (or for mac/unix do python3 -m venv env)
    2. run the command ".\env\Scripts\activate" in order to activate the python virtual environment (always do this when dealing with backend)
    3. run the command pip install flask
    4. run the command pip install python-dotenv
    

4. run the command "flask run" to start an instance of the backend API

5. cd back in to the root directory and now cd into the frontend directory

6. run the command "npm start"

7. both should now be up and running