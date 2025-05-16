import React from 'react';
import style from './UserTaskCard.module.css';

const badgeColor = {
    todo: '#3b82f6',
    in_progress: '#eab308',
    done: '#22c55e',
};

export default function UserTaskCard({
    task,
    onChangeStatus,
    isMenuOpen,
    toggleMenu,
}) {
    const badgeBG = badgeColor[task.status];

    return (
        <div className={style.taskCard}>
            <div className={style.cardHeader}>
                <div
                    className={style.statusBadge}
                    style={{ backgroundColor: badgeBG }}>
                    {task.status}
                </div>

                <button
                    className={style.menuToggle}
                    onClick={() => {
                        toggleMenu(task.id);
                    }}>
                    ⋮
                </button>

                {isMenuOpen === task.id && (
                    <div className={style.dropdownMenu} id='statusDropdown'>
                        <div className={style.dropdownMenuHeader}>
                            Change Status
                        </div>
                        <ul className={style.statusOptions}>
                            <li
                                className={style.statusOption}
                                onClick={() => {
                                    onChangeStatus(task.id, 'todo');
                                    toggleMenu(null);
                                }}>
                                <span
                                    className={`${style.statusOptionIndicator} ${style.indicatorNotStarted}`}></span>
                                TODO
                            </li>
                            <li
                                className={`${style.statusOption}`}
                                onClick={() => {
                                    onChangeStatus(task.id, 'in_progress');
                                    toggleMenu(null);
                                }}>
                                <span
                                    className={`${style.statusOptionIndicator} ${style.indicatorInProgress}`}></span>
                                IN PROGRESS
                            </li>
                            <li
                                className={`${style.statusOption}`}
                                onClick={() => {
                                    onChangeStatus(task.id, 'done');
                                    toggleMenu(null);
                                }}>
                                <span
                                    className={`${style.statusOptionIndicator} ${style.indicatorDone}`}></span>
                                DONE
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            <h1 className={style.taskTitle}>{task.title}</h1>
            <p className={style.taskDescription}>{task.description}</p>

            <div className={style.infoSection}>
                <div className={style.infoLabel}>DEADLINE</div>
                <div className={style.infoValue}>{task.deadline}</div>
            </div>

            <div className={style.teamBadge}>
                <div className={style.teamBadgeDot}></div>
                <div className={style.teamBadgeText}>{task.team.name}</div>
            </div>
        </div>
    );
}
