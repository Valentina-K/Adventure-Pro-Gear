'use client';

import React from 'react';
import Image from 'next/image';
import Container from '@/components/Container';
import styles from './Modal.module.css';

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  closeModal: () => void;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ children, className, closeModal }) => (
  <div className="modal-backdrop visible">
    <Container className={styles.containerModal}>
      <div className={`${className} ${styles.modal}`}>
        {children}
        <Image
          src="/icons/Close.svg"
          className={styles.closeButton}
          onClick={closeModal}
          width={24}
          height={24}
          alt="close icon"
        />
      </div>
    </Container>
  </div>
);

export default Modal;
