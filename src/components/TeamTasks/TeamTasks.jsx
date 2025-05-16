import React from 'react';
import { useParams } from 'react-router';
import { useTeams } from '../../contexts/TeamsProvider';
import Spinner from '../Spinner/Spinner';
import { useTasks } from '../../hooks/useTasks';
import { useMembers } from '../../hooks/useMembers';
import KanbanBoard from '../KanbanBoard/KanbanBoard';
import ErrorPanel from '../ErrorPanel/ErrorPanel';

const spinnerContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
};

export default function TeamTasks() {
    const { teamId } = useParams();
    const { userTeams, isTeamLoading } = useTeams();
    const { tasks, isTasksLoading, setTasks } = useTasks();
    const { members, isMembersLoading } = useMembers();

    const currentTeam = userTeams.find((team) => team.team.id === teamId);

    const isLoading =
        isTeamLoading ||
        !tasks ||
        isTasksLoading ||
        isMembersLoading ||
        !members;

    if (isLoading) {
        return (
            <div style={spinnerContainerStyle}>
                <Spinner />
            </div>
        );
    }
    // TODO: Dodać przekierowanie do /app

    if (!currentTeam) {
        return (
            <div style={spinnerContainerStyle}>
                <ErrorPanel />
            </div>
        );
    }

    return (
        <div>
            <KanbanBoard tasks={tasks} members={members} setTasks={setTasks} />
        </div>
    );
}
