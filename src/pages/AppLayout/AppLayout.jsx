import React from 'react';
import { Link, Outlet } from 'react-router';
import Navbar from '../../components/Navbar/Navbar';
import supabase from '../../utils/supabaseClient';
import { useAuth } from '../../contexts/AuthProvider';

export default function AppLayout() {
    const { profile } = useAuth();
    console.log('AppLayout profile:', profile);
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error signing out:', error.message);
        } else {
            console.log('User signed out successfully');
        }
    };

    if (!profile) {
        return <div>Loading...</div>;
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
