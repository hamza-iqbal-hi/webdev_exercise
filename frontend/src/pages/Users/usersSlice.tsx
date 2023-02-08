import { createSlice } from '@reduxjs/toolkit';
import { addSkill } from '../../components/SkillsFilter/skillsSlice';
import { AppDispatch, RootState } from '../../store';
import { getAPIEndpoint } from '../../utils/helpers';
import {  User } from '../../utils/types';
interface UserState {
  users: User[],
  loading: Boolean,
  error: any
}
const initialState: UserState = {
  users: [],
  loading: false,
  error: null
};
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addSkillToUser: (state, action) => {
      console.log(action.payload)
      const userId = action.payload.id;
      state.users = state.users.map(user => {
        if (user.id === userId) {
          return action.payload
        } else {
          return user
        }
      });
    },
    getUsersStart: state => {
      state.loading = true;
      state.error = null;
    },
    getUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    getUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSkillFromUserSuccess: (state, action) => {
      state.users = state.users.map((user) => {
        if (user.id === action.payload.id) {
          return action.payload
        }
        return user
      })
    }
  }
});

export const { addSkillToUser, getUsersStart, getUsersSuccess, getUsersFailure, deleteSkillFromUserSuccess } = usersSlice.actions;
export const fetchUsers = (skill:Number | null = null) => async (dispatch: AppDispatch) => {
  let url = ''
  if (skill) {
    url = `${getAPIEndpoint()}/users?skill=${skill}`
  } else {
    url = `${getAPIEndpoint()}/users`
  }
  try {
    dispatch(getUsersStart());
    const response = await fetch(url);
    const { items } = await response.json();
    dispatch(getUsersSuccess(items));
  } catch (err: any) {
    dispatch(getUsersFailure(err.message));
  }
};
export const createUserSkill = (userId: Number, skill: String) => async (dispatch: AppDispatch) => {
  try {
    const response = await fetch(`${getAPIEndpoint()}/user/${userId}/skill`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: skill
      })
    });
    const { user } = await response.json();
    dispatch(addSkillToUser(user));
    dispatch(addSkill(user.skills[user.skills.length - 1]))
  } catch (err) {
    console.log(err)
  }
};
export const deleteUserSkill = (userId: Number, skillId: Number) => (dispatch: AppDispatch) => {
  try {
    fetch(`${getAPIEndpoint()}/user/${userId}/skill/${skillId}`, {
      method: "DELETE",
    })
      .then(response => response.json())
      .then(({ user }) => {
        dispatch(deleteSkillFromUserSuccess(user));
      });
  } catch (err) {
    console.log(err)
  }
};
export const selectUsers = (state: RootState) => state.users.users;
export const selectLoading = (state: RootState) => state.users.loading;
export const selectError = (state: RootState) => state.users.error;

export default usersSlice.reducer;

