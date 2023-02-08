from typing import List, ForwardRef, Dict

from flask_sqlalchemy import SQLAlchemy
from pydantic import BaseModel

db = SQLAlchemy()


"""
FOR SKILLS
"""


class Skill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return "<Sill %r>" % self.name


class SkillSchema(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True


class SkillCollectionResponse(BaseModel):
    items: List[SkillSchema]


class SkillResponse(BaseModel):
    skill: SkillSchema


'''
FOR USERS
'''


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    skills = db.relationship('Skill', secondary='user_skills', lazy="subquery",  backref=db.backref("users")
                             , cascade="all,delete")

    def __repr__(self):
        return "<User %r>" % self.name


class UserSchema(BaseModel):
    id: int
    name: str
    skills: List[SkillSchema]

    class Config:
        orm_mode = True


class UserCollectionResponse(BaseModel):
    items: List[UserSchema]


class UserResponse(BaseModel):
    user: UserSchema


class UserSkills(db.Model):
    """
    for many-to-many association,
    onDelete CASCADE
    """
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'), primary_key=True)
    skill_id = db.Column(db.Integer, db.ForeignKey('skill.id',  ondelete='CASCADE'), primary_key=True)
