import React, { useState } from 'react';
import styles from './CreateNewTeamForm.module.css';
import { useTeams } from '../../contexts/TeamsProvider';
import { useProfile } from '../../contexts/ProfileProvider';
import { useCreateTeam } from '../../hooks/useCreateTeam';

export default function CreateNewTeamForm({ onClose }) {
    const [teamName, setTeamName] = useState('');
    const { userTeams, setUserTeams } = useTeams();
    const { profile } = useProfile();
    const { createTeam } = useCreateTeam();

    const handleCreateNewTeam = (e) => {
        e.preventDefault();
        const userId = profile?.id;
        const teamId = crypto.randomUUID();

        const newTeam = {
            role: 'lider',
            team: {
                id: teamId,
                name: teamName,
            },
        };

        setUserTeams((prevTeams) => [...prevTeams, newTeam]);
        createTeam(teamName, teamId, userId);
        console.log(userTeams);
    };

    return (
        <div className={styles.formContainer}>
            <h1>Create new team</h1>

            <form id='teamForm' onSubmit={handleCreateNewTeam}>
                <label htmlFor='teamName' className={styles.createTeamLabel}>
                    Team name:
                </label>
                <input
                    type='text'
                    id='teamName'
                    name='teamName'
                    className={styles.createTeamInput}
                    placeholder='Enter team name'
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    required
                />

                <div className={styles.buttons}>
                    <button type='submit' className={styles.addButton}>
                        Add team
                    </button>
                    <button
                        type='button'
                        className={styles.closeButton}
                        onClick={onClose}>
                        Close
                    </button>
                </div>
            </form>
        </div>
    );
}
