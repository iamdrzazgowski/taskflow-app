import React from 'react';
import { useAuth } from '../../contexts/AuthProvider';
import { Navigate } from 'react-router';

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    console.log(loading);

    if (loading) {
        return <div>Ładowanie...</div>;
    }

    if (!user) return <Navigate to='/login' />;

    return children;
}
