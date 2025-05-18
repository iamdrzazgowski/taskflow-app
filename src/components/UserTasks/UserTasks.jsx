import React, { useState } from 'react';
import supabase from '../../utils/supabaseClient';
import useUserTasks from '../../hooks/useUserTasks';
import Spinner from '../Spinner/Spinner';
import UserTaskCard from '../UserTaskCard/UserTaskCard';
import UserTasksError from '../UserTasksError/UserTasksError';

const spinnerContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
};

const cardContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1rem',
};

export default function UserTasks() {
    const { userTasks, isUserTasksLoading, setUserTasks } = useUserTasks();
    const [menuOpenTaskId, setMenuOpenTaskId] = useState(null);

    const toggleMenu = (taskId) => {
        setMenuOpenTaskId((prev) => (prev === taskId ? null : taskId));
    };

    const handleChangeStatus = async (taskId, newStatus) => {
        if (userTasks.find((task) => task.id === taskId).status === newStatus) {
            return;
        }

        try {
            const { error } = await supabase
                .from('task')
                .update({ status: newStatus })
                .eq('id', taskId);
            if (error) {
                console.error('Error changing task status:', error);
                return;
            }

            const updatedTasks = userTasks.map((task) => {
                if (task.id === taskId) {
                    return { ...task, status: newStatus };
                }
                return task;
            });

            setUserTasks(updatedTasks);
        } catch (error) {
            console.error('Error changing task status:', error);
        }
    };

    if (isUserTasksLoading)
        return (
            <div style={spinnerContainerStyle}>
                <Spinner />
            </div>
        );

    return (
        <>
            {userTasks.length > 0 ? (
                <div style={cardContainerStyle}>
                    {userTasks.map((task) => (
                        <UserTaskCard
                            key={task.id}
                            task={task}
                            onChangeStatus={handleChangeStatus}
                            isMenuOpen={menuOpenTaskId}
                            toggleMenu={toggleMenu}
                        />
                    ))}
                </div>
            ) : (
                <UserTasksError />
            )}
        </>
    );
}
