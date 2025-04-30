import React from 'react';
import { Outlet } from 'react-router';

export default function AppLayout() {
    return (
        <>
            {/* TODO: Zrobić navbar po lewej stronie i po prawej resztę elementów */}
            <div>AppLayout</div>
            <Outlet />
        </>
    );
}
