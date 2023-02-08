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

### Routes

#### Skill Routes

- `GET /skill`: Retrieve a list of all skills
- `GET /skill/<skill_id>`: Retrieve a specific skill by ID
- `POST /skill`: Add a new skill
- `PUT /skill/<skill_id>`: Update a specific skill by ID
- `DELETE /skill/<skill_id>`: Delete a specific skill by ID

#### User Routes

- `GET /users`: Retrieve a list of all users
- `POST /users`: Create bulk users
- `DELETE /users/`: Delete all users
- `GET /user/<user_id>`: Retrieve a specific user by ID
- `POST /user`: Add a new user
- `PUT /user/<user_id>`: Update a specific user by ID
- `DELETE /user/<user_id>`: Delete a specific user by ID
- `POST /user/<user_id>/skill`: Add Skill to a specific User
- `DELETE /user/<user_id>/skill/<skill_id>`: Delete skill from a User

## Change Log

See the [Change Log](./CHANGELOG.md) for a list of changes made.

## Built With

- [Flask](https://flask.palletsprojects.com)
- [SQLAlchemy](https://docs.sqlalchemy.org/en/13/intro.html)