import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import supabase from '../utils/supabaseClient';

export function useMembers() {
    const [members, setMembers] = useState([]);
    const [isMembersLoading, setIsMembersLoading] = useState(false);
    const { teamId } = useParams();

    useEffect(() => {
        const fetchMembers = async (teamId) => {
            try {
                setIsMembersLoading(true);
                const { data, error } = await supabase
                    .from('user_team')
                    .select(
                        `
                  role,
                  user:user_id (
                    id,
                    first_name,
                    last_name,
                    email
                  )
                `
                    )
                    .eq('team_id', teamId);

                if (error) {
                    console.error('Error fetching members:', error);
                }
                setMembers(data || []);
            } catch (error) {
                console.error('Error fetching members:', error);
            } finally {
                setIsMembersLoading(false);
            }
        };

        fetchMembers(teamId);
    }, [teamId]);

    return { members, isMembersLoading, setMembers };
}
