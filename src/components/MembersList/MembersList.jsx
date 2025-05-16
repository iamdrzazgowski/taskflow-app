import React from 'react';
import { useTeams } from '../../contexts/TeamsProvider';
import { useMembers } from '../../hooks/useMembers';
import Spinner from '../Spinner/Spinner';
import './MemberList.css';
import MemberCard from '../MemberCard/MemberCard';
import { useTasks } from '../../hooks/useTasks';
import supabase from '../../utils/supabaseClient';
import { useProfile } from '../../contexts/ProfileProvider';
import { useParams } from 'react-router';
import SearchBar from '../SearchBar/SearchBar';
import ErrorPanel from '../ErrorPanel/ErrorPanel';

const spinnerContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
};

export default function MembersList() {
    const { teamId } = useParams();
    const { tasks } = useTasks();
    const { profile } = useProfile();
    const { userTeams, isTeamLoading } = useTeams();
    const { members, isMembersLoading, setMembers } = useMembers();

    const userRole = userTeams.find((team) => team.team.id === teamId)?.role;
    const currentTeam = userTeams.find((team) => team.team.id === teamId);

    const handleDeleteMember = async (userId) => {
        try {
            const { error } = await supabase
                .from('user_team')
                .delete()
                .eq('user_id', userId)
                .eq('team_id', teamId);
            if (error) {
                console.error('Error deleting member:', error);
                return;
            }
            setMembers((prevMembers) =>
                prevMembers.filter((member) => member.user.id !== userId)
            );
        } catch (error) {
            console.error('Error deleting member:', error);
        }
    };

    if (isTeamLoading || isMembersLoading)
        return (
            <div style={spinnerContainerStyle}>
                <Spinner />
            </div>
        );

    if (!currentTeam) {
        return (
            <div style={spinnerContainerStyle}>
                <ErrorPanel />
            </div>
        );
    }

    return (
        <>
            {userRole === 'lider' && (
                <SearchBar setMembers={setMembers} members={members} />
            )}
            <div className='members-list' id='membersList'>
                {members.map((member) => (
                    <MemberCard
                        user={member.user}
                        key={member.user.id}
                        tasks={tasks}>
                        {userRole === 'lider' &&
                            profile.id !== member.user.id && (
                                <button
                                    className='delete-button'
                                    onClick={() =>
                                        handleDeleteMember(member.user.id)
                                    }>
                                    <i className='fa-solid fa-xmark'></i>
                                </button>
                            )}
                    </MemberCard>
                ))}
            </div>
        </>
    );
}
