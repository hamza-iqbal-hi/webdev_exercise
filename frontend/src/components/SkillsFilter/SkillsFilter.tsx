import React, { useState } from "react";

import './SkillsDropdown.css';

import { useDispatch } from "react-redux";
import { setSelectedSkill } from "./skillsSlice";
import Button from "../Button/Button";
import { Skill } from "../../utils/types";

type Props = {
  skills: Skill[]
}
const SkillsDropdown: React.FC<Props> = ({ skills }) => {
  const [skill, setSkill] = useState("");
  const dispatch = useDispatch()
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSkill(event.target.value);
  };

  const handleFilter = () => {
    dispatch(setSelectedSkill(skill))

  };

  return (
    <div className="skills-dropdown" data-testid="skills-dropdown">
      <select value={skill} onChange={handleChange as any} data-testid="skills-select">
        <option value="">All Skills</option>
        {skills.map((skill) => (
          <option key={skill.id.toString()} value={skill.id.toString()}>
            {skill.name}
          </option>
        ))}
      </select>
      <Button onClick={handleFilter}>Filter</Button>
    </div>
  );
};

export default SkillsDropdown;