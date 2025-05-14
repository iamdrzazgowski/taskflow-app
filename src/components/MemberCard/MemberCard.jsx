import React from 'react';
import userImage from '../../assets/images/user-img.jpg';

export default function MemberCard({ user, tasks, children }) {
    const userTasks = tasks.filter((task) => task.assigned_user.id === user.id);

    const doneUserTasks = userTasks.filter((task) => task.status === 'done');

    return (
        <div className='member-card'>
            <div className='member-avatar'>
                <img
                    src={userImage}
                    alt={`${user.first_name} ${user.last_name}`}
                />
            </div>
            <div className='member-name'>
                {user.first_name} {user.last_name}
            </div>
            <div className='member-role'>{user.email}</div>
            <div className='member-stats'>
                <div className='stat'>
                    <div className='stat-value'>{userTasks.length}</div>
                    <div className='stat-label'>Zadania</div>
                </div>
                <div className='stat'>
                    <div className='stat-value'>{doneUserTasks.length}</div>
                    <div className='stat-label'>Ukończone</div>
                </div>
            </div>
            {children}
        </div>
    );
}
