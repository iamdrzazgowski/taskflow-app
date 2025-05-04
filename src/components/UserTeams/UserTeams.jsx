import React, { useEffect, useState } from 'react';
import { useTeams } from '../../contexts/TeamsProvider';
import Spinner from '../Spinner/Spinner';
import { NavLink, useParams } from 'react-router';
import styles from './UserTeams.module.css';
import ArrowUp from '../../assets/icons/ArrowUp';
import ArrowDown from '../../assets/icons/ArrowDown';

export default function UserTeams() {
    const { userTeams, isTeamsLoading } = useTeams();
    if (isTeamsLoading) return <Spinner />;

    return (
        <div className={styles.userTeamsContainer}>
            {userTeams.map((userTeam) => (
                <TeamItem key={userTeam.team.id} userTeam={userTeam} />
            ))}
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
                        <ArrowUp className={styles.arrowIcon} />
                    ) : (
                        <ArrowDown className={styles.arrowIcon} />
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
