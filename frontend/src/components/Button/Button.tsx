import React from 'react';
import './button.css'
type Props = {
    variant?: 'default' | 'ghost';
    children: React.ReactNode;
    onClick: () => void;
};

const Button: React.FC<Props> = ({ variant = 'default', children, onClick }) => {
    return (
        <button
            className={`button button-${variant}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;