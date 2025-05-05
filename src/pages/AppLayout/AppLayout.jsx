import React, { useState } from 'react';
import { Outlet } from 'react-router';
import AppNav from '../../components/AppNav/AppNav';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import style from './AppLayout.module.css';
import { useProfile } from '../../contexts/ProfileProvider';
import Modal from '../../components/Modal/Modal';

export default function AppLayout() {
    const { profile, isProfileLoading } = useProfile();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const handleOpenModal = (content) => {
        setIsModalOpen(true);
        setModalContent(() => content);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setModalContent(null);
    };

    if (isProfileLoading || !profile) {
        return <LoadingScreen />;
    }

    return (
        <div className={style.container}>
            <AppNav onOpenModal={handleOpenModal} />

            <div className={style.mainContent}>
                <Outlet />
            </div>

            {isModalOpen && (
                <Modal onClose={handleCloseModal}>{modalContent}</Modal>
            )}
        </div>
    );
}
