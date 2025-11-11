'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import styles from './style.module.css';

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const DeleteModal: React.FC<ModalProps> = ({ children, className }) => {
  return createPortal(
  <div className="modal-backdrop visible">
    <div className={styles.containerModal}>
      <div className={`${className} ${styles.modal}`}>
        {children}
      </div>
    </div>
  </div>, document.body)
};

export default DeleteModal;
