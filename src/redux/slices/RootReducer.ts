import { combineReducers } from 'redux';
import authReducer from './AuthSlice';
import { store } from '../../pages/store/store';

const rootReducer = combineReducers({
  auth: authReducer,
});


export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch

export default rootReducer;
