import React, { useState } from 'react';
import { createUserSkill } from '../../pages/Users/usersSlice';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { User } from '../../utils/types';
import Button from '../Button/Button';
import './modal.css';

const Modal: React.FC<User> = (props) => {
    const [selectedSkill, setSelectedSkill] = useState('');
    const [newSkill, setNewSkill] = useState('');
    const [showModal, setShowModal] = useState(false);

    const { skills } = useAppSelector(state => state.skills);

    const dispatch = useAppDispatch();
    const handleClose = () => {
        setShowModal(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedSkill(event.target.value);
    };

    const handleNewSkill = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewSkill(event.target.value);
        setSelectedSkill('')
    };

    const saveSkill = () => {
        if (selectedSkill === '' && newSkill === '') {
            return
        }
        setShowModal(false)
        if (selectedSkill) {
            dispatch(createUserSkill(props.id, selectedSkill))
        } else if (newSkill) {
            dispatch(createUserSkill(props.id, newSkill))
        }
    };

    return (
        <div>
            <Button onClick={() => setShowModal(true)} variant="ghost">Add Skill</Button>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className='name'>{props.name}</div>
                            <span onClick={handleClose}>&times;</span>
                        </div>

                        <div className="modal-body">
                            <h4>Add Skills</h4>

                            <label>
                                <input
                                    type="radio"
                                    name="skill"
                                    checked={!!selectedSkill}
                                //onChange={handleChange}
                                />
                                Select from the list:
                                <select value={selectedSkill} onChange={handleChange as any}>
                                    <option value={null as any}>Select a skill</option>
                                    {skills.map((skill) => (
                                        <option key={skill.id.toString()} value={skill.name as any}>
                                            {skill.name}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <br />
                            <br />
                            <label>
                                <input
                                    type="radio"
                                    name="skill"
                                    checked={!!newSkill}

                                />
                                Type in a new skill:
                                <input
                                    type="text"
                                    value={newSkill}
                                    onChange={handleNewSkill}
                                />
                            </label>
                        </div>
                        <hr />
                        <div className="modal-footer">
                            <Button onClick={saveSkill}>Save</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal;
