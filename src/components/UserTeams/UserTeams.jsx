import React, { useEffect, useState } from 'react';
import { useTeams } from '../../contexts/TeamsProvider';
import Spinner from '../Spinner/Spinner';
import { NavLink, useParams } from 'react-router';
import styles from './UserTeams.module.css';
import Message from '../Message/Message';

const messageStyles = {
    backgroundColor: '#f0f4ff',
    padding: '12px 16px',
    borderRadius: '8px',
    margin: '12px 0',
    color: '#333',
    textAlign: 'center',
};

export default function UserTeams() {
    const { userTeams, isTeamsLoading } = useTeams();
    if (isTeamsLoading) return <Spinner />;

    return (
        <div className={styles.userTeamsContainer}>
            {userTeams.length > 0 ? (
                userTeams.map((userTeam) => (
                    <TeamItem key={userTeam.team.id} userTeam={userTeam} />
                ))
            ) : (
                <Message
                    text='You are not a member of any team.'
                    style={messageStyles}
                />
            )}
        </div>
    );
}

function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return `hsl(${hash % 360}, 70%, 60%)`;
}

function TeamItem({ userTeam }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const teamItemId = userTeam.team.id;
    const teamName = userTeam.team.name;
    const { teamId } = useParams();
    const color = stringToColor(teamName);

    useEffect(() => {
        if (teamId === teamItemId) {
            setIsExpanded(true);
        }
    }, [teamId, teamItemId]);

    return (
        <div className={styles.teamContainer}>
            <button
                className={styles.teamHeader}
                onClick={() => setIsExpanded(!isExpanded)}>
                <div className={styles.teamInfo}>
                    <div
                        className={styles.teamIcon}
                        style={{ backgroundColor: color }}
                    />
                    <span>{teamName}</span>
                </div>
                <span className={styles.teamExpandIcon}>
                    {isExpanded ? (
                        <i
                            className='fa-solid fa-angle-up'
                            style={{ color: '#212121' }}></i>
                    ) : (
                        <i
                            className='fa-solid fa-angle-down'
                            style={{ color: '#212121' }}></i>
                    )}
                </span>
            </button>

            {isExpanded && (
                <div className={styles.teamLinks}>
                    <NavLink
                        className={styles.teamLink}
                        to={`team/${teamItemId}/tasks`}
                        end>
                        Tasks
                    </NavLink>
                    <NavLink
                        className={styles.teamLink}
                        to={`team/${teamItemId}/members`}
                        end>
                        Members
                    </NavLink>
                </div>
            )}
        </div>
    );
}
