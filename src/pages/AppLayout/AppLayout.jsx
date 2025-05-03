import React from 'react';
import { Link, Outlet } from 'react-router';
import AppNav from '../../components/AppNav/AppNav';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { useUserProfile } from '../../hooks/useUserProfile';
import style from './AppLayout.module.css';

export default function AppLayout() {
    const { profile, isLoading } = useUserProfile();

    if (isLoading || !profile) {
        return <LoadingScreen />;
    }

    return (
        <div className={style.container}>
            <AppNav profile={profile} />

            <div className={style.mainContent}>
                <Outlet />
            </div>
        </div>
    );
}
