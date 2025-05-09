import React, { useState } from 'react';
import TaskCard from '../TaskCard/TaskCard';

export default function KanbanColumn({
    title,
    colorClass,
    tasks,
    isMenuOpen,
    toggleMenu,
    members,
}) {
    const [showNewTaskForm, setShowNewTaskForm] = useState(false);

    return (
        <div className='kanban-column'>
            <div className='column-header'>
                <div className='column-title-container'>
                    <div className={colorClass}></div>
                    <span>{title}</span>
                    <span className='task-count'>{tasks.length}</span>
                </div>
            </div>
            <div className='column-content'>
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        isMenuOpen={isMenuOpen}
                        toggleMenu={toggleMenu}
                    />
                ))}
                {showNewTaskForm ? (
                    <div className='task-form'>
                        <div className='form-header'>
                            <h3 className='form-title'>Create New Task</h3>
                            <button
                                class='form-close'
                                onClick={() =>
                                    setShowNewTaskForm(!showNewTaskForm)
                                }>
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
                        />
                        <textarea
                            name='description'
                            placeholder='Task description'
                            className='form-textarea'></textarea>
                        <div className='form-row'>
                            <div className='form-column'>
                                <select name='assignee' className='form-select'>
                                    <option value=''>Select person</option>
                                    {members.map((member) => (
                                        <option
                                            key={member.user.id}
                                            value={member.user.id}>
                                            {member.user.first_name}{' '}
                                            {member.user.last_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='form-column'>
                                <input
                                    type='date'
                                    name='deadline'
                                    className='form-date'
                                />
                            </div>
                        </div>
                        <div className='form-actions'>
                            <button className='button-submit'>ADD</button>
                        </div>
                    </div>
                ) : (
                    <button
                        className='add-task-button'
                        onClick={() => setShowNewTaskForm(!showNewTaskForm)}>
                        <i className='fas fa-plus add-icon'></i> Create new task
                    </button>
                )}
            </div>
        </div>
    );
}
