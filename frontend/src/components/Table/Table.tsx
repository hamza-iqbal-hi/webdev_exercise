import React from 'react';
import './table.css'
type Props = {
    children: React.ReactNode;
}

const UsersTable: React.FC<Props> = ({ children }) => (
    <div className="users-table">{children}</div>
);
export default UsersTable  