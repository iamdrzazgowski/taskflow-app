import React, { createContext, useContext } from 'react';
import { useUserProfile } from '../hooks/useUserProfile';

const ProfileContext = createContext();

function ProfileProvider({ children }) {
    const { profile, isProfileLoading } = useUserProfile();
    return (
        <ProfileContext.Provider value={{ profile, isProfileLoading }}>
            {children}
        </ProfileContext.Provider>
    );
}

function useProfile() {
    const context = useContext(ProfileContext);
    if (context === undefined) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }
    return context;
}

export { ProfileProvider, useProfile };
