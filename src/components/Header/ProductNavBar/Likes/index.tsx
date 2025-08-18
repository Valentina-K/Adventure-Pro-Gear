import React, { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { toast } from "react-toastify";
import Favorites from '@/../public/icons/Favorites.svg';
import styles from './Likes.module.css';
import { AppRoutes } from '@/constants/routes';
import Link from 'next/link';

function Likes() {
  const { data: session, status } = useSession();
  const t= useTranslations();
  if (status === "loading") {
    return (
      <div className={styles.like} aria-busy="true">
        <Image src={Favorites} alt="likes icon" width={24} height={24} />
      </div>
    );
  }

  if (session?.user) {
    return (
      <Link
        href={`${AppRoutes.PERSONAL_ACCOUNT}/favorites/`}
        className={styles.like}
      >
        <Image src={Favorites} alt="likes icon" width={24} height={24} />
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={`${styles.like} ${styles.buttonLike}`}
      onClick={() => {
        toast.info(t('goToFavorites'));
      }}
      aria-label="Требуется вход"
    >
      <Image src={Favorites} alt="likes icon" width={24} height={24} />
    </button>
  );
}

export default Likes;
