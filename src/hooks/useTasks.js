import React, { useEffect, useState } from 'react';
import supabase from '../utils/supabaseClient';
import { useParams } from 'react-router';

export function useTasks() {
    const { teamId } = useParams();
    const [tasks, setTasks] = useState([]);
    const [isTasksLoading, setIsTasksLoading] = useState(false);

    useEffect(() => {
        const fetchTasks = async (teamId) => {
            try {
                setIsTasksLoading(true);
                const { data, error } = await supabase
                    .from('task')
                    .select(
                        `
              id,
              title,
              description,
              deadline,
              status,
              assigned_user:user_id (
                first_name,
                last_name,
                id
              )
            `
                    )
                    .eq('team_id', teamId);

                if (error) {
                    throw new Error('Error fetching tasks:', error);
                }

                setTasks(data || []);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            } finally {
                setIsTasksLoading(false);
            }
        };

        fetchTasks(teamId);
    }, [teamId]);

    return { tasks, setTasks, isTasksLoading };
}
