import React, { useState } from 'react';
import supabase from '../../utils/supabaseClient';

export default function EditTaskForm({
    task,
    members,
    setIsEditMode,
    allTasks,
    setTasks,
}) {
    const [taskName, setTaskName] = useState(task.title);
    const [taskDescription, setTaskDescription] = useState(task.description);
    const [taskAssignee, setTaskAssignee] = useState(() =>
        members.find((member) => member.user.id === task.assigned_user.id)
    );
    const [taskDeadline, setTaskDeadline] = useState(task.deadline);

    const handleEditTask = async (e) => {
        e.preventDefault();

        try {
            const { error } = await supabase
                .from('task')
                .update({
                    user_id: taskAssignee.user.id,
                    title: taskName,
                    description: taskDescription,
                    deadline: taskDeadline,
                })
                .eq('id', task.id);

            if (error) {
                console.error('Error updating task:', error);
                return;
            }

            const updatedTask = {
                ...task,
                assigned_user: {
                    first_name: taskAssignee.user.first_name,
                    last_name: taskAssignee.user.last_name,
                    id: taskAssignee.user.id,
                },
                deadline: taskDeadline,
                description: taskDescription,
                title: taskName,
            };

            const updatedTasks = allTasks.map((t) =>
                t.id === task.id ? updatedTask : t
            );

            setTasks(updatedTasks);
        } catch (error) {
            console.error('Error updating task:', error);
        } finally {
            setIsEditMode(false);
        }
    };

    return (
        <form className='task-edit-form' onSubmit={handleEditTask}>
            <input
                type='text'
                name='title'
                placeholder='Task title'
                className='form-input'
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
            />
            <textarea
                name='description'
                placeholder='Task description'
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                className='form-textarea'></textarea>
            <div className='form-row'>
                <div className='form-column'>
                    <select
                        name='assignee'
                        className='form-select'
                        value={taskAssignee.user.id}
                        onChange={(e) => {
                            const selectedMember = members.find(
                                (member) => member.user.id === e.target.value
                            );
                            setTaskAssignee(selectedMember);
                        }}>
                        <option value=''>Select person</option>
                        {members.map((member) => (
                            <option key={member.user.id} value={member.user.id}>
                                {member.user.first_name} {member.user.last_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='form-column'>
                    <input
                        type='date'
                        name='deadline'
                        className='form-date'
                        value={taskDeadline}
                        onChange={(e) => setTaskDeadline(e.target.value)}
                    />
                </div>
            </div>
            <div className='form-actions'>
                <button className='button-submit' type='submit'>
                    Save
                </button>
                <button
                    className='button-close'
                    type='button'
                    onClick={() => setIsEditMode(false)}>
                    Close
                </button>
            </div>
        </form>
    );
}
