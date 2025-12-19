'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/routing';
import Modal from '../Modal';
import SignUp from '../Header/ProductNavBar/AuthContainer/components/SignUp';
import SignIn from '../Header/ProductNavBar/AuthContainer/components/SignIn';
import ForgotPassword from '../Header/ProductNavBar/AuthContainer/components/ForgotPassword';
//import ResetPassword from '../Header/ProductNavBar/AuthContainer/components/ResetPassword';
import styles from './AuthModal.module.css';
import SuccessModal from '../SuccessModal';
import SignupSuccess from '../SuccessModal/SignupSuccess';
import { AppRoutes } from '@/constants/routes';
import ResetPassword from '../SuccessModal/ResetConfirm';

type AuthType =
  | 'signin'
  | 'signup'
  | 'forgot-password'
  | 'signup-success'
  | 'reset-password'
  | 'new-password'
  | null;

const AuthModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authType, setAuthType] = useState<AuthType>(null);
  //const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const searchParams = useSearchParams();
  const session = useSession();
  const path = usePathname();
  const router = useRouter();
  const shouldShowModal = isModalOpen;
  const closeModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('auth');
    const newUrl = `${path}${params.toString() ? `?${params.toString()}` : ''}`;
    router.push(newUrl, { scroll: false });
  };

  /* useEffect(() => {
    if (isModalOpen) {
      setIsOverlayOpen(true);
    } else {
      setIsOverlayOpen(false);
    }
  }, [isModalOpen]); */

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

  useEffect(() => {
    if (authType === 'signup-success') {
      const timer = setTimeout(() => {
        router.replace(AppRoutes.SIGNIN);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [authType]);

  return (
    <>
      {shouldShowModal && authType === 'signup' && (
        <Modal closeModal={closeModal} className={styles.authModal}>
          <SignUp />
        </Modal>
      )}
      {shouldShowModal && authType === 'signin' && (
        <Modal closeModal={closeModal} className={styles.authModal}>
          <SignIn />
        </Modal>
      )}
      {shouldShowModal && session.status !== 'authenticated' && authType === 'forgot-password' && (
        <Modal closeModal={closeModal} className={styles.authModalForgotPassword}>
          <ForgotPassword closeParentModal={closeModal} />
        </Modal>
      )}
      {shouldShowModal && session.status !== 'authenticated' && authType === 'reset-password' && (
        <Modal closeModal={closeModal} className={styles.authModal}>
          <ResetPassword />
        </Modal>
      )}
      {shouldShowModal && authType === 'signup-success' && (
        <SuccessModal>
          <SignupSuccess />
        </SuccessModal>
      )}
      {/* {isOverlayOpen && <div className={styles.overlay} />} */}
    </>
  );
};

export default AuthModal;
