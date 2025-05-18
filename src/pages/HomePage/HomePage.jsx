import React from 'react';
import { useProfile } from '../../contexts/ProfileProvider';
import styles from './HomePage.module.css';
import UserTasks from '../../components/UserTasks/UserTasks';

export default function HomePage() {
    const { profile } = useProfile();

    return (
        <>
            <div className={styles.welcomeScreen}>
                <img src='welcome_image.svg' className={styles.welcomeImage} />
                <h1 className={styles.welcomeHeader}>Welcome to TaskFlow!</h1>
                <p className={styles.welcomeSubtitle}>
                    Your personal task assistant. Manage your tasks quickly and
                    efficiently.
                </p>
            </div>
        </>
    );
}
