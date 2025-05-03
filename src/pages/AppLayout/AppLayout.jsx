import React from 'react';
import { Link, Outlet } from 'react-router';
import Navbar from '../../components/Navbar/Navbar';
import supabase from '../../utils/supabaseClient';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { useUserProfile } from '../../hooks/useUserProfile';

export default function AppLayout() {
    const { profile, isLoading } = useUserProfile();

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
