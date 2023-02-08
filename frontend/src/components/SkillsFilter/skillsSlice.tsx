import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../store';
import { getAPIEndpoint } from '../../utils/helpers';
import { Skill } from '../../utils/types';
interface SkillsState {
  loading: Boolean,
  skills: Skill[] | [],
  selectedSkillId: Number | null,
  error: Object | null
}


const initialState: SkillsState = {
  loading: false,
  skills: [],
  selectedSkillId: null,
  error: null,
};

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    startLoading: state => {
      state.loading = true;
      state.error = null;
    },
    fetchSkillsSuccess: (state, action) => {
      state.loading = false;
      state.skills = action.payload;
    },
    fetchSkillsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createSkillSuccess: (state, action) => {
      state.loading = false;
      state.skills = [...state.skills, action.payload];
    },
    createSkillFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addSkill: (state, action) => {
      const existingSkill = state.skills.filter(skill => skill.id === action.payload.id)
      if (existingSkill.length === 0) {
        state.skills = [...state.skills, action.payload];
      }


    },
    setSelectedSkill: (state, action) => {
      state.selectedSkillId = action.payload
    }
  },
});

export const {
  startLoading,
  fetchSkillsSuccess,
  fetchSkillsFailure,
  createSkillSuccess,
  createSkillFailure,
  setSelectedSkill,
  addSkill
} = skillsSlice.actions;

export default skillsSlice.reducer;


export const fetchSkills = () => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  try {
    const response = await fetch(`${getAPIEndpoint()}/skill`);
    const { items } = await response.json();

    dispatch(fetchSkillsSuccess(items));
  } catch (error: any) {
    dispatch(fetchSkillsFailure(error?.message));
  }
};

export const createSkill = (skill: Skill) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  try {
    const response = await fetch(`${getAPIEndpoint()}/skills`, {
      method: 'POST',
      body: JSON.stringify({ name: skill }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const { items } = await response.json();

    dispatch(createSkillSuccess(items[0]));
  } catch (error: any) {
    dispatch(createSkillFailure(error.message));
  }
};

export const selectSelectedSkillId = (state: RootState) => state.skills.selectedSkillId;