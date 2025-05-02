import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router';
import Navbar from '../../components/Navbar/Navbar';
import supabase from '../../utils/supabaseClient';
import { useAuth } from '../../contexts/AuthProvider';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

export default function AppLayout() {
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user || profile) return;

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
            setIsLoading(false);
        };

        fetchProfile();
    }, [user, navigate, profile]);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Błąd przy wylogowaniu:', error.message);
        }
    };

    if (isLoading || !profile) {
        return <LoadingScreen />;
    }

    return (
        <div>
            <p>{profile.first_name}</p>
            {/* TODO: Zrobić navbar po lewej stronie i po prawej resztę elementów */}
            <Navbar />
            <Outlet />
            <button onClick={handleLogout}></button>
            <Link to='/app/userTasks'>User Tasks</Link>
            <Link to='/app/teams'>Teams</Link>
        </div>
    );
}
