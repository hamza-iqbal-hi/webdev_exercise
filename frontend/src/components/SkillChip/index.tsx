import React from 'react';
import './SkillChip.css'
type Props = {
  children: React.ReactNode;
  onDelete: () => void;
}
const SkillChip: React.FC<Props> = ({ children, onDelete }) => {
  return (
    <div className="chip">
      {children}
      <button onClick={onDelete} className="delete-button">
        &times;
      </button>
    </div>
  );
};

export default SkillChip;