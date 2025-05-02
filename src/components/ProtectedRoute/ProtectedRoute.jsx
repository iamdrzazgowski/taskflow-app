import React from 'react';
import { useAuth } from '../../contexts/AuthProvider';
import { Navigate } from 'react-router';
import LoadingScreen from '../../pages/LoadingScreen/LoadingScreen';

export default function ProtectedRoute({ children }) {
    const { user, isLoading } = useAuth();

    if (isLoading) return <LoadingScreen />;

    if (!user) return <Navigate to='/login' />;

    return children;
}
