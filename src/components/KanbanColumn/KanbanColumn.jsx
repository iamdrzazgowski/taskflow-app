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
}) {
    const [showNewTaskForm, setShowNewTaskForm] = useState(false);

    const handleDeleteTask = async (taskId) => {
        if (!taskId) {
            console.error('Nieprawidłowe ID zadania:', taskId);
            return;
        }

        console.log('Deleting task with ID:', taskId);
        console.log(taskId);

        try {
            const { error } = await supabase
                .from('task')
                .delete()
                .eq('id', taskId);

            if (error) {
                console.error('Error deleting task:', error);
            } else {
                console.log('Task deleted successfully');
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
