import { configureStore } from '@reduxjs/toolkit'
import skillsSlice from './components/SkillsFilter/skillsSlice'
import usersSlice from './pages/Users/usersSlice'

const store = configureStore({
  reducer: {
    skills: skillsSlice,
    users : usersSlice
  }
})
export default store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

