import React from 'react';
import style from './LoadingScreen.module.css';

export default function LoadingScreen() {
    return (
        <div className={style.container}>
            <div className={style.spinner}></div>
        </div>
    );
}
