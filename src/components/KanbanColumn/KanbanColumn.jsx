import React, { useState } from 'react';
import TaskCard from '../TaskCard/TaskCard';
import CreateNewTaskForm from '../CreateNewTaskForm/CreateNewTaskForm';
import supabase from '../../utils/supabaseClient';

export default function KanbanColumn({
    title,
    colorClass,
    tasks,
    isMenuOpen,
    toggleMenu,
    members,
    allTasks,
    setTasks,
    taskStatus,
}) {
    const [showNewTaskForm, setShowNewTaskForm] = useState(false);

    const handleDeleteTask = async (taskId) => {
        if (!taskId) {
            console.error('Nieprawidłowe ID zadania:', taskId);
            return;
        }

        try {
            const { error } = await supabase
                .from('task')
                .delete()
                .eq('id', taskId);

            if (error) {
                console.error('Error deleting task:', error);
            } else {
                const newTaskList = allTasks.filter(
                    (task) => String(task.id) !== String(taskId)
                );
                setTasks(newTaskList);
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

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
                        onDeleteTask={handleDeleteTask}
                        members={members}
                        allTasks={allTasks}
                        setTasks={setTasks}
                    />
                ))}
                {showNewTaskForm ? (
                    <CreateNewTaskForm
                        members={members}
                        setShowNewTaskForm={setShowNewTaskForm}
                        taskStatus={taskStatus}
                        setTasks={setTasks}
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
