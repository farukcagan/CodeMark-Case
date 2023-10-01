import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../redux/slices/RootReducer';

// Redux store oluşturur.
export const store = configureStore({
  reducer: rootReducer
});
