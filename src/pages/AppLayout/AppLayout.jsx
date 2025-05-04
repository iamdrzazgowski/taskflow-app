import React from 'react';
import { Link, Outlet } from 'react-router';
import AppNav from '../../components/AppNav/AppNav';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import style from './AppLayout.module.css';
import { useProfile } from '../../contexts/ProfileProvider';

export default function AppLayout() {
    const { profile, isProfileLoading } = useProfile();

    if (isProfileLoading || !profile) {
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
