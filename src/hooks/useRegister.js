import React, { useState } from 'react';
import supabase from '../utils/supabaseClient';
import { useNavigate } from 'react-router';

export function useRegister() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const register = async ({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
    }) => {
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

    return { register, isLoading };
}
