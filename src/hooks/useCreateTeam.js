import React, { useState } from 'react';
import supabase from '../utils/supabaseClient';

export function useCreateTeam() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createTeam = async (teamName, teamId, userId) => {
        try {
            setError(null);
            setLoading(true);

            const { error: teamError } = await supabase.from('team').insert([
                {
                    id: teamId,
                    name: teamName,
                },
            ]);

            if (teamError) throw teamError;

            const { error: userTeamError } = await supabase
                .from('user_team')
                .insert([
                    {
                        user_id: userId,
                        team_id: teamId,
                        role: 'lider',
                    },
                ]);

            if (userTeamError) throw userTeamError;
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    return { createTeam, loading, error };
}

// const { data, error } = await supabase.from('teams').insert([
//     {
//         name: 'Team A',
//         user_teams: [{ user_id: userId }],
//     },
// ]);
