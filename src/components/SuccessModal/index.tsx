'use client';

import React from 'react';
import styles from './style.module.css';

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const SuccessModal: React.FC<ModalProps> = ({ children, className }) => {
  return (
  <div className="modal-backdrop visible">
    <div className={styles.containerModal}>
      <div className={`${className} ${styles.modal}`}>
        {children}
      </div>
    </div>
  </div>)
};

export default SuccessModal;