import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './redux/slices/RootReducer'

export const store = configureStore({
  reducer: rootReducer
})

