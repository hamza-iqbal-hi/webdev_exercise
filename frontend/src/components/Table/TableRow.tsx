import React from 'react';

import { deleteUserSkill } from '../../pages/Users/usersSlice';
import SkillChip from '../SkillChip';
import { useAppDispatch } from '../../utils/hooks'
import { User } from '../../utils/types';
import Modal from '../AddSkill/Modal';

const UserRow: React.FC<User> = ({ id, name, skills }) => {
    const dispatch = useAppDispatch()
    return (
        <div className="users-table__row">
            <div>{id.toString()}</div>
            <div>{name}</div>
            <div className="skill-chips">
                {skills.map((skill) => <SkillChip onDelete={() => { dispatch(deleteUserSkill(id, skill.id)) }}>{skill.name}</SkillChip>)}
            </div>
            <div>
                <Modal id={id} name={name} skills={skills} />
            </div>
        </div >
    )

};

export default UserRow