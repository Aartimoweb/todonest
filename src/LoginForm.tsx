import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from './store/authAction';
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        const adminUsername = import.meta.env.VITE_ADMIN_USERNAME;
        const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;


        if (username === adminUsername && password === adminPassword) {
            dispatch(loginSuccess('admin'));
            navigate('/admin');
        } else {
            dispatch(loginFailure());
            alert('Invalid user  or password');
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <br></br>
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br></br><br></br>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginForm;
