import React from 'react';
import styles from './Modal.module.css';

export default function Modal({ children, onClose }) {
    return (
        <div className={styles.modalContainer}>
            {typeof children === 'function' ? children(onClose) : children}
        </div>
    );
}
