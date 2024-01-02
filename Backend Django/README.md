<h1>Descriptions</h1>
<p>This is the backend part of the ticket system and provides an API service for the frontend.
   Sqlite was used as the database in the project for ease of use. It includes reading, updating and creating operations.
   In the frontend, it creates a timed token to authenticate the user and transmits it to the user's browser. 
   and control is provided on the server side according to this token value.
</p>

<h2>Getting Started</h2>
<p>"Follow these steps to run the backend"</p>

1. Download the repo.

2. Enter the project directory.

3.project dependencies already come ready in the venv file of the repo If you want to use the ready-made venv file, follow this path:

  Type these into the terminal while in the root directory of the project:
   
      For Windows : myvenv\Scripts\activate
      For Linux Or Macos: source myvenv/bin/activate
      
   => python manage.py runserver (so the backend will work.)
   
There are project dependencies in the venv file, but if you want to create a new venv, follow this path:

For Windows: python -m venv myvenv ( creates a new virtual environment )

      For Windows : myvenv\Scripts\activate    ( Activate the created virtual environment. )
      For Linux Or Macos: source myvenv/bin/activate
      
=> pip install -r requirements.txt (Transfer the dependencies in requirements.txt in the repo directory to your virtual environment you created.)
=> python manage.py runserver (so the backend will work.)
      


