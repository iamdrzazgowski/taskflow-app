import React from 'react';

export default function CreateNewTaskForm({ members, setShowNewTaskForm }) {
    return (
        <form className='task-form'>
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
                            <option key={member.user.id} value={member.user.id}>
                                {member.user.first_name} {member.user.last_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='form-column'>
                    <input type='date' name='deadline' className='form-date' />
                </div>
            </div>
            <div className='form-actions'>
                <button className='button-submit'>ADD</button>
            </div>
        </form>
    );
}
