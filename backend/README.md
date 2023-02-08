# Flask App

Flask back-end for users/skill management.

## Getting Started

How to running project on local machine.

### Prerequisites

- [Python 3](https://www.python.org/downloads/)

### Installing

- pip install -r requirements.txt

### Running the project

- flask run --reload

The app will be available at [http://localhost:5000](http://localhost:5000).

### Running tests

- python -m unittest tests/test.py

### Routes

#### Skill Routes

- `GET /skills`: Retrieve a list of all skills
- `GET /skills/<skill_id>`: Retrieve a specific skill by ID
- `POST /skills`: Add a new skill
- `PUT /skills/<skill_id>`: Update a specific skill by ID
- `DELETE /skills/<skill_id>`: Delete a specific skill by ID

#### User Routes

- `GET /users`: Retrieve a list of all users
- `GET /users/<user_id>`: Retrieve a specific user by ID
- `POST /users`: Add a new user
- `PUT /users/<user_id>`: Update a specific user by ID
- `DELETE /users/<user_id>`: Delete a specific user by ID

## Change Log

See the [Change Log](./CHANGELOG.md) for a list of changes made.

## Built With

- [Flask](https://flask.palletsprojects.com)
- [SQLAlchemy](https://docs.sqlalchemy.org/en/13/intro.html)