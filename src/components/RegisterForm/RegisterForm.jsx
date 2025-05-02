import React, { useState } from 'react';
import style from './RegisterForm.module.css';
import Spinner from '../Spinner/Spinner';
import { useRegister } from '../../hooks/useRegister';

export default function RegisterForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const { register, isLoading } = useRegister();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register({
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
            });
        } catch (error) {
            throw new Error('Error during registration: ' + error.message);
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
