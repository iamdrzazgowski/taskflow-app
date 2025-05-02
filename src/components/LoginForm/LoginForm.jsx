import React from 'react';
import { useState } from 'react';
import supabase from '../../utils/supabaseClient';
import { useNavigate } from 'react-router';
import style from './LoginForm.module.css';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (!error) navigate('/dashboard');
        else alert('Login failed: ' + error.message);
    };
    return (
        <form onSubmit={handleLogin}>
            <div className={style.formGroup}>
                <label>Email:</label>
                <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className={style.formGroup}>
                <label>Password:</label>
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type='submit' className={style.btn}>
                Login
            </button>
        </form>
    );
}
