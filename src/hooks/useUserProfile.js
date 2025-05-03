import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthProvider';
import supabase from '../utils/supabaseClient';

export function useUserProfile() {
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user || profile) return;

            try {
                setIsLoading(true);

                const { data, error } = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', user.id)
                    .maybeSingle();

                if (error) {
                    console.error('Błąd przy pobieraniu profilu:', error);
                    setIsLoading(false);
                    return;
                }

                if (!data) {
                    navigate('/login');
                    return;
                }

                setProfile(data);
            } catch (error) {
                throw new Error('Error fetching profile: ' + error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [user, navigate, profile]);

    return { profile, isLoading };
}
