import React, { useState } from 'react';
import style from './AppNav.module.css';
import { NavLink } from 'react-router';
import UserTeams from '../UserTeams/UserTeams';
import supabase from '../../utils/supabaseClient';
import CreateNewTeamForm from '../CreateNewTeamForm/CreateNewTeamForm';
import Modal from '../Modal/Modal';

export default function AppNav() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Błąd przy wylogowaniu:', error.message);
        }
    };

    return (
        <>
            <div className={style.navigationPanel}>
                <div className='mainContent'>
                    <div className={style.appLogo}>
                        <div className={style.logoIcon}></div>
                        <p className={style.logoText}>TaskFlow</p>
                    </div>

                    <div className={style.sectionTitle}>Navigation</div>
                    <NavLink className={style.navItem} to='/app' end>
                        <div className={style.navItemIcon}>
                            <i
                                className='fa-solid fa-house'
                                style={{ color: '#212121' }}></i>
                        </div>
                        <span>Homepage</span>
                    </NavLink>
                    <NavLink className={style.navItem} to='userTasks'>
                        <div className={style.navItemIcon}>
                            <i
                                className='fa-solid fa-list-check'
                                style={{ color: '#212121' }}></i>
                        </div>
                        <span>My tasks</span>
                    </NavLink>

                    <div className={style.sectionTitle}>Your Teams</div>

                    <UserTeams />
                </div>
                <div className={style.buttons}>
                    <button
                        className={style.createNewTeamButton}
                        onClick={handleOpenModal}>
                        Create New Team
                    </button>
                    <button
                        className={style.logoutButton}
                        onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <Modal>
                    <CreateNewTeamForm onClose={handleCloseModal} />
                </Modal>
            )}
        </>
    );
}
