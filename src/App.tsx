import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import LoginPage from './pages/login-page/LoginPage';
import UsersPage from './pages/users-page/UsersPage';
import TodoPage from './pages/todo-page/Todo';
import { store } from './pages/store/store';
import ErrorPage from './pages/eror-page/ErrorPage';

function App() {

    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path='/users' element={<UsersPage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/todos' element={<TodoPage />} />
                    <Route path='/*' element={<ErrorPage />} />

                </Routes>
            </Router>
        </Provider>
    );
}

export default App;

