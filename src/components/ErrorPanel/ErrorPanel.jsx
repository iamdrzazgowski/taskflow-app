import React from 'react';
import { useNavigate } from 'react-router';
import style from './ErrorPanel.module.css';

export default function ErrorPanel() {
    const navigate = useNavigate();

    return (
        <div className={style.errorContainer}>
            <div className={style.errorIcon}>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                    <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z' />
                </svg>
            </div>
            <h1 className={style.errorTitle}>Access Denied</h1>
            <p className={style.errorMessage}>
                You don't have permission to view this team. Please contact your
                administrator to request access.
            </p>
            <button className={style.backBtn} onClick={() => navigate('app')}>
                Return to Home Page
            </button>
        </div>
    );
}
