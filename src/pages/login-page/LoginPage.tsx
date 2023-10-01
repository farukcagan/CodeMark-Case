import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken, setUserData } from '../../redux/slices/AuthSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css"
import axios from 'axios';
import Swal from 'sweetalert2';

function LoginPage() {
    // Kullanıcı adı ve şifre durumlarını yerel state olarak saklar.
    const [username, setUsername] = useState<string>('kminchelle');
    const [password, setPassword] = useState<string>('0lelplR');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Kullanıcı adı değişikliklerini takip eden işlev.
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    // Şifre değişikliklerini takip eden işlev.
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    // Giriş işlemini gerçekleştiren işlev.
    const handleLogin = async () => {
        try {
            const response = await axios.post('https://dummyjson.com/auth/login', {
                username: username,
                password: password,
            });

            if (response.status === 200) {
                const data = response.data;
                console.log(data);

                // Başarılı giriş durumunda kullanıcıyı yönlendirir, token ve giren kullanıcı verilerini redux ve localstorage içinde saklar.
                Swal.fire({
                    title: 'Sayfaya Yönlendiriliyorsunuz',
                    html: 'Lütfen Bekleyiniz...',
                    didOpen: () => {
                        Swal.showLoading();
                        setTimeout(() => {
                            navigate('/users');
                            dispatch(setToken(data.token));
                            dispatch(setUserData(data));
                            localStorage.setItem('token', data.token);
                        }, 2000);
                    },
                });
            } 
        } catch {
            // Hatalı giriş durumunda hata mesajını gösterir.
            Swal.fire({
                toast: true,
                icon: "error",
                title: "İşlem Başarısız",
                text: 'E-posta veya şifre hatalı. Lütfen tekrar deneyin.',
                timerProgressBar: true,
                timer: 3000,
                showConfirmButton: false,
                position: "top-end",
            })
        }
    };

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <ToastContainer />
                <div className="card p-4 w-25">
                    <h2 className="text-center mb-4">Giriş</h2>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Kullanıcı Adı</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder={username}
                                value={username}
                                onChange={handleUsernameChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Şifre</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder={password}
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <div className="d-grid p-1">
                            <button
                                type="button"
                                className="btn btn-primary p-1"
                                onClick={handleLogin}
                            >
                                Giriş Yap
                            </button>
                        </div>
                    </form>

                    <div className='forgot-password'>
                        <a>Şiremi Unuttum?</a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginPage;
