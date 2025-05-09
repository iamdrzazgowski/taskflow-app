import React, { useState } from 'react';
import supabase from '../utils/supabaseClient';

export default function useCreateNewTask() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createNewTask = async (
        taskId,
        taskName,
        taskDescription,
        taskDeadline,
        taskAssignee,
        teamId,
        taskStatus
    ) => {
        try {
            setError(null);
            setLoading(true);

            const { error: taskError } = await supabase.from('task').insert([
                {
                    id: taskId,
                    title: taskName,
                    description: taskDescription,
                    deadline: taskDeadline,
                    status: taskStatus,
                    team_id: teamId,
                    user_id: taskAssignee,
                },
            ]);

            if (taskError) throw taskError;
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, createNewTask };
}
