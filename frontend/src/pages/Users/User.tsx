import { useEffect } from "react";
import AddUsers from "../../components/UserActions/AddUsers";
import RemoveUsers from "../../components/UserActions/RemoveUsers";
import "./users.css";


import { fetchUsers, selectUsers } from './usersSlice';

import { fetchSkills, selectSelectedSkillId } from '../../components/SkillsFilter/skillsSlice'
import UsersTable from "../../components/Table/Table";
import UsersTableHeader from "../../components/Table/TableHeade";
import UserRow from "../../components/Table/TableRow";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { User } from "../../utils/types";
import UsersActions from "../../components/UserActions/UserActions";
import SkillsFilter from "../../components/SkillsFilter/SkillsFilter";



const Users: React.FC = () => {
  const { skills } = useAppSelector(state => state.skills);
  const users = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();
  const selectedSkill = useAppSelector(selectSelectedSkillId)

  useEffect(() => {
    dispatch(fetchUsers(selectedSkill));
  }, [dispatch, selectedSkill]);

  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);

  return (
    <div>
      <div className="heading">
        <h3>Platform Users</h3>
        <div className="filters">
          <SkillsFilter skills={skills} />
        </div>
      </div>

      <div>
        <UsersTable>
          <UsersTableHeader />
          {users?.map((user: User) => (
            <UserRow key={user.id.toString()} {...user} />
          ))}
        </UsersTable>
        <UsersActions>
          <AddUsers refetch={() => dispatch(fetchUsers())} />
          <RemoveUsers refetch={() => dispatch(fetchUsers())} />
        </UsersActions>
      </div>
    </div>
  );
}
export default Users