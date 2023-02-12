import { configureStore } from '@reduxjs/toolkit'
import dashboardReducer from '../redux/dashboard/DashboardSlice'
import songReducer from '../redux/song/SongSlice'
export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    song: songReducer,
  },
})