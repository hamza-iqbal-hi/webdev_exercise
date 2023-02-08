from faker import Faker
from flask import Flask, request, jsonify
from flask_cors import CORS

from models import db, User, UserCollectionResponse, UserResponse, Skill, SkillCollectionResponse, SkillResponse

fake = Faker()


def create_app():
    _app = Flask(__name__)
    _app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"
    _app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.init_app(_app)
    with _app.app_context():
        db.drop_all()
        db.create_all()
    return _app


app = create_app()

CORS(app)


'''
ROUTES FOR BULK ACTIONS ON USER
'''


@app.route("/users", methods=["GET"])
def users():
    with app.app_context():
        skill_to_filter = request.args.get("skill")
        if skill_to_filter:
            filtered_users = User.query.filter(User.skills.any(Skill.id == skill_to_filter)).all()
            return UserCollectionResponse(items=filtered_users).json()
        results = User.query.all()
    return UserCollectionResponse(items=results).json(), 200


@app.route("/users", methods=["POST"])
def create_users_batch():
    with app.app_context():
        '''
        To Enforce Foreign Keys
        '''
        db.session.execute('pragma foreign_keys=on')
        for x in range(10):
            db.session.add(User(name=fake.name()))
        db.session.commit()
    return "Users created", 201


@app.route("/users", methods=["DELETE"])
def delete_all_users():
    with app.app_context():
        db.session.query(User).delete()
        db.session.commit()
    return "Users deleted", 200


'''
ROUTES FOR USER
'''


@app.route('/user/<int:user_id>', methods=['GET'])
def user(user_id):
    """
    GET a user with user_id
    """
    existing_user = User.query.get(user_id)
    if not existing_user:
        return "User not found", 404
    return UserResponse(user=existing_user).json()


@app.route('/user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    """
    DELETE a single user with user_id
    """
    user_to_delete = User.query.get(user_id)
    if user_to_delete:
        db.session.delete(user_to_delete)
    db.session.commit()
    return "User deleted", 201


@app.route('/user', methods=['POST'])
def create_user():
    """
    CREATE a single user with a specific name in request
    """
    data = request.get_json()
    db.session.add(User(name=data['name']))
    db.session.commit()
    return "Users created", 201


@app.route("/user/<int:user_id>/skill", methods=["POST"])
def add_skill_to_user(user_id):
    """
    This function adds skill to user if skill exists in DB
    If not, add skill to db and then add to user
    """
    m_user = User.query.get(user_id)
    if not m_user:
        return "User not found", 404
    data = request.get_json()
    skill_name = data.get("name")
    skill = Skill.query.filter_by(name=skill_name).first()
    if skill is None:
        skill = Skill(name=skill_name)
        db.session.add(skill)
        db.session.commit()
    elif skill in m_user.skills:
        return "Skill already added to user", 400
    m_user.skills.append(skill)
    db.session.commit()
    return UserResponse(user=m_user).json(), 201


@app.route("/user/<int:user_id>/skill/<int:skill_id>", methods=["DELETE"])
def delete_skill_from_user(user_id, skill_id):
    """
    DELETE a skill with skill_id from a user with user_id
    """
    existing_user = User.query.get(user_id)
    if existing_user is None:
        return 'User not found', 404
    existing_skill = Skill.query.get(skill_id)
    if existing_skill is None:
        return 'Skill not found', 404
    existing_user.skills.remove(existing_skill)
    db.session.commit()
    return UserResponse(user=existing_user).json(), 200


'''
ROUTES FOR SKILL
'''


@app.route("/skill", methods=["GET"])
def all_skills():
    """GET all saved skills from DB"""
    with app.app_context():
        results = Skill.query.all()
    return SkillCollectionResponse(items=results).json(), 200


@app.route("/skill/<int:skill_id>", methods=["GET"])
def skill(skill_id):
    existing_skill = Skill.query.get(skill_id)
    if not existing_skill:
        return "Skill not found", 404
    db.session.commit()
    return SkillResponse(skill=existing_skill).json(), 200


@app.route("/skill", methods=["POST"])
def create_skill():
    data = request.get_json()
    skill_name = data.get("name")

    new_skill = Skill(name=skill_name)
    db.session.add(new_skill)
    db.session.commit()
    return SkillResponse(skill=new_skill).json(), 201


@app.route("/skill/<int:skill_id>", methods=["PUT"])
def update_skill(skill_id):
    """UPDATE a skill name with a new name from request"""
    skill_to_update = Skill.query.get(skill_id)
    if not skill_to_update:
        return "Skill not found", 404
    data = request.get_json()
    skill_to_update.name = data['name']
    db.session.commit()
    return SkillResponse(skill=skill_to_update).json(), 200


@app.route("/skill/<int:skill_id>", methods=["DELETE"])
def delete_skill(skill_id):
    skill_to_delete = Skill.query.get(skill_id)
    if not skill_to_delete:
        return "Skill not found", 404

    db.session.delete(skill_to_delete)
    db.session.commit()

    return "Skill deleted successfully", 200


if __name__ == "__main__":
    app.run()
