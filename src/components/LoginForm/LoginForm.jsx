import React from 'react';
import { useState } from 'react';
import supabase from '../../utils/supabaseClient';
import { useNavigate } from 'react-router';

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
            <div>
                <label>Email:</label>
                <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Hasło:</label>
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type='submit'>Logowanie...</button>
        </form>
    );
}
