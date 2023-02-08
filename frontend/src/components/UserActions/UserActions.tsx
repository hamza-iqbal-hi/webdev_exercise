import { ReactNode } from "react";
import './user-actions.css'
type Props = {
    children: ReactNode
}

const UsersActions: React.FC<Props> = ({ children }) => (
    <div className="users-actions">{children}</div>
);

export default UsersActions