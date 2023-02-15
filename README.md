# Pixel-Editor-Project

I generally followed this guide in order to set up the initial backend and frontend: https://dev.to/nagatodev/how-to-connect-flask-to-reactjs-1k8i

Steps on how to use:

1. First, clone the file from repo. The url should be in a green box at the top right of the main page. You can run "git clone url" to update it.

2. cd into the "frontend" directory and run "npm install" to install any necessary packages needed.

3. Go to the home directory, then cd into the backend directory and run the commands:
    1. "py -m venv env" (or for mac/unix do python3 -m venv env)
    2. run the command ".\env\Scripts\activate"  or (source env/bin/activate if on mac) in order to activate the python virtual environment (always do this when dealing with backend)
    3. run the command "pip install flask"
    4. run the command "pip install python-dotenv"
    5. run the command "pip install Flask-Cors"
    6. run the command "flask run" to start an instance of the backend API

6. Start a new terminal instance

5. cd back in to the root directory and now cd into the frontend directory

6. run the command "npm start"

7. both should now be up and running

**Common erros include:**
    1. Windows users don't have permission to run scripts in instructions 3.2 which returns an error. You can follow this solution:
        A. Press the [windows] button and then type PowerShell.
        B. Run as Adiministrator
        C. Copy and Paste the following command and hit [Enter]
        D. Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope LocalMachine
        E. Type Y and hit [Enter]
        F. Rerun the command and type A hit [Enter]
        G. Close the powershell and try again
    2. the virtual environment does not turn on because you may not have done 3.1 correctly, often because mac/windows differs in commands.
