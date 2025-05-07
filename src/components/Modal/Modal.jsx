import React from 'react';
import styles from './Modal.module.css';

export default function Modal({ children }) {
    return <div className={styles.modalContainer}>{children}</div>;
}
