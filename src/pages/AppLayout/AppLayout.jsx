import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../components/Navbar/Navbar';
import supabase from '../../utils/supabaseClient';

export default function AppLayout() {
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error signing out:', error.message);
        } else {
            console.log('User signed out successfully');
        }
    };

    return (
        <div>
            {/* TODO: Zrobić navbar po lewej stronie i po prawej resztę elementów */}
            <Navbar />
            <Outlet />
            <button onClick={handleLogout}></button>
        </div>
    );
}
