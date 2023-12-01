import React from 'react';
import styles from './Modal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ isOpen, onClose, children }) => {

  return (
    <div>
        {
            isOpen ? (
                <div className={styles.modalOverlay} onClick={onClose}>
                    <div className={styles.content} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.modalClose} onClick={onClose}> 
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                        {children}
                    </div>
                </div>
            ) : null
        }
    </div>

  );
};

export default Modal;
