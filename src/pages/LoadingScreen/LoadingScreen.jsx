import React from 'react';
import style from './LoadingScreen.module.css';
import Spinner from '../../components/Spinner/Spinner';

export default function LoadingScreen() {
    return (
        <div className={style.container}>
            <Spinner />
        </div>
    );
}
