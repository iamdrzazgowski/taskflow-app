import React from 'react';
import { useParams } from 'react-router';
import { useTeams } from '../../contexts/TeamsProvider';
import Spinner from '../Spinner/Spinner';
import { useTasks } from '../../hooks/useTasks';
import { useMembers } from '../../hooks/useMembers';
import KanbanBoard from '../KanbanBoard/KanbanBoard';

export default function TeamTasks() {
    const { teamId } = useParams();
    const { userTeams, isTeamLoading } = useTeams();
    const { tasks, isTasksLoading } = useTasks();
    const { members, isMembersLoading } = useMembers();

    const currentTeam = userTeams.find((team) => team.team.id === teamId);

    if (
        isTeamLoading ||
        !currentTeam ||
        !tasks ||
        isTasksLoading ||
        isMembersLoading ||
        !members
    )
        return <Spinner />;
    return (
        <div>
            <KanbanBoard tasks={tasks} members={members} />
        </div>
    );
}
