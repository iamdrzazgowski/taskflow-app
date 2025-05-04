import React, { createContext, useContext, useEffect, useState } from 'react';
import supabase from '../utils/supabaseClient';
import { useProfile } from './ProfileProvider';

const TeamsContext = createContext();

function TeamsProvider({ children }) {
    const [userTeams, setUserTeams] = useState([]);
    const [isTeamsLoading, setIsTeamsLoading] = useState(true);
    const { profile } = useProfile();

    const userId = profile?.id;

    useEffect(() => {
        const fetchUserTeams = async () => {
            if (!userId) return;

            try {
                setIsTeamsLoading(true);
                const { data, error } = await supabase
                    .from('user_team')
                    .select(
                        `
                    role,
                    team (
                        id,
                        name
                    )
                `
                    )
                    .eq('user_id', userId);

                if (error) {
                    setUserTeams([]);
                    throw new Error(error.message);
                } else {
                    setUserTeams(data);
                }
            } catch (error) {
                console.error('Error fetching user teams:', error);
                setUserTeams([]);
            } finally {
                setIsTeamsLoading(false);
            }
        };

        fetchUserTeams();
    }, [userId]);

    return (
        <TeamsContext.Provider
            value={{ userTeams, isTeamsLoading, setUserTeams }}>
            {children}
        </TeamsContext.Provider>
    );
}

function useTeams() {
    const context = useContext(TeamsContext);
    if (context === undefined) {
        throw new Error('useTeams must be used within a TeamsProvider');
    }
    return context;
}

export { TeamsProvider, useTeams };
