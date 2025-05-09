import React, { useState } from 'react';
import TaskCard from '../TaskCard/TaskCard';
import CreateNewTaskForm from '../CreateNewTaskForm/CreateNewTaskForm';

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
                    <CreateNewTaskForm
                        members={members}
                        setShowNewTaskForm={setShowNewTaskForm}
                    />
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
