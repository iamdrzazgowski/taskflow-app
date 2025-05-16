import React, { useEffect, useState } from 'react';
import { useProfile } from '../contexts/ProfileProvider';
import supabase from '../utils/supabaseClient';

export default function useUserTasks() {
    const { profile } = useProfile();
    const [userTasks, setUserTasks] = useState([]);
    const [isUserTasksLoading, setIsUserTasksLoading] = useState(false);

    const userId = profile?.id;
    console.log('userId', userId);

    useEffect(() => {
        const fetchUserTasks = async (userId) => {
            try {
                setIsUserTasksLoading(true);
                const { data, error } = await supabase
                    .from('task')
                    .select(
                        `id,
                        title,
                        description,
                        deadline,
                        status,
                        team (
                        name
                        )`
                    )
                    .eq('user_id', userId);

                if (error) {
                    throw new Error('Error fetching user tasks:', error);
                }
                setUserTasks(data);
            } catch (error) {
                console.error('Error fetching user tasks:', error);
            } finally {
                setIsUserTasksLoading(false);
            }
        };

        fetchUserTasks(userId);
    }, [userId]);

    return { userTasks, setUserTasks, isUserTasksLoading };
}
