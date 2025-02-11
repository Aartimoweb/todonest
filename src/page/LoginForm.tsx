import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { loginSuccess,loginFailure } from '../store/authAction';
import { useNavigate } from 'react-router-dom';
import { RootState } from "../store/store";
import UserDetail from './Users';



const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const users = useSelector((state: RootState) => state.user.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        const adminUsername = import.meta.env.VITE_ADMIN_USERNAME;
        const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;


        if (username === adminUsername && password === adminPassword) {
            dispatch(loginSuccess('admin'));
            navigate('/admin');
        }
         
        const registeredUser = users.find(user => user.username === username && user.password === password);
        if (registeredUser) {
            navigate(`/users/${registeredUser.id}`);  
          } else {
            setErrorMessage("Invalid username or password. Please try again.");
          }
    };

    return (
        <div>
            <h1>Login</h1>
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
