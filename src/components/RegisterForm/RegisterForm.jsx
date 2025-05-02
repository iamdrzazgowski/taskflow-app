import React, { useState } from 'react';
import supabase from '../../utils/supabaseClient';
import style from './RegisterForm.module.css';
import Spinner from '../Spinner/Spinner';
import { useNavigate } from 'react-router';

export default function RegisterForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (password === confirmPassword) {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                });

                if (error) {
                    throw new Error('Error signing up: ' + error.message);
                }

                const userId = data?.user.id;

                const { error: insertError } = await supabase
                    .from('users')
                    .insert([
                        {
                            id: userId,
                            first_name: firstName,
                            last_name: lastName,
                            email,
                        },
                    ]);

                if (insertError) {
                    throw new Error(
                        'Error inserting user into users table: ' +
                            insertError.message
                    );
                } else {
                    navigate('/login');
                }
            } else {
                setIsLoading(false);
                throw new Error('Passwords do not match');
            }
        } catch (err) {
            throw new Error('Error during registration: ' + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return isLoading ? (
        <Spinner />
    ) : (
        <form onSubmit={handleRegister}>
            <div className={style.fromRow}>
                <div className={style.formGroup}>
                    <label htmlFor='first-name'>First Name</label>
                    <input
                        type='text'
                        id='first-name'
                        name='first-name'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>

                <div className={style.formGroup}>
                    <label htmlFor='last-name'>Last Name</label>
                    <input
                        type='text'
                        id='last-name'
                        name='last-name'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
            </div>

            <div className={style.formGroup}>
                <label htmlFor='email'>Email</label>
                <input
                    type='email'
                    id='email'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className={style.formGroup}>
                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    id='password'
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <div className={style.formGroup}>
                <label htmlFor='confirm-password'>Confirm Password</label>
                <input
                    type='password'
                    id='confirm-password'
                    name='confirm-password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>

            <button type='submit' className={style.btn}>
                Register
            </button>
        </form>
    );
}
