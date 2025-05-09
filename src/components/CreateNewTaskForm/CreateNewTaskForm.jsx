import React, { useState } from 'react';
import { useParams } from 'react-router';
import useCreateNewTask from '../../hooks/useCreateNewTask';

export default function CreateNewTaskForm({
    members,
    setShowNewTaskForm,
    taskStatus,
    setTasks,
}) {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskAssignee, setTaskAssignee] = useState('');
    const [taskDeadline, setTaskDeadline] = useState('');
    const { teamId } = useParams();
    const { createNewTask } = useCreateNewTask();

    const handleCreateNewTask = (e) => {
        e.preventDefault();
        const taskId = crypto.randomUUID();

        const assignedUserData = members.find(
            (member) => member.user.id === taskAssignee
        );

        const newTask = {
            id: taskId,
            title: taskName,
            description: taskDescription,
            deadline: taskDeadline,
            status: taskStatus,
            assigned_user: {
                id: assignedUserData.user.id,
                first_name: assignedUserData.user.first_name,
                last_name: assignedUserData.user.last_name,
            },
        };

        createNewTask(
            taskId,
            taskName,
            taskDescription,
            taskDeadline,
            taskAssignee,
            teamId,
            taskStatus
        );

        setTasks((prevTasks) => [...prevTasks, newTask]);
        setShowNewTaskForm((prev) => !prev);
    };

    return (
        <form className='task-form' onSubmit={handleCreateNewTask}>
            <div className='form-header'>
                <h3 className='form-title'>Create New Task</h3>
                <button
                    className='form-close'
                    onClick={() => setShowNewTaskForm((prev) => !prev)}>
                    <i
                        className='fa-solid fa-xmark'
                        style={{ color: '#212121' }}></i>
                </button>
            </div>
            <input
                type='text'
                name='title'
                placeholder='Task name'
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
                        value={taskAssignee}
                        onChange={(e) => setTaskAssignee(e.target.value)}>
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
                    ADD
                </button>
            </div>
        </form>
    );
}
