import React from 'react';
import { useParams } from 'react-router';
import { useTeams } from '../../contexts/TeamsProvider';
import Spinner from '../Spinner/Spinner';

export default function TeamTasks() {
    const { teamId } = useParams();
    const { userTeams, isTeamLoading } = useTeams();

    const currentTeam = userTeams.find((team) => team.team.id === teamId);

    if (isTeamLoading || !currentTeam) return <Spinner />;

    return <div>{currentTeam.team.name}</div>;
}
