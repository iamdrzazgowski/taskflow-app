import React, { useState } from 'react';
import KanbanColumn from '../KanbanColumn/KanbanColumn';
import './KanbanBoard.css';

export default function KanbanBoard({ tasks, members }) {
    const [menuOpenTaskId, setMenuOpenTaskId] = useState(null);

    const toggleMenu = (taskId) => {
        setMenuOpenTaskId((prev) => (prev === taskId ? null : taskId));
    };

    console.log(members);

    return (
        <div className='kanban-container'>
            <div className='kanban-board'>
                <KanbanColumn
                    title='TODO'
                    colorClass='column-color-todo'
                    tasks={tasks.filter((task) => task.status === 'todo')}
                    isMenuOpen={menuOpenTaskId}
                    toggleMenu={toggleMenu}
                    members={members}
                />
                <KanbanColumn
                    title='IN PROGRESS'
                    colorClass='column-color-in-progress'
                    tasks={tasks.filter(
                        (task) => task.status === 'in_progress'
                    )}
                    isMenuOpen={menuOpenTaskId}
                    toggleMenu={toggleMenu}
                    members={members}
                />
                <KanbanColumn
                    title='DONE'
                    colorClass='column-color-done'
                    tasks={tasks.filter((task) => task.status === 'done')}
                    isMenuOpen={menuOpenTaskId}
                    toggleMenu={toggleMenu}
                    members={members}
                />
            </div>
        </div>
    );
}
