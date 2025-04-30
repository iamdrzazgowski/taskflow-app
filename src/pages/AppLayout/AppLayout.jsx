import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../components/Navbar/Navbar';

export default function AppLayout() {
    return (
        <div>
            {/* TODO: Zrobić navbar po lewej stronie i po prawej resztę elementów */}
            <Navbar />
            <Outlet />
        </div>
    );
}
