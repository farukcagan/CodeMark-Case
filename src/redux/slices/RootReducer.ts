import { combineReducers } from 'redux';
import authReducer from './AuthSlice';
import { store } from '../../store/store';

const rootReducer = combineReducers({
  auth: authReducer,
});


export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch

export default rootReducer;
