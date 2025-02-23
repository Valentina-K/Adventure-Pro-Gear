'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Locale } from '@/i18n-config';
import { usePathname, useRouter } from '@/i18n/routing';
import Modal from '../Modal';
import SignUp from '../Header/ProductNavBar/AuthContainer/components/SignUp';
import SignIn from '../Header/ProductNavBar/AuthContainer/components/SignIn';
import ForgotPassword from '../Header/ProductNavBar/AuthContainer/components/ForgotPassword';
import ResetPassword from '../Header/ProductNavBar/AuthContainer/components/ResetPassword';
import styles from './AuthModal.module.css';

interface AuthModalProps {
  locale: Locale;
}

type AuthType =
  | 'signin'
  | 'signup'
  | 'forgot-password'
  | 'signup-success'
  | 'reset-password'
  | 'new-password'
  | null;

const AuthModal: React.FC<AuthModalProps> = ({ locale }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authType, setAuthType] = useState<AuthType>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const searchParams = useSearchParams();
  // const router = useRouter();
  const session = useSession();
  const path = usePathname();
  const router = useRouter();

  const closeModal = () => {
    router.back();
  };

  useEffect(() => {
    if (isModalOpen) {
      setIsOverlayOpen(true);
    } else {
      setIsOverlayOpen(false);
    }
  }, [isModalOpen]);

  useEffect(() => {
    const type = searchParams.get('auth') as AuthType;
    setAuthType(type);
    setIsModalOpen(
      type === 'signin' ||
        type === 'signup' ||
        type === 'forgot-password' ||
        type === 'reset-password' ||
        type === 'signup-success' ||
        type === 'new-password'
    );
  }, [searchParams]);

  return (
    <>
      {isModalOpen && session.status !== 'authenticated' && authType === 'signup' && (
        <Modal closeModal={closeModal} className={styles.authModal}>
          <SignUp />
        </Modal>
      )}
      {isModalOpen && session.status !== 'authenticated' && authType === 'signin' && (
        <Modal closeModal={closeModal} className={styles.authModal}>
          <SignIn />
        </Modal>
      )}
      {isModalOpen && session.status !== 'authenticated' && authType === 'forgot-password' && (
        <Modal closeModal={closeModal} className={styles.authModalForgotPassword}>
          <ForgotPassword />
        </Modal>
      )}
      {isModalOpen && session.status !== 'authenticated' && authType === 'reset-password' && (
        <Modal closeModal={closeModal} className={styles.authModal}>
          <ResetPassword />
        </Modal>
      )}
      {/* {isOverlayOpen && <div className={styles.overlay} />} */}
    </>
  );
};

export default AuthModal;
