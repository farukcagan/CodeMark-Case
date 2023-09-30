import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux'; // Redux Provider ekledik
import { store } from './store'; // Redux store ekledik
import LoginPage from './pages/login-page/LoginPage';
import UsersPage from './pages/users-page/UsersPage';
import { getUser } from './helpers/user/Helper';
import { RootState } from './redux/slices/RootReducer';
import TodoPage from './pages/todo-page/Todo';

function App() {
    const isAuth = getUser();

    return (
        <Provider store={store}>
            <Router>
                <Routes>

                    <Route path='/users' element={<UsersPage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/todos' element={<TodoPage />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
