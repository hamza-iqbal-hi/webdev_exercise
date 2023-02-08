
import React from 'react';


const UsersTableHeader: React.FC = () => (
    <div className="users-table__row">
        <div className="users-table__col-header">Id</div>
        <div className="users-table__col-header">Name</div>
        <div className="users-table__col-header">Skills</div>
        <div className="users-table__col-header">Action</div>
    </div>
);
export default UsersTableHeader