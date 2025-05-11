import React, { useState } from 'react';
import EditTaskForm from '../EditTaskForm/EditTaskForm';

export default function TaskCard({
    task,
    isMenuOpen,
    toggleMenu,
    onDeleteTask,
    members,
    allTasks,
    setTasks,
}) {
    const [isEditMode, setIsEditMode] = useState(false);

    const handleOpenEditMode = () => {
        toggleMenu(null);
        setIsEditMode((prev) => !prev);
    };

    return (
        <div className='task-card'>
            <div className='task-header'>
                <h3 className='task-title'>{task.title}</h3>
                <button
                    className='task-menu-button'
                    onClick={() => {
                        toggleMenu(task.id);
                    }}>
                    <i className='fas fa-ellipsis-vertical'></i>
                </button>

                {isMenuOpen === task.id && (
                    <div className='dropdown-menu'>
                        <div className='dropdown-section'>
                            <button
                                className='dropdown-button'
                                onClick={handleOpenEditMode}>
                                <i className='fas fa-edit dropdown-icon'></i>{' '}
                                Edit
                            </button>
                        </div>
                        <div className='dropdown-separator'></div>
                        <div className='dropdown-section'>
                            <div className='dropdown-section-title'>
                                Change status:
                            </div>
                            <button className='dropdown-button'>
                                <div className='column-color-in-progress dropdown-icon'></div>{' '}
                                Move to IN PROGRESS
                            </button>
                            <button className='dropdown-button'>
                                <div className='column-color-done dropdown-icon'></div>{' '}
                                Move to DONE
                            </button>
                        </div>
                        <div className='dropdown-separator'></div>
                        <div className='dropdown-section'>
                            <button
                                className='dropdown-button dropdown-delete'
                                onClick={() => onDeleteTask(task.id)}>
                                <i className='fas fa-trash dropdown-icon'></i>{' '}
                                Delete
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <p className='task-description'>{task.description}</p>
            {isEditMode ? (
                <EditTaskForm
                    task={task}
                    members={members}
                    setIsEditMode={setIsEditMode}
                    allTasks={allTasks}
                    setTasks={setTasks}
                />
            ) : (
                <>
                    <div className='task-footer'>
                        <div className='task-assignee'>
                            <div className={`assignee-avatar`}>
                                <i
                                    className='fa-solid fa-circle-user'
                                    style={{ color: '#212121' }}></i>
                            </div>
                            <span className='assignee-name'>
                                {task.assigned_user.first_name}{' '}
                                {task.assigned_user.last_name}
                            </span>
                        </div>
                        <div className='task-deadline'>
                            <i className='fas fa-calendar deadline-icon'></i>
                            <span>{task.deadline}</span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
