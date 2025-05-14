import React, { useEffect, useState } from 'react';
import style from './SearchBar.module.css';
import supabase from '../../utils/supabaseClient';
import Spinner from '../Spinner/Spinner';
import { useParams } from 'react-router';

export default function SearchBar({ setMembers, members }) {
    const { teamId } = useParams();
    const [searchInput, setSearchInput] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const searchUsers = async () => {
        const membersIds = members.map((member) => member.user.id);

        try {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .ilike('email', `%${searchInput}%`)
                .not('id', 'in', `(${membersIds.join(',')})`);
            if (error) {
                console.error('Error searching users:', error);
                return;
            }

            setResults(data || []);
        } catch (error) {
            console.error('Error searching users:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (searchInput.trim() !== '') {
                searchUsers();
            } else {
                setResults([]);
            }
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [searchInput]);

    const handleAddMember = async (user) => {
        try {
            const { error } = await supabase
                .from('user_team')
                .insert({
                    user_id: user.id,
                    team_id: teamId,
                    role: 'member',
                })
                .eq('user_id', user.id)
                .eq('team_id', teamId);

            if (error) {
                console.error('Error adding member:', error);
            }

            setMembers((prevMembers) => [
                ...prevMembers,
                {
                    user: {
                        id: user.id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                    },
                    role: 'member',
                },
            ]);
            setResults([]);
            setSearchInput('');
        } catch (error) {
            console.error('Error adding member:', error);
        }
    };

    return (
        <div className={style.searchBarContainer}>
            <div className={style.searchBar} id='searchBar'>
                <div className={style.searchIcon}>
                    <svg
                        width='20'
                        height='20'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                            d='M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z'
                            stroke='#8A94A6'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                        <path
                            d='M21 21L16.65 16.65'
                            stroke='#8A94A6'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </svg>
                </div>
                <input
                    type='text'
                    className={style.searchInput}
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder='Search for users by email to add them to your team...'
                    id='searchInput'
                />
                <div className={style.searchResultsContainer}>
                    {isLoading && <Spinner />}
                    {results.length > 0 && (
                        <ul className={style.searchResults}>
                            {results.map((user) => (
                                <li
                                    key={user.id}
                                    className={style.searchResultItem}>
                                    <div className={style.userInfo}>
                                        <span>
                                            {user.first_name} {user.last_name}
                                        </span>
                                        <small>{user.email}</small>
                                    </div>
                                    <button
                                        className={style.addButton}
                                        onClick={() => {
                                            handleAddMember(user);
                                        }}>
                                        Add member
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
